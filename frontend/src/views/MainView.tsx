import React from 'react';
import { useLocation } from "react-router-dom";
import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import Toolbar from '../components/ToolbarComponent';
import ContentList from '../components/ContentList/ContentListComponent';
import ChartsView from './ChartsView';
import API from '../utils/api';
import { IActivityData } from '../types';

const ContentContainer = styled.div`
  padding: 20px;
  box-sizing: border-box;
`;

const MainView: React.FC = () => {
  const [activityList, setActivityList] = React.useState<Partial<IActivityData>[] | undefined>(undefined)
  const [value, setValue] = React.useState(0);
  const [renderView, setRenderView] = React.useState('list');
  let location = useLocation();

  React.useEffect(() => {
    API.get('activity/list')
      .then(res => {
        setActivityList(res.data || [])
      })
  }, [location])

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Toolbar />
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="icon tabs example"
      > 
        <Tab icon={<FormatListNumberedIcon />} aria-label="activity-list" onClick={() => setRenderView('list')} />
        <Tab icon={<EqualizerIcon />} aria-label="charts" onClick={() => setRenderView('charts')} />
      </Tabs>
      {renderView === 'list' && (
        <ContentContainer>
          <ContentList activityList={activityList || []} />
        </ContentContainer>
      )}
      {renderView === 'charts' && <ChartsView activityList={activityList || []}/>}     
    </React.Fragment>
  )
};

export default MainView;