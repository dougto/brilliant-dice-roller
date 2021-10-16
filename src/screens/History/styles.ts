import styled from 'styled-components/native';
import colors from "../../constants/Colors";

export const PageContainer = styled.View`
  display: flex;
  flex: 1;
  padding-top: 40px;
  align-items: center;
`;

export const PageTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.grey};
  margin: 20px;
`;

export const LineDivider = styled.View`
  border: 1px solid ${colors.lightGrey};
  border-radius: 2px;
  height: 1px;
  width: 95%;
`;

export const HistoryItemTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.grey};
`;

export const HistoryItemDate = styled.Text`
  font-size: 16px;
  color: ${colors.grey};
`;

export const HistoryItemExpression = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.grey};
`;

export const HistoryItemResult = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.grey};
`;

export const HistoryItemContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const HistoryItemContentContainer = styled.View`
  width: 100%;
  height: 80px;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px;
`;

export const HistoryItemLeftContainer = styled.View`
  align-items: flex-start;
  justify-content: space-between;
  height: 100%;
`;

export const HistoryItemRightContainer = styled.View`
  align-items: flex-end;
  justify-content: space-between;
  height: 100%;
`;
