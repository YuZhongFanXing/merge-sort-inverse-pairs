import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';

interface AnimationControlsProps {
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  speed: number;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  onStepChange: (step: number) => void;
}

const AnimationControls: React.FC<AnimationControlsProps> = ({
  isPlaying,
  currentStep,
  totalSteps,
  speed,
  onPlayPause,
  onNext,
  onPrevious,
  onReset,
  onSpeedChange,
  onStepChange,
}) => {
  return (
    <div className="bg-white rounded-lg border border-border shadow-sm p-4 space-y-4">
      {/* Playback Controls */}
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          title="Reset to start"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onPrevious}
          disabled={currentStep === 0}
          title="Previous step"
        >
          <SkipBack className="w-4 h-4" />
        </Button>

        <Button
          variant="default"
          size="sm"
          onClick={onPlayPause}
          className="px-6"
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onNext}
          disabled={currentStep === totalSteps - 1}
          title="Next step"
        >
          <SkipForward className="w-4 h-4" />
        </Button>
      </div>

      {/* Step Information */}
      <div className="text-center text-sm text-gray-600">
        步骤 {currentStep + 1} / {totalSteps}
      </div>

      {/* Timeline Slider */}
      <div className="space-y-2">
        <Slider
          value={[currentStep]}
          onValueChange={(value) => onStepChange(value[0])}
          min={0}
          max={totalSteps - 1}
          step={1}
          className="w-full"
        />
      </div>

      {/* Speed Control */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs text-gray-600">
          <span>播放速度</span>
          <span className="font-semibold">{speed.toFixed(1)}x</span>
        </div>
        <Slider
          value={[speed]}
          onValueChange={(value) => onSpeedChange(value[0])}
          min={0.5}
          max={3}
          step={0.5}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default AnimationControls;
