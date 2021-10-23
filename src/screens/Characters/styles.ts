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
`;

export const ModalText = styled.Text`
  font-size: 18px;
  color: ${colors.grey};
  z-index: 3;
`;

export const ModalRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ModalInput = styled.TextInput`
  width: 100%;
  margin: 30px 0 40px 0;
  border-bottom-width: 1px;
`;

export const ModalButton = styled.TouchableOpacity`
  background-color: ${colors.blue};
  border-radius: 8px;
  padding: 8px;
  max-width: 40%;
`;

export const ModalButtonText = styled.Text`
  color: ${colors.white};
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

export const DeleteButton = styled.TouchableOpacity`
  background-color: ${colors.red};
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
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin: 30px;
`;

export const RollContainer = styled.View`
  flex-direction: row;
  padding: 20px;
  align-items: center;
  justify-content: space-between;
`;

export const SmallDeleteButton = styled.TouchableOpacity`
  background-color: ${colors.red};
  height: 32px;
  width: 32px;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
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
  border-radius: 8px;
  padding: 8px;
`;

export const RollButtonText = styled.Text`
  color: ${colors.white};
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

export const RollResult = styled.Text`
  font-size: 60px;
  color: ${colors.grey};
`;
