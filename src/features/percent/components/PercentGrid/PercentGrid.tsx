import { FC, useMemo } from 'react';
import { CellState, OperationType } from '../../../../types';
import styles from './PercentGrid.module.css';

interface PercentGridProps {
  baseValue: number;
  percentValue: number;
  operation: OperationType;
  animatedCells: number;
  showIncrease: boolean;
  showResult: boolean;
}

export const PercentGrid: FC<PercentGridProps> = ({
  baseValue,
  percentValue,
  operation,
  animatedCells,
  showIncrease,
  showResult,
}) => {
  const cells = useMemo(() => {
    const result: { index: number; state: CellState }[] = [];
    const baseCount = Math.min(baseValue, 100);
    const affectedCount = Math.round((percentValue / 100) * baseCount);

    if (operation === 'discount') {
      // 引きの場合
      for (let i = 0; i < 100; i++) {
        if (i < baseCount) {
          if (showResult && i >= baseCount - affectedCount) {
            result.push({ index: i, state: 'empty' });
          } else if (i >= baseCount - affectedCount && i < baseCount - affectedCount + animatedCells) {
            result.push({ index: i, state: 'discount' });
          } else if (showResult && i < baseCount - affectedCount) {
            result.push({ index: i, state: 'result' });
          } else {
            result.push({ index: i, state: 'base' });
          }
        } else {
          result.push({ index: i, state: 'empty' });
        }
      }
    } else {
      // 増しの場合
      for (let i = 0; i < 100; i++) {
        if (i < baseCount) {
          if (showResult) {
            result.push({ index: i, state: 'result' });
          } else {
            result.push({ index: i, state: 'base' });
          }
        } else {
          result.push({ index: i, state: 'empty' });
        }
      }
    }

    return result;
  }, [baseValue, percentValue, operation, animatedCells, showResult]);

  const increaseCells = useMemo(() => {
    if (operation !== 'increase' || !showIncrease) return [];

    const baseCount = Math.min(baseValue, 100);
    const increaseCount = Math.min(animatedCells, Math.round((percentValue / 100) * baseCount));
    const result: { index: number; state: CellState }[] = [];

    for (let i = 0; i < increaseCount; i++) {
      result.push({ index: i, state: showResult ? 'result' : 'increase' });
    }

    return result;
  }, [baseValue, percentValue, operation, animatedCells, showIncrease, showResult]);

  const getCellClassName = (state: CellState) => {
    const classMap: Record<CellState, string> = {
      base: styles.base,
      discount: styles.discount,
      increase: styles.increase,
      result: styles.result,
      empty: styles.empty,
    };
    return `${styles.cell} ${classMap[state]}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.gridWrapper}>
        <div className={styles.grid}>
          {cells.map((cell) => (
            <div
              key={cell.index}
              className={getCellClassName(cell.state)}
              style={{ animationDelay: `${cell.index * 10}ms` }}
            />
          ))}
        </div>
        {operation === 'increase' && increaseCells.length > 0 && (
          <div className={styles.increaseGrid}>
            {increaseCells.map((cell) => (
              <div
                key={`inc-${cell.index}`}
                className={getCellClassName(cell.state)}
                style={{ animationDelay: `${cell.index * 20}ms` }}
              />
            ))}
          </div>
        )}
      </div>
      <div className={styles.labels}>
        <span className={styles.label}>0%</span>
        <span className={styles.label}>50%</span>
        <span className={styles.label}>100%</span>
      </div>
    </div>
  );
};
