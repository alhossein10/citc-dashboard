import './App.css';
import { MindMapDiagram } from './components/MindMapDiagram';
import { OrgChart } from './components/OrgChart';
import { FishboneDiagram } from './components/FishboneDiagram';
import { WirelessBrightness } from './components/WirelessBrightness';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [currentView, setCurrentView] = useState('mindmap');

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {currentView === 'mindmap' ? (
          <MindMapDiagram 
            key="mindmap"
            onNavigate={(view) => setCurrentView(view)} 
          />
        ) : currentView === 'orgchart' ? (
          <OrgChart 
            key="orgchart"
            onBack={() => setCurrentView('mindmap')}
            onNavigate={(view) => setCurrentView(view)}
          />
        ) : currentView === 'fishbone' ? (
          <FishboneDiagram 
            key="fishbone"
            onBack={() => setCurrentView('orgchart')}
          />
        ) : (
          <WirelessBrightness 
            key="wireless"
            onBack={() => setCurrentView('orgchart')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
