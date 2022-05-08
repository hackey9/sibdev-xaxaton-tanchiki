import { observer } from 'mobx-react-lite';
import React from 'react';

import { usePageRenderer } from './hooks/usePageRenderer';
import { PagesController } from './stores/pages/PagesController';

import './App.css';

import './styles/index.scss';

const App = observer(() => {
  const ref = React.useRef<PagesController>(null!);
  if (!ref.current) {
    ref.current = new PagesController();
  }

  const renderPage = usePageRenderer();

  return <div className="App">{renderPage(ref.current.currentPage)}</div>;
});

export default App;
