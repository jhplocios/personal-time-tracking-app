import React from 'react';
import Toolbar from '../components/ToolbarComponent';
import ContentList from '../components/ContentList/ContentListComponent';
import { IActivityInput } from '../types';
import styled from 'styled-components';

const ContentContainer = styled.div`
  padding: 20px;
  box-sizing: border-box;
`;

const MainView: React.FC = () => {
  const [activityList, setActivityList] = React.useState<IActivityInput[] | undefined>(undefined)

  const handleSetList = (input: IActivityInput) => {
      setActivityList(prevState => {
        if (prevState) {
          return [...prevState, input];
        }
        return [input];
      })
  }

  console.log(activityList)
  return (
    <React.Fragment>
      <Toolbar setList={handleSetList}/>
      <ContentContainer>
        <ContentList activityList={activityList || []} />
      </ContentContainer>
    </React.Fragment>
  )
};

export default MainView;