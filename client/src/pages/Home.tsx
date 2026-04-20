import React, { useState, useEffect, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ArrayVisualization from '@/components/ArrayVisualization';
import AlgorithmStatePanel from '@/components/AlgorithmStatePanel';
import AnimationControls from '@/components/AnimationControls';
import PrincipleExplainer from '@/components/PrincipleExplainer';
import {
  MergeSortInversePairs,
  MergeSortState,
  generateRandomArray,
  countInversePairsBruteForce,
} from '@/lib/mergeSort';

/**
 * Home Page - Merge Sort Inverse Pairs Animation
 * 
 * Design: Educational Minimalism with Interactive Depth\n * - Left panel (60%): Large interactive array visualization\n * - Right panel (40%): Algorithm state and explanation\n * - Bottom: Timeline scrubber and playback controls\n */

const DEFAULT_ARRAY = [5, 2, 8, 1, 9, 3, 7, 4, 6];

export default function Home() {
  const [inputArray, setInputArray] = useState<number[]>(DEFAULT_ARRAY);
  const [arrayInput, setArrayInput] = useState<string>(DEFAULT_ARRAY.join(', '));
  const [states, setStates] = useState<MergeSortState[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [hoveredElement, setHoveredElement] = useState<number | null>(null);

  // Initialize algorithm
  useEffect(() => {
    const algorithm = new MergeSortInversePairs(inputArray);
    const algorithmStates = algorithm.run();
    setStates(algorithmStates);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [inputArray]);

  // Animation loop
  useEffect(() => {
    if (!isPlaying || states.length === 0) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= states.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 800 / speed); // Base interval: 800ms

    return () => clearInterval(interval);
  }, [isPlaying, speed, states.length]);

  const handlePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, states.length - 1));
    setIsPlaying(false);
  }, [states.length]);

  const handlePrevious = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    setIsPlaying(false);
  }, []);

  const handleReset = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  const handleSpeedChange = useCallback((newSpeed: number) => {
    setSpeed(newSpeed);
  }, []);

  const handleStepChange = useCallback((step: number) => {
    setCurrentStep(step);
    setIsPlaying(false);
  }, []);

  const handleGenerateRandom = useCallback(() => {
    const randomArray = generateRandomArray(8, 20);
    setInputArray(randomArray);
    setArrayInput(randomArray.join(', '));
  }, []);

  const handleParseInput = useCallback(() => {
    try {
      const parsed = arrayInput
        .split(',')
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => !isNaN(n));

      if (parsed.length === 0) {
        alert('请输入有效的数字');
        return;
      }

      if (parsed.length > 20) {
        alert('数组长度不能超过 20');
        return;
      }

      setInputArray(parsed);
    } catch (error) {
      alert('输入格式错误，请输入逗号分隔的数字');
    }
  }, [arrayInput]);

  const currentState = states[currentStep] || states[0];
  const bruteForceCount = countInversePairsBruteForce(inputArray);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-border shadow-sm">
        <div className="container py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            归并排序逆序对计数动画演示
          </h1>
          <p className="text-gray-600 mt-2">
            通过交互式动画理解如何高效地计算数组中的逆序对
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        {/* Input Section */}
        <div className="bg-white rounded-lg border border-border shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">输入数组</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                输入数字（逗号分隔）
              </label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={arrayInput}
                  onChange={(e) => setArrayInput(e.target.value)}
                  placeholder="例如：5, 2, 8, 1, 9"
                  className="flex-1"
                />
                <Button onClick={handleParseInput} variant="default">
                  确认
                </Button>
                <Button onClick={handleGenerateRandom} variant="outline">
                  随机生成
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                最多 20 个元素，每个元素 1-100
              </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-blue-50 rounded border border-blue-200">
                <div className="text-xs text-gray-600 uppercase tracking-wide font-semibold">
                  数组长度
                </div>
                <div className="text-2xl font-bold text-blue-600 mt-1">
                  {inputArray.length}
                </div>
              </div>
              <div className="p-3 bg-green-50 rounded border border-green-200">
                <div className="text-xs text-gray-600 uppercase tracking-wide font-semibold">
                  逆序对总数
                </div>
                <div className="text-2xl font-bold text-green-600 mt-1">
                  {currentState?.inversePairs || 0}
                </div>
              </div>
              <div className="p-3 bg-purple-50 rounded border border-purple-200">
                <div className="text-xs text-gray-600 uppercase tracking-wide font-semibold">
                  验证（暴力法）
                </div>
                <div className="text-2xl font-bold text-purple-600 mt-1">
                  {bruteForceCount}
                </div>
              </div>
              <div className="p-3 bg-orange-50 rounded border border-orange-200">
                <div className="text-xs text-gray-600 uppercase tracking-wide font-semibold">
                  进度
                </div>
                <div className="text-2xl font-bold text-orange-600 mt-1">
                  {Math.round((currentStep / Math.max(states.length - 1, 1)) * 100)}%
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel: Array Visualization (60%) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
              <div className="p-4 border-b border-border bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">
                  数组可视化
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  深青色：已排序 | 橙色：合并中 | 浅黄色：分割中 | 红色：逆序对
                </p>
              </div>
              <div className="p-4" style={{ minHeight: '500px' }}>
                {states.length > 0 && (
                  <ArrayVisualization
                    state={currentState}
                    onElementHover={setHoveredElement}
                  />
                )}
              </div>
            </div>

            {/* Animation Controls */}
            {states.length > 0 && (
              <AnimationControls
                isPlaying={isPlaying}
                currentStep={currentStep}
                totalSteps={states.length}
                speed={speed}
                onPlayPause={handlePlayPause}
                onNext={handleNext}
                onPrevious={handlePrevious}
                onReset={handleReset}
                onSpeedChange={handleSpeedChange}
                onStepChange={handleStepChange}
              />
            )}
          </div>

          {/* Right Panel: Algorithm State & Principles (40%) */}
          <div className="lg:col-span-1 space-y-4">
            <Tabs defaultValue="state" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                <TabsTrigger value="state" className="text-xs sm:text-sm">
                  算法状态
                </TabsTrigger>
                <TabsTrigger value="principles" className="text-xs sm:text-sm">
                  原理讲解
                </TabsTrigger>
              </TabsList>

              <TabsContent value="state" className="space-y-4 mt-4">
                {states.length > 0 && (
                  <AlgorithmStatePanel
                    state={currentState}
                    originalArray={inputArray}
                  />
                )}
              </TabsContent>

              <TabsContent value="principles" className="mt-4 space-y-4 max-h-[600px] overflow-y-auto">
                <PrincipleExplainer />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Educational Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-border p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              🎯 算法步骤
            </h3>
            <ol className="space-y-2 text-sm text-gray-700">
              <li>
                <strong>1. 分割：</strong>
                递归地将数组分成两半
              </li>
              <li>
                <strong>2. 排序：</strong>
                对每个子数组递归排序
              </li>
              <li>
                <strong>3. 合并：</strong>
                合并两个已排序的子数组
              </li>
              <li>
                <strong>4. 计数：</strong>
                在合并时计算逆序对数量
              </li>
            </ol>
          </div>

          <div className="bg-white rounded-lg border border-border p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              ✨ 核心洞察
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              在合并两个已排序的子数组时，当左子数组的元素大于右子数组的元素时，左子数组中从该位置到末尾的所有元素都与右子数组的元素形成逆序对。这个观察使我们能够在 O(n log n) 时间内计算所有逆序对。
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
