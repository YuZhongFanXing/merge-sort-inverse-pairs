import React from 'react';
import { Card } from '@/components/ui/card';
import { MergeSortState } from '@/lib/mergeSort';

interface AlgorithmStatePanelProps {
  state: MergeSortState;
  originalArray: number[];
}

const AlgorithmStatePanel: React.FC<AlgorithmStatePanelProps> = ({
  state,
  originalArray,
}) => {
  return (
    <div className="space-y-4">
      {/* Explanation */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <p className="text-sm text-gray-800 leading-relaxed">
          {state.explanation}
        </p>
      </Card>

      {/* Inverse Pairs Counter */}
      <Card className="p-4">
        <div className="space-y-2">
          <div className="text-xs text-gray-600 uppercase tracking-wide font-semibold">
            逆序对计数
          </div>
          <div className="text-3xl font-bold text-blue-600">
            {state.inversePairs}
          </div>
          <p className="text-xs text-gray-600">
            目前检测到的逆序对总数
          </p>
        </div>
      </Card>

      {/* Current Array */}
      <Card className="p-4">
        <div className="space-y-2">
          <div className="text-xs text-gray-600 uppercase tracking-wide font-semibold">
            当前数组
          </div>
          <div className="flex flex-wrap gap-1">
            {state.array.map((value, index) => (
              <div
                key={index}
                className="px-2 py-1 rounded text-xs font-mono bg-gray-100 text-gray-800"
              >
                {value}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Original Array */}
      <Card className="p-4">
        <div className="space-y-2">
          <div className="text-xs text-gray-600 uppercase tracking-wide font-semibold">
            原始数组
          </div>
          <div className="flex flex-wrap gap-1">
            {originalArray.map((value, index) => (
              <div
                key={index}
                className="px-2 py-1 rounded text-xs font-mono bg-gray-50 text-gray-600"
              >
                {value}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Merge Ranges */}
      {state.mergeRanges.length > 0 && (
        <Card className="p-4">
          <div className="space-y-2">
            <div className="text-xs text-gray-600 uppercase tracking-wide font-semibold">
              {state.mergeRanges.some((r) => r.isMerging) ? '合并范围' : '分割范围'}
            </div>
            <div className="space-y-1">
              {state.mergeRanges.map((range, idx) => (
                <div
                  key={idx}
                  className={`text-xs px-2 py-1 rounded ${
                    range.isMerging
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  [{range.left}, {range.right}]
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Sorted Ranges */}
      {state.sortedRanges.length > 0 && (
        <Card className="p-4">
          <div className="space-y-2">
            <div className="text-xs text-gray-600 uppercase tracking-wide font-semibold">
              已排序范围
            </div>
            <div className="space-y-1">
              {state.sortedRanges.map((range, idx) => (
                <div
                  key={idx}
                  className="text-xs px-2 py-1 rounded bg-teal-100 text-teal-800"
                >
                  [{range.left}, {range.right}]
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Algorithm Status */}
      <Card className="p-4">
        <div className="space-y-2">
          <div className="text-xs text-gray-600 uppercase tracking-wide font-semibold">
            状态
          </div>
          <div className="text-sm font-medium">
            {state.isComplete ? (
              <span className="text-green-600">✓ 排序完成</span>
            ) : (
              <span className="text-blue-600">⟳ 排序进行中</span>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AlgorithmStatePanel;
