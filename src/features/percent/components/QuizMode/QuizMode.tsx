import { FC, useState, useCallback, useMemo } from 'react';
import { OperationType, QuizQuestion } from '../../../../types';
import { Button } from '../../../../components/Button';
import { Input } from '../../../../components/Input';
import { PercentGrid } from '../PercentGrid';
import { calculateResult, formatPercent } from '../../utils/conversion';
import styles from './QuizMode.module.css';

interface QuizModeProps {
  level?: 1 | 2 | 3;
}

const generateQuestion = (level: number): QuizQuestion => {
  let baseValue: number;
  let percentValue: number;
  const operation: OperationType = Math.random() > 0.5 ? 'discount' : 'increase';

  switch (level) {
    case 1:
      baseValue = 100;
      percentValue = [10, 20, 30, 40, 50][Math.floor(Math.random() * 5)];
      break;
    case 2:
      baseValue = [80, 100, 120, 150, 200][Math.floor(Math.random() * 5)];
      percentValue = [10, 15, 20, 25, 30][Math.floor(Math.random() * 5)];
      break;
    case 3:
    default:
      baseValue = [50, 80, 100, 120, 150, 200, 250][Math.floor(Math.random() * 7)];
      percentValue = [5, 10, 15, 20, 25, 30, 35, 40][Math.floor(Math.random() * 8)];
      break;
  }

  const correctAnswer = calculateResult(baseValue, percentValue, operation);
  const expression = `${baseValue}円の${formatPercent(percentValue, 'waribu', operation)}`;

  return {
    baseValue,
    percentValue,
    operation,
    correctAnswer,
    expression,
  };
};

export const QuizMode: FC<QuizModeProps> = ({ level = 1 }) => {
  const [currentLevel, setCurrentLevel] = useState(level);
  const [question, setQuestion] = useState<QuizQuestion>(() => generateQuestion(level));
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [showHint, setShowHint] = useState(false);

  const checkAnswer = useCallback(() => {
    const answer = parseInt(userAnswer, 10);
    const correct = answer === question.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    setScore((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
    }));
  }, [userAnswer, question.correctAnswer]);

  const nextQuestion = useCallback(() => {
    setQuestion(generateQuestion(currentLevel));
    setUserAnswer('');
    setShowResult(false);
    setShowHint(false);
  }, [currentLevel]);

  const handleLevelChange = useCallback((newLevel: 1 | 2 | 3) => {
    setCurrentLevel(newLevel);
    setQuestion(generateQuestion(newLevel));
    setUserAnswer('');
    setShowResult(false);
    setShowHint(false);
    setScore({ correct: 0, total: 0 });
  }, []);

  const hintText = useMemo(() => {
    const { baseValue, percentValue, operation } = question;
    if (operation === 'discount') {
      return `ヒント: ${baseValue} × ${(100 - percentValue) / 100} = ?`;
    } else {
      return `ヒント: ${baseValue} × ${(100 + percentValue) / 100} = ?`;
    }
  }, [question]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>練習モード</h2>
        <div className={styles.levelSelector}>
          {[1, 2, 3].map((l) => (
            <Button
              key={l}
              variant={currentLevel === l ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => handleLevelChange(l as 1 | 2 | 3)}
            >
              レベル{l}
            </Button>
          ))}
        </div>
      </div>

      <div className={styles.scoreBoard}>
        <span className={styles.scoreLabel}>スコア:</span>
        <span className={styles.scoreValue}>
          {score.correct} / {score.total}
        </span>
        {score.total > 0 && (
          <span className={styles.scorePercent}>
            ({Math.round((score.correct / score.total) * 100)}%)
          </span>
        )}
      </div>

      <div className={styles.questionArea}>
        <div className={styles.questionText}>
          <span className={styles.questionLabel}>問題:</span>
          <span className={styles.questionExpression}>{question.expression}</span>
          <span className={styles.questionSuffix}>はいくら？</span>
        </div>

        <div className={styles.visualHint}>
          <PercentGrid
            baseValue={Math.min(question.baseValue, 100)}
            percentValue={question.percentValue}
            operation={question.operation}
            animatedCells={showHint ? Math.round((question.percentValue / 100) * Math.min(question.baseValue, 100)) : 0}
            showIncrease={showHint && question.operation === 'increase'}
            showResult={showResult}
          />
        </div>

        {showHint && !showResult && (
          <div className={styles.hintBox}>
            {hintText}
          </div>
        )}

        <div className={styles.answerArea}>
          <Input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="答えを入力"
            disabled={showResult}
          />
          <span className={styles.unit}>円</span>
        </div>

        {showResult && (
          <div className={`${styles.resultBox} ${isCorrect ? styles.correct : styles.incorrect}`}>
            {isCorrect ? (
              <span className={styles.resultMessage}>正解!</span>
            ) : (
              <>
                <span className={styles.resultMessage}>残念...</span>
                <span className={styles.correctAnswer}>
                  正解は {question.correctAnswer}円 です
                </span>
              </>
            )}
          </div>
        )}

        <div className={styles.actions}>
          {!showResult ? (
            <>
              <Button
                variant="secondary"
                onClick={() => setShowHint(true)}
                disabled={showHint}
              >
                ヒントを見る
              </Button>
              <Button
                variant="primary"
                onClick={checkAnswer}
                disabled={!userAnswer}
              >
                答え合わせ
              </Button>
            </>
          ) : (
            <Button variant="primary" onClick={nextQuestion}>
              次の問題へ
            </Button>
          )}
        </div>
      </div>

      <div className={styles.levelGuide}>
        <div className={styles.guideTitle}>レベル説明</div>
        <div className={styles.guideList}>
          <div className={`${styles.guideItem} ${currentLevel === 1 ? styles.active : ''}`}>
            <span className={styles.guideLevelBadge}>Lv1</span>
            <span>100を基準にした割合</span>
          </div>
          <div className={`${styles.guideItem} ${currentLevel === 2 ? styles.active : ''}`}>
            <span className={styles.guideLevelBadge}>Lv2</span>
            <span>任意の数（80・200など）</span>
          </div>
          <div className={`${styles.guideItem} ${currentLevel === 3 ? styles.active : ''}`}>
            <span className={styles.guideLevelBadge}>Lv3</span>
            <span>様々な割合の組み合わせ</span>
          </div>
        </div>
      </div>
    </div>
  );
};
