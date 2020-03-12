import React from 'react';
import Toolbar from '../components/ToolbarComponent';
import ContentList from '../components/ContentList/ContentListComponent';
import { IActivityData } from '../types';
import styled from 'styled-components';

const ContentContainer = styled.div`
  padding: 20px;
  box-sizing: border-box;
`;

const MainView: React.FC = () => {
  const [activityList, setActivityList] = React.useState<IActivityData[] | undefined>(undefined)

  const handleSetList = (input: IActivityData) => {
      setActivityList(prevState => {
        if (prevState) {
          return [...prevState, input];
        }
        return [input];
      })
  }

  const deleteFromList = (ids: number[]) => {
    setActivityList(prevState => {
      if (prevState) {
        let newList: IActivityData[] = prevState;
        ids.forEach(id => {
          const deleteIndex = newList.findIndex(state => state.id === id);
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
      <ContentContainer>
        <ContentList activityList={activityList || []} setList={deleteFromList} />
      </ContentContainer>
    </React.Fragment>
  )
};

export default MainView;