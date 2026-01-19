import { useState, useCallback, useRef, useEffect } from 'react';
import { OperationType, PercentFormat, AnimationStep } from '../../../types';

interface UsePercentSimulatorReturn {
  baseValue: number;
  percentValue: number;
  operation: OperationType;
  format: PercentFormat;
  animationStep: AnimationStep;
  isPlaying: boolean;
  animatedCells: number;
  showIncrease: boolean;
  showResult: boolean;
  setBaseValue: (value: number) => void;
  setPercentValue: (value: number) => void;
  setOperation: (operation: OperationType) => void;
  setFormat: (format: PercentFormat) => void;
  startAnimation: () => void;
  reset: () => void;
}

export const usePercentSimulator = (): UsePercentSimulatorReturn => {
  const [baseValue, setBaseValue] = useState(100);
  const [percentValue, setPercentValue] = useState(20);
  const [operation, setOperation] = useState<OperationType>('discount');
  const [format, setFormat] = useState<PercentFormat>('percent');
  const [animationStep, setAnimationStep] = useState<AnimationStep>('idle');
  const [isPlaying, setIsPlaying] = useState(false);
  const [animatedCells, setAnimatedCells] = useState(0);
  const [showIncrease, setShowIncrease] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const animationRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    clearTimers();
    setAnimationStep('idle');
    setIsPlaying(false);
    setAnimatedCells(0);
    setShowIncrease(false);
    setShowResult(false);
  }, [clearTimers]);

  const startAnimation = useCallback(() => {
    reset();
    setIsPlaying(true);

    const totalCells = Math.round((percentValue / 100) * baseValue);

    // Step 1: Show base (idle -> showBase)
    setAnimationStep('showBase');

    // Step 2: After 1s, start showing percent
    timeoutRef.current = setTimeout(() => {
      setAnimationStep('showPercent');

      if (operation === 'increase') {
        setShowIncrease(true);
      }

      // Animate cells one by one
      let currentCell = 0;
      const animateCell = () => {
        if (currentCell < totalCells) {
          currentCell++;
          setAnimatedCells(currentCell);
          timeoutRef.current = setTimeout(animateCell, 50);
        } else {
          // Step 3: After all cells animated, show operation
          timeoutRef.current = setTimeout(() => {
            setAnimationStep('showOperation');

            // Step 4: After 1s, show result
            timeoutRef.current = setTimeout(() => {
              setAnimationStep('showResult');
              setShowResult(true);
              setIsPlaying(false);
            }, 1000);
          }, 500);
        }
      };

      animateCell();
    }, 1000);
  }, [baseValue, percentValue, operation, reset]);

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  return {
    baseValue,
    percentValue,
    operation,
    format,
    animationStep,
    isPlaying,
    animatedCells,
    showIncrease,
    showResult,
    setBaseValue,
    setPercentValue,
    setOperation,
    setFormat,
    startAnimation,
    reset,
  };
};
