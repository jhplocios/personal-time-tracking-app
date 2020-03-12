import React from 'react';
import Toolbar from '../components/ToolbarComponent';
import ContentList from '../components/ContentList/ContentListComponent';

const MainView: React.FC = () => {

  return (
    <React.Fragment>
      <Toolbar />
      <ContentList />
    </React.Fragment>
  )
};

export default MainView;