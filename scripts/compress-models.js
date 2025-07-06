#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// Конфигурация сжатия
const COMPRESSION_CONFIG = {
  // Draco compression settings
  draco: {
    compressionLevel: 7, // 0-10, больше = меньше размер, но дольше обработка
    quantizePosition: 14, // биты для позиций (8-16)
    quantizeNormal: 10,   // биты для нормалей (8-16)
    quantizeTexcoord: 12, // биты для текстурных координат (8-16)
    quantizeColor: 8,     // биты для цветов (8-16)
  },
  
  // Texture compression settings
  texture: {
    maxSize: 1024,        // максимальный размер текстуры
    quality: 0.8,         // качество JPEG (0-1)
    format: 'webp',       // формат (webp, jpg, png)
  },
  
  // Geometry optimization
  geometry: {
    mergeDuplicateVertices: true,
    removeUnusedVertices: true,
    removeUnusedTextures: true,
    removeUnusedMaterials: true,
    simplifyMesh: true,
    simplificationRatio: 0.5, // 0-1, меньше = больше упрощение
  }
};

class ModelCompressor {
  constructor() {
    this.modelsDir = path.join(process.cwd(), 'public', 'models');
    this.outputDir = path.join(this.modelsDir, 'compressed');
    this.backupDir = path.join(this.modelsDir, 'original');
  }

  async init() {
    // Создаем необходимые директории
    await this.ensureDirectories();
    
    // Проверяем наличие необходимых инструментов
    await this.checkDependencies();
    
    console.log('🚀 Инициализация компрессора моделей...');
  }

  async ensureDirectories() {
    const dirs = [this.outputDir, this.backupDir];
    
    for (const dir of dirs) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📁 Создана директория: ${dir}`);
      }
    }
  }

  async checkDependencies() {
    try {
      await execAsync('gltf-pipeline --version');
      console.log('✅ gltf-pipeline найден');
    } catch (error) {
      console.log('❌ gltf-pipeline не найден. Установка...');
      try {
        await execAsync('npm install -g gltf-pipeline');
        console.log('✅ gltf-pipeline установлен');
      } catch (installError) {
        throw new Error('Не удалось установить gltf-pipeline. Установите вручную: npm install -g gltf-pipeline');
      }
    }
  }

  async getModelFiles() {
    const files = fs.readdirSync(this.modelsDir);
    return files.filter(file => file.toLowerCase().endsWith('.glb'));
  }

  async getFileSize(filePath) {
    const stats = fs.statSync(filePath);
    return stats.size;
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  async compressModel(filename) {
    const inputPath = path.join(this.modelsDir, filename);
    const outputPath = path.join(this.outputDir, filename);
    const backupPath = path.join(this.backupDir, filename);

    console.log(`\n🔄 Обработка: ${filename}`);

    // Создаем резервную копию
    fs.copyFileSync(inputPath, backupPath);
    console.log(`💾 Резервная копия создана`);

    const originalSize = await this.getFileSize(inputPath);
    console.log(`📊 Исходный размер: ${this.formatFileSize(originalSize)}`);

    try {
      // Базовая оптимизация с Draco сжатием
      const optimizationCommand = this.buildOptimizationCommand(inputPath, outputPath);
      
      console.log('🔧 Применение оптимизации...');
      await execAsync(optimizationCommand);

      // Дополнительная оптимизация если нужно
      if (fs.existsSync(outputPath)) {
        const compressedSize = await this.getFileSize(outputPath);
        const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
        
        console.log(`📉 Сжатый размер: ${this.formatFileSize(compressedSize)}`);
        console.log(`🎯 Сжатие: ${compressionRatio}%`);

        // Если сжатие недостаточно, применяем дополнительные методы
        if (compressionRatio < 30) {
          console.log('🔄 Применение дополнительного сжатия...');
          await this.applyAdvancedCompression(outputPath);
        }

        return {
          filename,
          originalSize,
          compressedSize: await this.getFileSize(outputPath),
          compressionRatio: parseFloat(compressionRatio)
        };
      }
    } catch (error) {
      console.error(`❌ Ошибка при обработке ${filename}:`, error.message);
      return null;
    }
  }

  buildOptimizationCommand(inputPath, outputPath) {
    const config = COMPRESSION_CONFIG;
    
    let command = `gltf-pipeline -i "${inputPath}" -o "${outputPath}"`;
    
    // Draco compression
    command += ` --draco.compressionLevel=${config.draco.compressionLevel}`;
    command += ` --draco.quantizePosition=${config.draco.quantizePosition}`;
    command += ` --draco.quantizeNormal=${config.draco.quantizeNormal}`;
    command += ` --draco.quantizeTexcoord=${config.draco.quantizeTexcoord}`;
    command += ` --draco.quantizeColor=${config.draco.quantizeColor}`;
    
    // Geometry optimization
    if (config.geometry.mergeDuplicateVertices) {
      command += ` --removeDuplicateVertices`;
    }
    if (config.geometry.removeUnusedVertices) {
      command += ` --removeUnusedVertices`;
    }
    if (config.geometry.removeUnusedTextures) {
      command += ` --removeUnusedTextures`;
    }
    if (config.geometry.removeUnusedMaterials) {
      command += ` --removeUnusedMaterials`;
    }
    
    return command;
  }

  async applyAdvancedCompression(filePath) {
    // Дополнительное сжатие для очень больших файлов
    const tempPath = filePath + '.temp';
    
    try {
      // Более агрессивное Draco сжатие
      const advancedCommand = `gltf-pipeline -i "${filePath}" -o "${tempPath}" --draco.compressionLevel=10 --draco.quantizePosition=8 --draco.quantizeNormal=8 --draco.quantizeTexcoord=8`;
      
      await execAsync(advancedCommand);
      
      if (fs.existsSync(tempPath)) {
        fs.renameSync(tempPath, filePath);
        console.log('✅ Дополнительное сжатие применено');
      }
    } catch (error) {
      console.warn('⚠️ Дополнительное сжатие не удалось:', error.message);
      if (fs.existsSync(tempPath)) {
        fs.unlinkSync(tempPath);
      }
    }
  }

  async compressAll() {
    const modelFiles = await this.getModelFiles();
    
    if (modelFiles.length === 0) {
      console.log('📭 Файлы .glb не найдены в папке public/models');
      return;
    }

    console.log(`🎯 Найдено ${modelFiles.length} моделей для сжатия`);
    
    const results = [];
    
    for (const filename of modelFiles) {
      const result = await this.compressModel(filename);
      if (result) {
        results.push(result);
      }
    }

    // Показываем итоговую статистику
    this.showSummary(results);
    
    // Предлагаем заменить оригинальные файлы
    await this.offerReplacement(results);
  }

  showSummary(results) {
    console.log('\n📊 ИТОГОВАЯ СТАТИСТИКА:');
    console.log('=' .repeat(50));
    
    let totalOriginalSize = 0;
    let totalCompressedSize = 0;
    
    results.forEach(result => {
      totalOriginalSize += result.originalSize;
      totalCompressedSize += result.compressedSize;
      
      console.log(`${result.filename}:`);
      console.log(`  📦 ${this.formatFileSize(result.originalSize)} → ${this.formatFileSize(result.compressedSize)} (${result.compressionRatio}%)`);
    });
    
    const totalCompressionRatio = ((totalOriginalSize - totalCompressedSize) / totalOriginalSize * 100).toFixed(1);
    
    console.log('=' .repeat(50));
    console.log(`📈 ОБЩЕЕ СЖАТИЕ: ${this.formatFileSize(totalOriginalSize)} → ${this.formatFileSize(totalCompressedSize)}`);
    console.log(`🎯 ЭКОНОМИЯ: ${this.formatFileSize(totalOriginalSize - totalCompressedSize)} (${totalCompressionRatio}%)`);
  }

  async offerReplacement(results) {
    console.log('\n❓ Заменить оригинальные файлы сжатыми версиями?');
    console.log('   (Оригинальные файлы сохранены в папке public/models/original)');
    
    // В автоматическом режиме заменяем
    console.log('🔄 Автоматическая замена...');
    
    results.forEach(result => {
      const originalPath = path.join(this.modelsDir, result.filename);
      const compressedPath = path.join(this.outputDir, result.filename);
      
      if (fs.existsSync(compressedPath)) {
        fs.copyFileSync(compressedPath, originalPath);
        console.log(`✅ Заменен: ${result.filename}`);
      }
    });
    
    console.log('\n🎉 Сжатие завершено! Все файлы заменены оптимизированными версиями.');
    console.log('💾 Оригинальные файлы сохранены в public/models/original');
  }

  async restoreOriginals() {
    console.log('🔄 Восстановление оригинальных файлов...');
    
    const backupFiles = fs.readdirSync(this.backupDir);
    
    backupFiles.forEach(filename => {
      const backupPath = path.join(this.backupDir, filename);
      const originalPath = path.join(this.modelsDir, filename);
      
      fs.copyFileSync(backupPath, originalPath);
      console.log(`✅ Восстановлен: ${filename}`);
    });
    
    console.log('🎉 Восстановление завершено!');
  }
}

// CLI интерфейс
async function main() {
  const compressor = new ModelCompressor();
  
  try {
    await compressor.init();
    
    const command = process.argv[2];
    
    switch (command) {
      case 'compress':
        await compressor.compressAll();
        break;
      case 'restore':
        await compressor.restoreOriginals();
        break;
      default:
        console.log('🔧 Компрессор GLB моделей');
        console.log('');
        console.log('Использование:');
        console.log('  node scripts/compress-models.js compress  - Сжать все модели');
        console.log('  node scripts/compress-models.js restore   - Восстановить оригинальные файлы');
        console.log('');
        console.log('Автоматический запуск сжатия...');
        await compressor.compressAll();
    }
    
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
} 