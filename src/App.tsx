import { observer } from 'mobx-react-lite';
import React from 'react';

import { usePageRenderer } from './hooks/usePageRenderer';
import { PagesController } from './stores/pages/PagesController';

import './App.css';

import './styles/index.scss';
import GamePage from './pages/gamePage';

const App = observer(() => {
  const [pages] = React.useState(() => new PagesController());
  const renderPage = usePageRenderer();

  return <div className="App">{<GamePage />}</div>
  // return <div className="App">{renderPage(pages.currentPage)}</div>;
});

export default App;
