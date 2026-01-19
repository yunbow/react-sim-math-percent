import { FC } from 'react';
import { OperationType, PercentFormat } from '../../../../types';
import { Button } from '../../../../components/Button';
import { Slider } from '../../../../components/Slider';
import { Select } from '../../../../components/Select';
import styles from './ControlPanel.module.css';

interface ControlPanelProps {
  baseValue: number;
  percentValue: number;
  operation: OperationType;
  format: PercentFormat;
  isPlaying: boolean;
  onBaseValueChange: (value: number) => void;
  onPercentValueChange: (value: number) => void;
  onOperationChange: (operation: OperationType) => void;
  onFormatChange: (format: PercentFormat) => void;
  onPlay: () => void;
  onReset: () => void;
}

export const ControlPanel: FC<ControlPanelProps> = ({
  baseValue,
  percentValue,
  operation,
  format,
  isPlaying,
  onBaseValueChange,
  onPercentValueChange,
  onOperationChange,
  onFormatChange,
  onPlay,
  onReset,
}) => {
  const operationOptions = [
    { value: 'discount', label: '引き' },
    { value: 'increase', label: '増し' },
  ];

  const formatOptions = [
    { value: 'percent', label: 'パーセント (%)' },
    { value: 'wari', label: '割' },
    { value: 'waribu', label: '割分' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <Slider
          label="もとの値"
          min={10}
          max={100}
          step={10}
          value={baseValue}
          onChange={(e) => onBaseValueChange(Number(e.target.value))}
          showValue
          disabled={isPlaying}
        />
        <div className={styles.valueHint}>
          {baseValue}円（{baseValue}マス）
        </div>
      </div>

      <div className={styles.section}>
        <Slider
          label="割合"
          min={5}
          max={50}
          step={5}
          value={percentValue}
          onChange={(e) => onPercentValueChange(Number(e.target.value))}
          showValue
          disabled={isPlaying}
        />
        <div className={styles.valueHint}>
          {percentValue}%（{Math.round(percentValue / 10)}割
          {percentValue % 10 !== 0 ? `${percentValue % 10}分` : ''}）
        </div>
      </div>

      <div className={styles.row}>
        <Select
          label="操作"
          options={operationOptions}
          value={operation}
          onChange={(e) => onOperationChange(e.target.value as OperationType)}
          disabled={isPlaying}
        />
        <Select
          label="表示形式"
          options={formatOptions}
          value={format}
          onChange={(e) => onFormatChange(e.target.value as PercentFormat)}
        />
      </div>

      <div className={styles.buttons}>
        <Button
          variant="primary"
          size="lg"
          onClick={onPlay}
          disabled={isPlaying}
        >
          アニメーション開始
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={onReset}
        >
          リセット
        </Button>
      </div>
    </div>
  );
};
