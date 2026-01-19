import { useState } from 'react';
import { PercentSimulator } from './features/percent/PercentSimulator';
import { QuizMode } from './features/percent/components/QuizMode';
import { Button } from './components/Button';
import './theme.css';
import './App.css';

type ViewMode = 'simulator' | 'quiz';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('simulator');

  return (
    <div>
      <header className="header">
        <h1>割合シミュレーター</h1>
        <div className="modeSelector">
          <Button
            variant={viewMode === 'simulator' ? 'primary' : 'secondary'}
            onClick={() => setViewMode('simulator')}
          >
            学習モード
          </Button>
          <Button
            variant={viewMode === 'quiz' ? 'primary' : 'secondary'}
            onClick={() => setViewMode('quiz')}
          >
            練習モード
          </Button>
        </div>
      </header>

      <main>
        {viewMode === 'simulator' ? <PercentSimulator /> : <QuizMode />}
      </main>
    </div>
  );
}

export default App;
