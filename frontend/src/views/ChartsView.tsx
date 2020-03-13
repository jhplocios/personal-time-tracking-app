import React from 'react';
import styled from 'styled-components';
import Chip from '@material-ui/core/Chip';
import PieChart from '../components/PieChartComponent';
import NoDataView from './NoDataView';
import { IActivityData } from '../types';
import { fnActivityListByTag } from '../utils/helpers';

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

  const activityListByTag = fnActivityListByTag(activityList as IActivityData[]);

  return (
    <ContentContainer>
      {activityList.length > 0 ? (
        <React.Fragment>
          <TagContainer>
            {Object.keys(activityListByTag).map(tag => (
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
            data={activityListByTag[selectedTag] || []} 
          />
        </React.Fragment>
      ) : (<NoDataView />)}
    </ContentContainer>  
  )
}

export default ChartsView;