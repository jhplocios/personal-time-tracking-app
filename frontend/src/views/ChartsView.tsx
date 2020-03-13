import React from 'react';
import styled from 'styled-components';
import PieChart from '../components/PieChartComponent';
import { IActivityData } from '../types';
import Chip from '@material-ui/core/Chip';
import NoDataView from './NoDataView';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  justify-content: center;
`;

const TagContainer = styled.div`
  display: flex;
  padding: 20px 100px;
`

const ChipContainer = styled.div`
  display: flex;
  padding: 5px 10px;
`

interface IChartsView {
  activityList: IActivityData[];
}

const ChartsView: React.FC<IChartsView> = ({ activityList }) => {
  const [selectedTag, setSelectedTag] = React.useState('');

  React.useEffect(() => {
    if (activityList.length > 0) {
      setSelectedTag(activityList[0].tag);
    }
  }, [activityList])

  const reducedTagObject = activityList.reduce((acc: any, cur) => {
    if (!acc[cur.tag]) {
      acc[cur.tag] = [{
        id: cur.id,
        duration: cur.duration,
        tag: cur.tag,
        activityName: cur.activityName,
        date: cur.date
      }];
      return acc;
    } else {
      const sameActivityIndex = acc[cur.tag].findIndex((a: IActivityData) => a.activityName === cur.activityName);
      if (sameActivityIndex > -1) {
        acc[cur.tag][sameActivityIndex].duration += cur.duration;
      } else {
        acc[cur.tag] = [
          ...acc[cur.tag],
          {
            id: cur.id,
            duration: cur.duration,
            tag: cur.tag,
            activityName: cur.activityName,
            date: cur.date
          }
        ]
      }
      return acc;
    }
  }, {})

  return (
    <ContentContainer>
      {activityList.length > 0 
      ? (
        <React.Fragment>
          <TagContainer>
            {Object.keys(reducedTagObject).map(tag => (
              <ChipContainer key={tag}>
                <Chip 
                  label={`#${tag}`} 
                  color={selectedTag === tag ? 'primary' : 'default'} 
                  onClick={() => setSelectedTag(tag)}
                />     
              </ChipContainer>
            ))}
          </TagContainer>
          <PieChart 
            title='Activity Tracker' 
            data={reducedTagObject[selectedTag] || []} 
          />
        </React.Fragment>
      )
    : (<NoDataView />)}
    </ContentContainer>  
  )
}

export default ChartsView;