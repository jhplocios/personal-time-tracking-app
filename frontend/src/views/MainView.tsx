import React from 'react';
import { useLocation, useHistory } from "react-router-dom";
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
  let history = useHistory();

  React.useEffect(() => {
    const jwtoken = localStorage.getItem('token')
    const config = {
      headers: { Authorization: `Bearer ${jwtoken}` }
    }; 
    API.get('activity/list', config)
      .then(res => {
        if (res.status === 200) {
          setActivityList(res.data || []);
        }
      })
      .catch(err => {
        history.push('/login');
        console.log(err)
      })
  }, [location, history])

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