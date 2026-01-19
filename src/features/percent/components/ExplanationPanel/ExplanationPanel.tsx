import { FC } from 'react';
import { AnimationStep, OperationType } from '../../../../types';
import { calculateResult, getFormula, getExplanation, formatPercent } from '../../utils/conversion';
import styles from './ExplanationPanel.module.css';

interface ExplanationPanelProps {
  baseValue: number;
  percentValue: number;
  operation: OperationType;
  animationStep: AnimationStep;
}

export const ExplanationPanel: FC<ExplanationPanelProps> = ({
  baseValue,
  percentValue,
  operation,
  animationStep,
}) => {
  const result = calculateResult(baseValue, percentValue, operation);
  const formula = getFormula(baseValue, percentValue, operation);
  const explanations = getExplanation(baseValue, percentValue, operation);

  const getStepMessage = (): string => {
    switch (animationStep) {
      case 'idle':
        return '「アニメーション開始」を押してください';
      case 'showBase':
        return `これが100%（もとの値: ${baseValue}円）`;
      case 'showPercent':
        return operation === 'discount'
          ? `${formatPercent(percentValue, 'percent')} = ${baseValue}のうち${Math.round(baseValue * percentValue / 100)}`
          : `${formatPercent(percentValue, 'percent')}増し = ${Math.round(baseValue * percentValue / 100)}を足す`;
      case 'showOperation':
        return operation === 'discount'
          ? `${formatPercent(percentValue, 'percent', operation)} = この部分を引く`
          : `${formatPercent(percentValue, 'percent', operation)} = この部分を足す`;
      case 'showResult':
        return `結果: ${result}円（${operation === 'discount' ? 100 - percentValue : 100 + percentValue}%）`;
      default:
        return '';
    }
  };

  const getStepIndex = (): number => {
    const steps: AnimationStep[] = ['idle', 'showBase', 'showPercent', 'showOperation', 'showResult'];
    return steps.indexOf(animationStep);
  };

  return (
    <div className={styles.container}>
      <div className={styles.messageBox}>
        <span className={styles.message}>{getStepMessage()}</span>
      </div>

      <div className={styles.steps}>
        {['もとの値を見る', '割合を確認', '操作を理解', '結果を見る'].map((label, index) => (
          <div
            key={label}
            className={`${styles.step} ${index < getStepIndex() ? styles.completed : ''} ${index === getStepIndex() - 1 ? styles.current : ''}`}
          >
            <div className={styles.stepCircle}>
              {index < getStepIndex() ? '✓' : index + 1}
            </div>
            <span className={styles.stepLabel}>{label}</span>
          </div>
        ))}
      </div>

      {animationStep === 'showResult' && (
        <div className={styles.result}>
          <div className={styles.explanationList}>
            {explanations.map((exp, index) => (
              <div key={index} className={styles.explanationItem}>
                {exp}
              </div>
            ))}
          </div>
          <div className={styles.formulaBox}>
            <span className={styles.formulaLabel}>計算式</span>
            <span className={styles.formula}>{formula}</span>
          </div>
        </div>
      )}
    </div>
  );
};
