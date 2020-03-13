import React from 'react';
import Toolbar from '../components/ToolbarComponent';
import ContentList from '../components/ContentList/ContentListComponent';
import { IActivityData } from '../types';
import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ChartsView from './ChartsView';
import API from '../utils/api';

const ContentContainer = styled.div`
  padding: 20px;
  box-sizing: border-box;
`;

const MainView: React.FC = () => {
  const [activityList, setActivityList] = React.useState<Partial<IActivityData>[] | undefined>(undefined)
  const [value, setValue] = React.useState(0);
  const [renderView, setRenderView] = React.useState('list');

  React.useEffect(() => {
    API.get('activity/list')
      .then(res => {
        setActivityList(res.data || [])
      })
  }, [])

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleSetList = (input: Partial<IActivityData>) => {
      setActivityList(prevState => {
        if (prevState) {
          return [...prevState, input];
        }
        return [input];
      })
  }

  const deleteFromList = (ids: string[]) => {
    setActivityList(prevState => {
      if (prevState) {
        let newList: Partial<IActivityData>[] = prevState;
        ids.forEach(id => {
          const deleteIndex = newList.findIndex(state => state._id === id);
          newList = [
            ...newList.slice(0, deleteIndex),
            ...newList.slice(deleteIndex + 1)
          ]
        })
        return newList;
      }
      return prevState;
    })
  }

  return (
    <React.Fragment>
      <Toolbar setList={handleSetList}/>
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
          <ContentList activityList={activityList || []} setList={deleteFromList} />
        </ContentContainer>
      )}
      {renderView === 'charts' && <ChartsView activityList={activityList || []}/>}     
    </React.Fragment>
  )
};

export default MainView;