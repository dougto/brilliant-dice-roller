import styled from 'styled-components/native';
import colors from '../../constants/Colors';

export const PageContainer = styled.View`
  display: flex;
  flex: 1;
  padding-top: 40px;
  align-items: center;
  position: relative;
`;

export const PageTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.grey};
  margin: 20px;
`;

export const PageMessage = styled.Text`
  font-size: 24px;
  color: ${colors.grey};
  margin-top: 40px;
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

export const HistoryItemText = styled.Text`
  font-size: 18px;
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

export const ClearButton = styled.TouchableOpacity`
  position: absolute;
  width: 64px;
  height: 64px;
  border-radius: 32px;
  bottom: 16px;
  right: 16px;
  background-color: ${colors.red};
  align-items: center;
  justify-content: center;
`;

export const Footer = styled.View`
  width: 100%;
  height: 80px;
`;

export const Backdrop = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.View`
  background-color: ${colors.white};
  z-index: 2;
  width: 80%;
  padding: 20px;
  border-radius: 4px;
`;

export const CloseButtonContainer = styled.View`
  width: 100%;
  align-items: flex-end;
`;

export const ModalTextContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const ModalText = styled.Text`
  font-size: 20px;
  color: ${colors.grey};
`;

export const ModalButtonsContainer = styled.View`
  margin-top: 20px;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-around;
`;

export const ModalYesButton = styled.TouchableOpacity`
  height: 40px;
  background-color: ${colors.blue};
  padding: 0 10px 0 10px;
  border-radius: 20px;
  width: 60px;
  align-items: center;
  justify-content: center;
`;

export const ModalNoButton = styled.TouchableOpacity`
  height: 40px;
  background-color: ${colors.red};
  padding: 0 10px 0 10px;
  border-radius: 20px;
  width: 60px;
  align-items: center;
  justify-content: center;
`;

export const ModalButtonText = styled.Text`
  color: ${colors.white};
  font-size: 20px;
  font-weight: bold;
`;
