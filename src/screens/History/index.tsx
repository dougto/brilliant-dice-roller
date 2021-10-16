import React from 'react';
import { FlatList } from 'react-native';

import { useHistory, IHistoryItem } from '../../hooks/History';
import {
  PageContainer,
  PageTitle,
  LineDivider,
  HistoryItemContainer,
  HistoryItemContentContainer,
  HistoryItemDate,
  HistoryItemExpression,
  HistoryItemLeftContainer,
  HistoryItemResult,
  HistoryItemRightContainer,
  HistoryItemTitle,
} from './styles';

const History: React.FC = () => {
  const { history } = useHistory();

  const renderHistoryItem = (historyItem: IHistoryItem) => {
    const { name, date, expression, result } = historyItem;

    return (
      <HistoryItemContainer>
        <HistoryItemContentContainer>
          <HistoryItemLeftContainer>
            <HistoryItemTitle>{name}</HistoryItemTitle>
            <HistoryItemExpression>roll: {expression}</HistoryItemExpression>
          </HistoryItemLeftContainer>
          <HistoryItemRightContainer>
            <HistoryItemDate>{date}</HistoryItemDate>
            <HistoryItemResult>result: {result}</HistoryItemResult>
          </HistoryItemRightContainer>
        </HistoryItemContentContainer>
        <LineDivider/>
      </HistoryItemContainer>
    );
  };

  return (
    <PageContainer>
      <PageTitle>History</PageTitle>
      <LineDivider/>
      <FlatList
        bounces={false}
        style={{ width: '100%'}}
        data={history}
        renderItem={({ item }) => renderHistoryItem(item)}
        keyExtractor={(item, index) => `${item.date}-${index}`}
      />
    </PageContainer>
  );
}

export default History;
