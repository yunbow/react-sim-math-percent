import { FC } from 'react';
import { PercentGrid } from '../components/PercentGrid';
import { ControlPanel } from '../components/ControlPanel';
import { ConversionPanel } from '../components/ConversionPanel';
import { ExplanationPanel } from '../components/ExplanationPanel';
import { usePercentSimulator } from '../hooks/usePercentSimulator';
import styles from './PercentSimulator.module.css';

export const PercentSimulator: FC = () => {
  const {
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
  } = usePercentSimulator();

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.visualArea}>
          <PercentGrid
            baseValue={baseValue}
            percentValue={percentValue}
            operation={operation}
            animatedCells={animatedCells}
            showIncrease={showIncrease}
            showResult={showResult}
          />
        </div>
        <div className={styles.explanationArea}>
          <ExplanationPanel
            baseValue={baseValue}
            percentValue={percentValue}
            operation={operation}
            animationStep={animationStep}
          />
        </div>
      </div>

      <div className={styles.sidebar}>
        <ControlPanel
          baseValue={baseValue}
          percentValue={percentValue}
          operation={operation}
          format={format}
          isPlaying={isPlaying}
          onBaseValueChange={setBaseValue}
          onPercentValueChange={setPercentValue}
          onOperationChange={setOperation}
          onFormatChange={setFormat}
          onPlay={startAnimation}
          onReset={reset}
        />
        <ConversionPanel
          percent={percentValue}
          operation={operation}
        />
      </div>
    </div>
  );
};
