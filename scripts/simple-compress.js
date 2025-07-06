#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

class SimpleModelCompressor {
  constructor() {
    this.modelsDir = path.join(process.cwd(), 'public', 'models');
    this.outputDir = path.join(this.modelsDir, 'compressed');
    this.backupDir = path.join(this.modelsDir, 'original');
  }

  async init() {
    await this.ensureDirectories();
    console.log('🚀 Простой компрессор GLB файлов');
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

  async getModelFiles() {
    const files = fs.readdirSync(this.modelsDir);
    return files.filter(file => file.toLowerCase().endsWith('.glb'));
  }

  getFileSize(filePath) {
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

  async compressGLB(filename) {
    const inputPath = path.join(this.modelsDir, filename);
    const outputPath = path.join(this.outputDir, filename);
    const backupPath = path.join(this.backupDir, filename);

    console.log(`\n🔄 Обработка: ${filename}`);

    // Создаем резервную копию
    fs.copyFileSync(inputPath, backupPath);
    console.log(`💾 Резервная копия создана`);

    const originalSize = this.getFileSize(inputPath);
    console.log(`📊 Исходный размер: ${this.formatFileSize(originalSize)}`);

    try {
      // Читаем GLB файл
      const glbData = fs.readFileSync(inputPath);
      
      // Простая оптимизация - удаляем лишние данные и оптимизируем
      const optimizedData = this.optimizeGLBData(glbData);
      
      // Сохраняем оптимизированный файл
      fs.writeFileSync(outputPath, optimizedData);
      
      const compressedSize = this.getFileSize(outputPath);
      const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
      
      console.log(`📉 Сжатый размер: ${this.formatFileSize(compressedSize)}`);
      console.log(`🎯 Сжатие: ${compressionRatio}%`);

      return {
        filename,
        originalSize,
        compressedSize,
        compressionRatio: parseFloat(compressionRatio)
      };
    } catch (error) {
      console.error(`❌ Ошибка при обработке ${filename}:`, error.message);
      return null;
    }
  }

  optimizeGLBData(glbData) {
    try {
      // GLB формат: заголовок (12 байт) + JSON chunk + Binary chunk
      const header = glbData.slice(0, 12);
      const magic = header.readUInt32LE(0);
      const version = header.readUInt32LE(4);
      const length = header.readUInt32LE(8);

      if (magic !== 0x46546C67) { // 'glTF' magic number
        console.warn('⚠️ Неверный формат GLB файла');
        return glbData;
      }

      let offset = 12;
      let jsonChunk = null;
      let binaryChunk = null;

      // Читаем JSON chunk
      if (offset < glbData.length) {
        const jsonLength = glbData.readUInt32LE(offset);
        const jsonType = glbData.readUInt32LE(offset + 4);
        
        if (jsonType === 0x4E4F534A) { // 'JSON' type
          jsonChunk = glbData.slice(offset + 8, offset + 8 + jsonLength);
          offset += 8 + jsonLength;
        }
      }

      // Читаем Binary chunk
      if (offset < glbData.length) {
        const binaryLength = glbData.readUInt32LE(offset);
        const binaryType = glbData.readUInt32LE(offset + 4);
        
        if (binaryType === 0x004E4942) { // 'BIN\0' type
          binaryChunk = glbData.slice(offset + 8, offset + 8 + binaryLength);
        }
      }

      if (jsonChunk && binaryChunk) {
        // Оптимизируем JSON часть
        const jsonString = jsonChunk.toString('utf8').replace(/\0/g, '');
        const gltfData = JSON.parse(jsonString);
        
        // Удаляем лишние данные
        this.optimizeGLTFJson(gltfData);
        
        // Сериализуем обратно
        const optimizedJsonString = JSON.stringify(gltfData);
        const optimizedJsonBuffer = Buffer.from(optimizedJsonString, 'utf8');
        
        // Выравниваем по 4 байтам
        const padding = 4 - (optimizedJsonBuffer.length % 4);
        const paddedJsonBuffer = Buffer.concat([
          optimizedJsonBuffer,
          Buffer.alloc(padding === 4 ? 0 : padding, 0x20) // пробелы для выравнивания
        ]);

        // Создаем новый GLB файл
        const newLength = 12 + 8 + paddedJsonBuffer.length + 8 + binaryChunk.length;
        const newHeader = Buffer.alloc(12);
        newHeader.writeUInt32LE(0x46546C67, 0); // magic
        newHeader.writeUInt32LE(version, 4);     // version
        newHeader.writeUInt32LE(newLength, 8);   // length

        const jsonChunkHeader = Buffer.alloc(8);
        jsonChunkHeader.writeUInt32LE(paddedJsonBuffer.length, 0);
        jsonChunkHeader.writeUInt32LE(0x4E4F534A, 4); // JSON type

        const binaryChunkHeader = Buffer.alloc(8);
        binaryChunkHeader.writeUInt32LE(binaryChunk.length, 0);
        binaryChunkHeader.writeUInt32LE(0x004E4942, 4); // BIN type

        return Buffer.concat([
          newHeader,
          jsonChunkHeader,
          paddedJsonBuffer,
          binaryChunkHeader,
          binaryChunk
        ]);
      }
    } catch (error) {
      console.warn('⚠️ Ошибка при оптимизации GLB данных:', error.message);
    }

    return glbData;
  }

  optimizeGLTFJson(gltfData) {
    // Удаляем лишние extension если они есть
    if (gltfData.extensionsUsed) {
      // Сохраняем только необходимые расширения
      const essentialExtensions = ['KHR_draco_mesh_compression'];
      gltfData.extensionsUsed = gltfData.extensionsUsed.filter(ext => 
        essentialExtensions.includes(ext)
      );
    }

    // Удаляем лишние данные из материалов
    if (gltfData.materials) {
      gltfData.materials.forEach(material => {
        // Удаляем лишние свойства
        delete material.extras;
        delete material.name; // Имена не нужны в рантайме
      });
    }

    // Удаляем лишние данные из мешей
    if (gltfData.meshes) {
      gltfData.meshes.forEach(mesh => {
        delete mesh.extras;
        delete mesh.name;
      });
    }

    // Удаляем лишние данные из узлов
    if (gltfData.nodes) {
      gltfData.nodes.forEach(node => {
        delete node.extras;
        delete node.name;
      });
    }

    // Удаляем лишние данные из аксессоров
    if (gltfData.accessors) {
      gltfData.accessors.forEach(accessor => {
        delete accessor.name;
      });
    }

    // Удаляем лишние данные из буферов
    if (gltfData.buffers) {
      gltfData.buffers.forEach(buffer => {
        delete buffer.name;
      });
    }

    // Удаляем лишние данные из текстур
    if (gltfData.textures) {
      gltfData.textures.forEach(texture => {
        delete texture.name;
      });
    }

    // Удаляем лишние данные из изображений
    if (gltfData.images) {
      gltfData.images.forEach(image => {
        delete image.name;
      });
    }

    // Удаляем asset extras
    if (gltfData.asset && gltfData.asset.extras) {
      delete gltfData.asset.extras;
    }

    return gltfData;
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
      const result = await this.compressGLB(filename);
      if (result) {
        results.push(result);
      }
    }

    this.showSummary(results);
    await this.offerReplacement(results);
  }

  showSummary(results) {
    console.log('\n📊 ИТОГОВАЯ СТАТИСТИКА:');
    console.log('='.repeat(50));
    
    let totalOriginalSize = 0;
    let totalCompressedSize = 0;
    
    results.forEach(result => {
      totalOriginalSize += result.originalSize;
      totalCompressedSize += result.compressedSize;
      
      console.log(`${result.filename}:`);
      console.log(`  📦 ${this.formatFileSize(result.originalSize)} → ${this.formatFileSize(result.compressedSize)} (${result.compressionRatio}%)`);
    });
    
    const totalCompressionRatio = ((totalOriginalSize - totalCompressedSize) / totalOriginalSize * 100).toFixed(1);
    
    console.log('='.repeat(50));
    console.log(`📈 ОБЩЕЕ СЖАТИЕ: ${this.formatFileSize(totalOriginalSize)} → ${this.formatFileSize(totalCompressedSize)}`);
    console.log(`🎯 ЭКОНОМИЯ: ${this.formatFileSize(totalOriginalSize - totalCompressedSize)} (${totalCompressionRatio}%)`);
  }

  async offerReplacement(results) {
    console.log('\n🔄 Автоматическая замена файлов...');
    
    results.forEach(result => {
      const originalPath = path.join(this.modelsDir, result.filename);
      const compressedPath = path.join(this.outputDir, result.filename);
      
      if (fs.existsSync(compressedPath)) {
        fs.copyFileSync(compressedPath, originalPath);
        console.log(`✅ Заменен: ${result.filename}`);
      }
    });
    
    console.log('\n🎉 Простое сжатие завершено!');
    console.log('💾 Оригинальные файлы сохранены в public/models/original');
  }
}

async function main() {
  const compressor = new SimpleModelCompressor();
  
  try {
    await compressor.init();
    await compressor.compressAll();
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
} 