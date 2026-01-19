import { PercentFormat, OperationType } from '../../../types';

// パーセントを割・分に変換
export const percentToWaribu = (percent: number): { wari: number; bu: number } => {
  const wari = Math.floor(percent / 10);
  const bu = percent % 10;
  return { wari, bu };
};

// 割・分をパーセントに変換
export const waribuToPercent = (wari: number, bu: number = 0): number => {
  return wari * 10 + bu;
};

// 日本語表現を生成
export const formatPercent = (
  percent: number,
  format: PercentFormat,
  operation?: OperationType
): string => {
  const { wari, bu } = percentToWaribu(percent);
  const operationSuffix = operation === 'discount' ? '引き' : operation === 'increase' ? '増し' : '';

  switch (format) {
    case 'percent':
      return operation ? `${percent}%${operationSuffix}` : `${percent}%`;
    case 'wari':
      return operation ? `${wari}割${operationSuffix}` : `${wari}割`;
    case 'waribu':
      if (bu === 0) {
        return operation ? `${wari}割${operationSuffix}` : `${wari}割`;
      }
      return operation ? `${wari}割${bu}分${operationSuffix}` : `${wari}割${bu}分`;
    default:
      return `${percent}%`;
  }
};

// 計算結果を取得
export const calculateResult = (
  baseValue: number,
  percent: number,
  operation: OperationType
): number => {
  if (operation === 'discount') {
    return Math.round(baseValue * (1 - percent / 100));
  } else {
    return Math.round(baseValue * (1 + percent / 100));
  }
};

// 計算式を取得
export const getFormula = (
  baseValue: number,
  percent: number,
  operation: OperationType
): string => {
  const result = calculateResult(baseValue, percent, operation);
  const multiplier = operation === 'discount' ? (100 - percent) / 100 : (100 + percent) / 100;

  return `${baseValue} × ${multiplier.toFixed(2)} = ${result}`;
};

// 説明文を生成
export const getExplanation = (
  baseValue: number,
  percent: number,
  operation: OperationType
): string[] => {
  const result = calculateResult(baseValue, percent, operation);
  const affectedAmount = Math.round(baseValue * (percent / 100));

  if (operation === 'discount') {
    return [
      `もとの値: ${baseValue}円`,
      `${percent}% = ${baseValue}のうち${affectedAmount}`,
      `${percent}%引き = ${affectedAmount}を引く`,
      `残り: ${result}円 (${100 - percent}%)`,
    ];
  } else {
    return [
      `もとの値: ${baseValue}円`,
      `${percent}% = ${baseValue}の${percent / 100}倍 = ${affectedAmount}`,
      `${percent}%増し = ${affectedAmount}を足す`,
      `合計: ${result}円 (${100 + percent}%)`,
    ];
  }
};
