import { observer } from 'mobx-react-lite';
import React from 'react';

import { usePageRenderer } from './hooks/usePageRenderer';
import { PagesController } from './stores/pages/PagesController';
import { PageType } from './types/pages';

import './App.css';

import './styles/index.scss';

export let page: PageType = PageType.connectionClientLobby;

const App = observer(() => {
  const [pages] = React.useState(() => new PagesController());
  const renderPage = usePageRenderer();

  return <div className="App">{renderPage(pages.currentPage)}</div>;
});

export default App;
