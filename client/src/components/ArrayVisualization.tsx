import React from 'react';
import { MergeSortState } from '@/lib/mergeSort';

interface ArrayVisualizationProps {
  state: MergeSortState;
  onElementHover?: (index: number | null) => void;
}

const ArrayVisualization: React.FC<ArrayVisualizationProps> = ({
  state,
  onElementHover,
}) => {
  const maxValue = Math.max(...state.array, 100);
  const barHeight = 300;

  const getBarColor = (index: number): string => {
    // Check if element is in a sorted range
    if (state.sortedRanges.some((range) => index >= range.left && index <= range.right)) {
      return '#0D7377'; // Teal - sorted
    }

    // Check if element is in a merge range
    if (state.mergeRanges.some((range) => index >= range.left && index <= range.right)) {
      if (state.mergeRanges.some((range) => index >= range.left && index <= range.right && range.isMerging)) {
        return '#FF9F1C'; // Orange - merging
      }
      return '#FFD580'; // Light yellow - dividing
    }

    // Check if element is highlighted
    if (state.highlightIndices.includes(index)) {
      return '#FF6B6B'; // Red - highlighted
    }

    // Check if element is compared
    if (state.comparedIndices.some((pair) => pair.i === index || pair.j === index)) {
      return '#4ECDC4'; // Cyan - compared
    }

    return '#E8E8E8'; // Gray - default
  };

  const getBarTextColor = (index: number): string => {
    const color = getBarColor(index);
    if (color === '#0D7377' || color === '#FF9F1C' || color === '#FF6B6B') {
      return '#FFFFFF';
    }
    return '#1A1A1A';
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Bar Chart */}
      <div
        className="flex-1 flex items-flex-end justify-center gap-1 px-4 py-8"
        style={{
          minHeight: '400px',
          background: '#fff',
          borderRadius: '8px',
          border: '1px solid #E0E0E0',
        }}
      >
        {state.array.map((value, index) => {
          const height = (value / maxValue) * barHeight;
          const color = getBarColor(index);
          const textColor = getBarTextColor(index);

          return (
            <div
              key={index}
              onMouseEnter={() => onElementHover?.(index)}
              onMouseLeave={() => onElementHover?.(null)}
              style={{
                height: `${height}px`,
                width: `${Math.max(100 / state.array.length, 20)}px`,
                backgroundColor: color,
                borderRadius: '4px 4px 0 0',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                paddingBottom: '4px',
                fontSize: '10px',
                fontWeight: 'bold',
                color: textColor,
              }}
            >
              {state.array.length <= 20 && (
                <span style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                  {value}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#0D7377' }}></div>
          <span>已排序</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#FF9F1C' }}></div>
          <span>合并中</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#FFD580' }}></div>
          <span>分割中</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#FF6B6B' }}></div>
          <span>逆序对</span>
        </div>
      </div>
    </div>
  );
};

export default ArrayVisualization;
