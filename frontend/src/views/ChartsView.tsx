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
  activityList: Partial<IActivityData>[];
}

const ChartsView: React.FC<IChartsView> = ({ activityList }) => {
  const [selectedTag, setSelectedTag] = React.useState('');

  React.useEffect(() => {
    if (activityList.length > 0) {
      setSelectedTag(activityList[0].tag as string);
    }
  }, [activityList])

  const reducedTagObject = activityList.reduce((acc: any, cur) => {
    if (!acc[cur.tag as string]) {
      acc[cur.tag as string] = [{
        id: cur._id,
        duration: cur.duration,
        tag: cur.tag,
        name: cur.name,
        date: cur.date
      }];
      return acc;
    } else {
      const sameActivityIndex = acc[cur.tag as string].findIndex((a: IActivityData) => a.name === cur.name);
      if (sameActivityIndex > -1) {
        acc[cur.tag as string][sameActivityIndex].duration += cur.duration;
      } else {
        acc[cur.tag as string] = [
          ...acc[cur.tag as string],
          {
            id: cur._id,
            duration: cur.duration,
            tag: cur.tag,
            name: cur.name,
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
            title={`#${selectedTag}`} 
            data={reducedTagObject[selectedTag] || []} 
          />
        </React.Fragment>
      )
    : (<NoDataView />)}
    </ContentContainer>  
  )
}

export default ChartsView;