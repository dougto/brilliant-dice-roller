import styled from 'styled-components/native';
import colors from '../../constants/Colors';

export const Container = styled.View`
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  margin-top: 50px;
`;

export const PageTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.grey};
  margin: 20px;
`;

export const CharacterContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80px;
  width: 100%;
`;

export const TouchableContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px 30px 20px 30px;
`;

export const CharacterName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${colors.grey};
`;

export const CharacterContainerBottomLine = styled.View`
  border: 1px solid ${colors.lightGrey};
  border-radius: 2px;
  height: 1px;
  width: 95%;
`;

export const AddButton = styled.TouchableOpacity`
  position: absolute;
  width: 64px;
  height: 64px;
  border-radius: 32px;
  bottom: 16px;
  right: 16px;
  background-color: ${colors.blue};
  align-items: center;
  justify-content: center;
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
  align-items: center;
`;

export const ModalText = styled.Text`
  font-size: 18px;
  color: ${colors.grey};
  z-index: 3;
`;

export const ModalRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const ModalInput = styled.TextInput`
  width: 100%;
  margin: 30px 0 40px 0;
  border-bottom-width: 1px;
  font-size: 18px;
`;

export const ModalButton = styled.TouchableOpacity`
  background-color: ${colors.blue};
  border-radius: 8px;
  padding: 8px;
  height: 40px;
  width: 60%;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

export const ModalButtonText = styled.Text`
  color: ${colors.white};
  font-size: 18px;
`;

export const NoCharactersText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${colors.grey};
  margin: 80px;
`;

export const CharacterScreenContainer = styled.View`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  margin-top: 50px;
`;

export const CharacterHeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: 30px;
`;

export const EditButton = styled.TouchableOpacity`
  height: 48px;
  width: 48px;
  border-radius: 24px;
  align-items: center;
  justify-content: center;
`;

export const AddRollText = styled.Text`
  color: ${colors.white};
  font-size: 24px;
`;

export const AddRollButton = styled.TouchableOpacity`
  position: absolute;
  height: 64px;
  border-radius: 32px;
  bottom: 16px;
  right: 16px;
  background-color: ${colors.blue};
  align-items: center;
  justify-content: center;
  padding: 0 16px 0 16px;
`;

export const ModalDoubleButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const RollContainer = styled.View`
  flex-direction: row;
  padding: 20px;
  align-items: center;
  justify-content: space-between;
`;

export const RollContentContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  margin: 20px;
`;

export const RollContentColumn = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

export const RollName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${colors.grey};
  margin-bottom: 8px;
`;

export const RollExpression = styled.Text`
  font-size: 16px;
  color: ${colors.grey};
`;

export const RollButton = styled.TouchableOpacity`
  background-color: ${colors.blue};
  border-radius: 20px;
  height: 40px;
  width: 80px;
  align-items: center;
  justify-content: center;
`;

export const RollButtonText = styled.Text`
  color: ${colors.white};
  font-size: 18px;
`;

export const RollBottomLine = styled.View`
  border: 1px solid ${colors.lightGrey};
  border-radius: 2px;
  height: 1px;
  width: 85%;
`;

export const RollOutsideContainer = styled.View`
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

export const RollResultText = styled.Text`
  font-size: 30px;
  color: ${colors.grey};
  margin-bottom: 10px;
`;

export const RollResultContainer = styled.View`
  align-items: center;
  justify-content: flex-end;
  height: 80px;
`;

export const ModalCloseButtonContainer = styled.View`
  width: 100%;
  align-items: flex-end;
`;

export const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const ModalYesButton = styled.TouchableOpacity`
  height: 40px;
  background-color: ${colors.blue};
  padding: 10px;
  border-radius: 20px;
  min-width: 60px;
  align-items: center;
  justify-content: center;
`;

export const ModalNoButton = styled.TouchableOpacity`
  height: 40px;
  background-color: ${colors.red};
  padding: 10px;
  border-radius: 20px;
  min-width: 60px;
  align-items: center;
  justify-content: center;
`;

export const RedText = styled.Text`
  font-size: 18px;
  color: ${colors.red};
  margin-top: 10px;
`;

export const EditBoxContainer = styled.View`
  width: 100%;
  align-items: flex-start;
`;

export const EditBoxText = styled.Text`
  font-size: 22px;
  color: ${colors.grey};
  margin-bottom: 10px;
`;

export const MarginView = styled.View`
  height: 30px;
`;
