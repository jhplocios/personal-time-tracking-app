import React from 'react';
import styled from 'styled-components';
import PieChart from '../components/PieChartComponent';
import { IActivityData } from '../types';
import Chip from '@material-ui/core/Chip';

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

  const reducedTagList = activityList.reduce((acc: any, cur) => {
    if (!acc[cur.tag]) {
      acc[cur.tag] = cur.duration;
      return acc;
    } else {
      acc[cur.tag] += cur.duration;
      return acc;
    }
  }, {})

  console.log(reducedTagList)
  return (
    <ContentContainer>
      <TagContainer>
        {Object.keys(reducedTagList).map(tag => (
          <ChipContainer>
            <Chip 
              label={`#${tag}`} 
              color={selectedTag === tag ? 'primary' : 'default'} 
              onClick={() => setSelectedTag(tag)}
            />     
          </ChipContainer>
        ))}
      </TagContainer>
      <PieChart title='Activity Tracker' data={activityList.filter(activity => activity.tag === selectedTag)} />
    </ContentContainer>  
  )
}

export default ChartsView;