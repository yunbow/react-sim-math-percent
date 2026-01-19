// 割合の表現形式
export type PercentFormat = 'percent' | 'wari' | 'waribu';

// 操作タイプ
export type OperationType = 'discount' | 'increase';

// アニメーションのステップ
export type AnimationStep =
  | 'idle'
  | 'showBase'
  | 'showPercent'
  | 'showOperation'
  | 'showResult';

// セルの状態
export type CellState =
  | 'base'      // 基準（青）
  | 'discount'  // 減る部分（赤）
  | 'increase'  // 増える部分（緑）
  | 'result'    // 結果（黄）
  | 'empty';    // 空

// グリッドセル
export interface GridCell {
  index: number;
  state: CellState;
  isAnimating: boolean;
}

// シミュレーターの状態
export interface SimulatorState {
  baseValue: number;
  percentValue: number;
  operation: OperationType;
  format: PercentFormat;
  animationStep: AnimationStep;
  isPlaying: boolean;
}

// クイズの問題
export interface QuizQuestion {
  baseValue: number;
  percentValue: number;
  operation: OperationType;
  correctAnswer: number;
  expression: string;
}
