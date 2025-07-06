'use client';

import React, { Suspense, useState, useRef, useEffect, Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, useGLTF } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, RotateCcw, Maximize2, Minimize2, Loader2 } from 'lucide-react';

interface CarViewer3DProps {
  carName: string;
  modelPath?: string; // Путь к .glb файлу
  onColorChange?: (color: string) => void;
}

// Error Boundary для обработки ошибок загрузки 3D модели
class ModelErrorBoundary extends Component<
  { children: React.ReactNode; onError?: () => void },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; onError?: () => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    if (this.props.onError) {
      this.props.onError();
    }
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

// Компонент для загрузки .glb модели с улучшенной обработкой цветов
function GLBCarModel({ 
  modelPath, 
  color = '#ff0000', 
  onError,
  onLoaded 
}: { 
  modelPath: string, 
  color?: string,
  onError?: () => void,
  onLoaded?: () => void
}) {
  const meshRef = useRef<THREE.Group>(null);
  const [hasError, setHasError] = useState(false);
  const [originalMaterials, setOriginalMaterials] = useState<Map<THREE.Material, THREE.Color>>(new Map());
  
  const gltf = useGLTF(modelPath);
  
  // Анимация автомобиля
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  // Обработка загрузки
  useEffect(() => {
    if (!gltf || !gltf.scene) {
      setHasError(true);
      if (onError) onError();
      return;
    }
    setHasError(false);
    
    // Сохраняем оригинальные материалы при первой загрузке
    const materialsMap = new Map<THREE.Material, THREE.Color>();
    gltf.scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((mat) => {
            if (mat instanceof THREE.MeshStandardMaterial && !materialsMap.has(mat)) {
              materialsMap.set(mat, mat.color.clone());
            }
          });
        } else if (child.material instanceof THREE.MeshStandardMaterial && !materialsMap.has(child.material)) {
          materialsMap.set(child.material, child.material.color.clone());
        }
      }
    });
    setOriginalMaterials(materialsMap);
    
    if (onLoaded) onLoaded();
  }, [gltf, onError, onLoaded]);

  // Улучшенное применение цвета для всех моделей включая BMW i8
  useEffect(() => {
    if (gltf?.scene && !hasError && originalMaterials.size > 0) {
      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const childName = child.name.toLowerCase();
          const materialName = (child.material && typeof child.material === 'object' && 'name' in child.material) 
            ? child.material.name?.toLowerCase() || '' 
            : '';
          
          // Более широкое определение частей кузова для BMW i8 и других моделей
          const isBodyPart = (
            childName.includes('body') || 
            childName.includes('paint') || 
            childName.includes('door') || 
            childName.includes('hood') || 
            childName.includes('roof') || 
            childName.includes('trunk') ||
            childName.includes('panel') ||
            childName.includes('bumper') ||
            childName.includes('fender') ||
            childName.includes('quarter') ||
            childName.includes('side') ||
            childName.includes('front') ||
            childName.includes('rear') ||
            childName.includes('carbon') ||
            childName.includes('exterior') ||
            childName.includes('shell') ||
            materialName.includes('body') || 
            materialName.includes('paint') ||
            materialName.includes('car') ||
            materialName.includes('exterior') ||
            materialName.includes('carbon') ||
            materialName.includes('shell')
          );
          
          // Для BMW i8 и других сложных моделей - строгий список исключений
          const excludePart = (
            childName.includes('light') || childName.includes('lamp') || 
            childName.includes('glass') || childName.includes('window') || 
            childName.includes('tire') || childName.includes('wheel') || 
            childName.includes('rim') || childName.includes('chrome') || 
            childName.includes('metal') || childName.includes('trim') || 
            childName.includes('badge') || childName.includes('logo') || 
            childName.includes('grille') || childName.includes('grill') ||
            childName.includes('radiator') || childName.includes('cooling') ||
            childName.includes('vent') || childName.includes('intake') ||
            childName.includes('exhaust') || childName.includes('pipe') ||
            childName.includes('mirror') || childName.includes('handle') || 
            childName.includes('interior') || childName.includes('seat') || 
            childName.includes('dashboard') || childName.includes('steering') ||
            childName.includes('headlight') || childName.includes('taillight') ||
            childName.includes('indicator') || childName.includes('brake') ||
            childName.includes('fog') || childName.includes('turn') ||
            childName.includes('signal') || childName.includes('running') ||
            childName.includes('daytime') || childName.includes('drl') ||
            childName.includes('engine') || childName.includes('motor') ||
            childName.includes('suspension') || childName.includes('shock') ||
            childName.includes('spring') || childName.includes('caliper') ||
            childName.includes('rotor') || childName.includes('disc') ||
            childName.includes('underhood') || childName.includes('undercarriage') ||
            childName.includes('frame') || childName.includes('chassis') ||
            childName.includes('axle') || childName.includes('shaft') ||
            materialName.includes('light') || materialName.includes('glass') ||
            materialName.includes('chrome') || materialName.includes('metal') ||
            materialName.includes('tire') || materialName.includes('wheel') ||
            materialName.includes('lamp') || materialName.includes('led') ||
            materialName.includes('headlight') || materialName.includes('taillight') ||
            materialName.includes('grille') || materialName.includes('grill') ||
            materialName.includes('radiator') || materialName.includes('cooling') ||
            materialName.includes('vent') || materialName.includes('intake') ||
            materialName.includes('exhaust') || materialName.includes('engine') ||
            materialName.includes('brake') || materialName.includes('caliper')
          );
          
          // Специальная логика для BMW i8 - если название модели содержит bmw_i8, применяем цвет более избирательно
          const isBMWi8 = modelPath.toLowerCase().includes('bmw_i8') || modelPath.toLowerCase().includes('bmw i8');
          
          // Для BMW i8 - используем белый список: красим только определённые части корпуса
          if (isBMWi8) {
            const allowedBodyParts = (
              isBodyPart || 
              childName.includes('body') || childName.includes('paint') ||
              childName.includes('door') || childName.includes('hood') ||
              childName.includes('roof') || childName.includes('trunk') ||
              childName.includes('fender') || childName.includes('bumper') ||
              childName.includes('quarter') || childName.includes('panel') ||
              childName.includes('side') || childName.includes('wing') ||
              childName.includes('outer') || childName.includes('exterior') ||
              childName.includes('surface') || childName.includes('skin') ||
              childName.includes('cowl') || childName.includes('apron') ||
              childName.includes('spoiler') || childName.includes('lip') ||
              materialName.includes('body') || materialName.includes('paint') ||
              materialName.includes('exterior') || materialName.includes('shell') ||
              materialName.includes('surface') || materialName.includes('skin') ||
              materialName.includes('outer') || materialName.includes('cowl')
            );
            
            if (allowedBodyParts && !excludePart && child.material) {
              // Применяем цвет только к разрешенным частям корпуса BMW i8
              const applyColorToMaterial = (mat: THREE.MeshStandardMaterial) => {
                const originalColor = originalMaterials.get(mat);
                if (originalColor) {
                  const newColor = new THREE.Color(color);
                  
                  // Более агрессивная смена цвета для BMW i8
                  const blendStrength = 0.9;
                  mat.color.lerpColors(originalColor, newColor, blendStrength);
                  mat.needsUpdate = true;
                } else {
                  // Если нет оригинального цвета, применяем яркий вариант
                  const newColor = new THREE.Color(color);
                  newColor.multiplyScalar(0.95); // Слегка приглушаем цвет на 5%
                  mat.color.set(newColor);
                  mat.needsUpdate = true;
                }
              };

              if (Array.isArray(child.material)) {
                child.material.forEach((mat) => {
                  if (mat instanceof THREE.MeshStandardMaterial) {
                    applyColorToMaterial(mat);
                  }
                });
              } else if (child.material instanceof THREE.MeshStandardMaterial) {
                applyColorToMaterial(child.material);
              }
            }
          } else if ((isBodyPart || !excludePart) && child.material) {
            const applyColorToMaterial = (mat: THREE.MeshStandardMaterial) => {
              const originalColor = originalMaterials.get(mat);
              if (originalColor) {
                const newColor = new THREE.Color(color);
                
                // Специальная обработка для черного цвета
                if (color === '#000000') {
                  mat.color.setHex(0x1a1a1a); // Очень темно-серый вместо чистого черного
                } else if (color === '#ffffff') {
                  mat.color.setHex(0xf8f8f8); // Немного не белый для лучшего отображения
                } else {
                  const blendStrength = 0.8;
                  mat.color.lerpColors(originalColor, newColor, blendStrength);
                }
                mat.needsUpdate = true;
              } else {
                // Если нет оригинального цвета, просто применяем новый
                mat.color.set(color);
                mat.needsUpdate = true;
              }
            };

            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => {
                if (mat instanceof THREE.MeshStandardMaterial) {
                  applyColorToMaterial(mat);
                }
              });
            } else if (child.material instanceof THREE.MeshStandardMaterial) {
              applyColorToMaterial(child.material);
            }
          }
        }
      });
    }
  }, [gltf?.scene, color, hasError, originalMaterials, modelPath]);

  if (hasError || !gltf?.scene) {
    return null;
  }

  return (
    <group ref={meshRef} position={[0, -1, 0]}>
      <primitive object={gltf.scene} scale={[250, 250, 250]} />
    </group>
  );
}

// Улучшенный компонент загрузки с равномерной анимацией
function LoadingFallback({ progress = 0 }: { progress?: number }) {
  return (
    <Html center>
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center p-6 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg"
      >
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-3" />
        <span className="text-gray-700 font-medium mb-2">Загрузка 3D модели...</span>
        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-blue-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <span className="text-xs text-gray-500 mt-1">{Math.round(progress)}%</span>
      </motion.div>
    </Html>
  );
}

const availableColors = [
  { name: 'Красный', value: '#DC2626' },
  { name: 'Синий', value: '#2563EB' },
  { name: 'Черный', value: '#000000' },
  { name: 'Белый', value: '#FFFFFF' },
  { name: 'Серый', value: '#6B7280' },
  { name: 'Серебро', value: '#9CA3AF' },
  { name: 'Зеленый', value: '#059669' },
  { name: 'Золотой', value: '#D97706' },
];

const CarViewer3D: React.FC<CarViewer3DProps> = ({ carName, modelPath, onColorChange }) => {
  const [selectedColor, setSelectedColor] = useState('#DC2626');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [modelError, setModelError] = useState(false);
  const [hasModel, setHasModel] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const orbitControlsRef = useRef<any>(null);

  // Проверяем, есть ли модель
  useEffect(() => {
    if (modelPath) {
      setHasModel(true);
      setModelError(false);
      // Начинаем загрузку с небольшой задержкой чтобы страница успела отобразиться
      setTimeout(() => {
        setIsLoading(true);
        setLoadingProgress(0);
      }, 100);
    } else {
      setHasModel(false);
      setIsLoading(false);
    }
  }, [modelPath]);

  // Улучшенная анимация загрузки - более равномерная
  useEffect(() => {
    if (hasModel && modelPath && !modelError) {
      setIsLoading(true);
      setLoadingProgress(0);
      
      // Создаем более реалистичную анимацию прогресса
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          // Более равномерное увеличение с небольшой случайностью
          return prev + Math.random() * 5 + 2;
        });
      }, 150);

      return () => clearInterval(interval);
    }
  }, [hasModel, modelPath, modelError]);

  const handleColorChange = (color: string) => {
    if (isLoading) return; // Блокируем смену цвета во время загрузки
    
    setSelectedColor(color);
    if (onColorChange) {
      onColorChange(color);
    }
  };

  const resetView = () => {
    if (isLoading) return; // Блокируем действия во время загрузки
    
    // Сброс камеры к исходному положению
    if (orbitControlsRef.current) {
      // Сброс к изначальной позиции
      orbitControlsRef.current.object.position.set(8, 4, 8);
      orbitControlsRef.current.target.set(0, 0, 0);
      orbitControlsRef.current.update();
    }
  };

  const toggleFullscreen = () => {
    if (isLoading) return; // Блокируем действия во время загрузки
    setIsFullscreen(!isFullscreen);
  };

  const handleModelError = () => {
    setModelError(true);
    setHasModel(false);
    setIsLoading(false);
  };

  const handleModelLoaded = () => {
    setLoadingProgress(100);
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-base sm:text-lg">3D Просмотр - {carName}</span>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={resetView}
                disabled={isLoading}
                className="h-8 w-8 p-0"
                title="Сбросить вид"
              >
                <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleFullscreen}
                disabled={isLoading}
                className="h-8 w-8 p-0"
                title={isFullscreen ? "Выйти из полноэкранного режима" : "Полноэкранный режим"}
              >
                {isFullscreen ? <Minimize2 className="h-3 w-3 sm:h-4 sm:w-4" /> : <Maximize2 className="h-3 w-3 sm:h-4 sm:w-4" />}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className={`relative ${isFullscreen ? 'h-screen' : 'h-64 sm:h-80 md:h-96'} bg-gradient-to-b from-sky-200 to-sky-100`}>
            {/* Overlay загрузки */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/20 z-10 flex items-center justify-center"
                />
              )}
            </AnimatePresence>

            <Canvas
              camera={{ position: [8, 4, 8], fov: 50 }}
              shadows
              className="w-full h-full"
            >
              <Suspense fallback={<LoadingFallback progress={loadingProgress} />}>
                <ambientLight intensity={0.4} />
                <directionalLight
                  position={[10, 10, 10]}
                  intensity={1}
                  castShadow
                />
                <spotLight
                  position={[5, 8, 5]}
                  angle={0.3}
                  penumbra={1}
                  intensity={0.5}
                  castShadow
                />
                
                {hasModel && modelPath && !modelError ? (
                  <ModelErrorBoundary onError={handleModelError}>
                    <GLBCarModel 
                      modelPath={modelPath} 
                      color={selectedColor} 
                      onError={handleModelError}
                      onLoaded={handleModelLoaded}
                    />
                  </ModelErrorBoundary>
                ) : (
                  <Html center>
                    <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-yellow-700 text-sm">3D модель не найдена</p>
                    </div>
                  </Html>
                )}
                
                <OrbitControls
                  ref={orbitControlsRef}
                  enabled={!isLoading} // Отключаем управление во время загрузки
                  enablePan={false}
                  enableZoom={true}
                  enableRotate={true}
                  minDistance={5}
                  maxDistance={15}
                  minPolarAngle={Math.PI / 6}
                  maxPolarAngle={Math.PI / 2.5}
                  autoRotate={false}
                  autoRotateSpeed={0.5}
                />
              </Suspense>
            </Canvas>
          </div>
          
          {/* Панель кастомизации */}
          <motion.div 
            className="p-3 sm:p-4 border-t bg-white"
            animate={{ opacity: isLoading ? 0.5 : 1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Palette className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
              <span className="font-medium text-sm sm:text-base">Цвет кузова:</span>
              {isLoading && (
                <span className="text-xs text-gray-500">(доступно после загрузки)</span>
              )}
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {availableColors.map((color) => (
                <Button
                  key={color.value}
                  variant={selectedColor === color.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleColorChange(color.value)}
                  disabled={isLoading}
                  className="flex items-center gap-2 text-xs sm:text-sm h-8 sm:h-9"
                >
                  <div
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-gray-300 flex-shrink-0"
                    style={{ backgroundColor: color.value }}
                  />
                  <span className="truncate">{color.name}</span>
                </Button>
              ))}
            </div>
            
            <div className="mt-3 sm:mt-4 flex items-center justify-between">
              <div className="text-xs sm:text-sm text-gray-600">
                <p>💡 <span className="hidden sm:inline">Используйте мышь для вращения, колесо для масштабирования</span><span className="sm:hidden">Используйте жесты для управления</span></p>
              </div>
              {hasModel && modelPath && !isLoading && (
                <div className="text-xs text-green-600 flex items-center gap-1">
                  <span>✓</span>
                  <span className="hidden sm:inline">Реальная 3D модель</span>
                  <span className="sm:hidden">3D модель</span>
                </div>
              )}
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Предварительная загрузка только одной модели для примера
// useGLTF.preload('/models/2019_bmw_i8_roadster.glb');

export default CarViewer3D; 