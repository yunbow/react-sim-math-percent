import { FC, useState } from 'react';
import { PercentFormat, OperationType } from '../../../../types';
import { formatPercent, percentToWaribu } from '../../utils/conversion';
import styles from './ConversionPanel.module.css';

interface ConversionPanelProps {
  percent: number;
  operation: OperationType;
  onHover?: (format: PercentFormat | null) => void;
}

interface ConversionItem {
  format: PercentFormat;
  label: string;
  display: string;
  explanation: string;
}

export const ConversionPanel: FC<ConversionPanelProps> = ({
  percent,
  operation,
  onHover,
}) => {
  const [hoveredFormat, setHoveredFormat] = useState<PercentFormat | null>(null);
  const { wari, bu } = percentToWaribu(percent);

  const conversions: ConversionItem[] = [
    {
      format: 'percent',
      label: 'パーセント',
      display: formatPercent(percent, 'percent', operation),
      explanation: `100を基準にした割合で${percent}`,
    },
    {
      format: 'wari',
      label: '割',
      display: formatPercent(percent, 'wari', operation),
      explanation: `10を基準にした割合で${wari}割`,
    },
    {
      format: 'waribu',
      label: '割分',
      display: formatPercent(percent, 'waribu', operation),
      explanation: bu > 0
        ? `${wari}割と${bu}分 = ${percent}%`
        : `${wari}割 = ${percent}%`,
    },
  ];

  const handleMouseEnter = (format: PercentFormat) => {
    setHoveredFormat(format);
    onHover?.(format);
  };

  const handleMouseLeave = () => {
    setHoveredFormat(null);
    onHover?.(null);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>言葉と数字の変換</h3>
      <div className={styles.conversionList}>
        {conversions.map((item) => (
          <div
            key={item.format}
            className={`${styles.conversionItem} ${hoveredFormat === item.format ? styles.hovered : ''}`}
            onMouseEnter={() => handleMouseEnter(item.format)}
            onMouseLeave={handleMouseLeave}
          >
            <span className={styles.label}>{item.label}</span>
            <span className={styles.display}>{item.display}</span>
            {hoveredFormat === item.format && (
              <div className={styles.tooltip}>
                {item.explanation}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={styles.visualGuide}>
        <div className={styles.guideTitle}>覚え方</div>
        <div className={styles.guideContent}>
          <div className={styles.guideRow}>
            <span className={styles.guideLabel}>1割</span>
            <span className={styles.guideEquals}>=</span>
            <span className={styles.guideValue}>10%</span>
          </div>
          <div className={styles.guideRow}>
            <span className={styles.guideLabel}>1分</span>
            <span className={styles.guideEquals}>=</span>
            <span className={styles.guideValue}>1%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
