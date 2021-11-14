import styled from 'styled-components/native';
import colors from '../../constants/Colors';

interface IMediaSize {
  small: boolean;
}

interface Dice100TextProps {
  isSmallDevice: boolean;
}

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ResultsSumText = styled.Text<IMediaSize>`
  font-size: ${(props) => (props.small ? 60 : 80)}px;
  color: ${colors.grey};
`;

export const ResultsContainer = styled.View<IMediaSize>`
  margin-top: ${(props) => (props.small ? 32 : 48)}px;
  border: 2px solid ${colors.grey};
  border-radius: 20px;
  height: 48px;
  min-width: 80%;
  padding: 0 4px 0 4px;
  align-items: center;
  justify-content: center;
`;

export const ResultsText = styled.Text`
  font-size: 30px;
  color: ${colors.grey};
`;

export const DicesContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 24px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin: 16px;
`;

export const DiceContainer = styled.TouchableOpacity`
  position: relative;
`;

export const DiceContainerWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ClearButton = styled.TouchableOpacity<IMediaSize>`
  border: 2px solid ${colors.grey};
  border-radius: 20px;
  height: ${(props) => (props.small ? 36 : 48)}px;
  width: 60%;
  align-items: center;
  justify-content: center;
  margin-top: ${(props) => (props.small ? 24 : 48)}px;
`;

export const ClearText = styled.Text<IMediaSize>`
  font-size: ${(props) => (props.small ? 20 : 30)}px;
  color: ${colors.grey};
`;

export const DiceCounterContainer = styled.View`
  position: absolute;
  background-color: ${colors.blue};
  border-radius: 14px;
  height: 28px;
  width: 28px;
  bottom: -8px;
  right: -8px;
`;

export const DiceCounterText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.white};
  margin: auto;
`;

export const Dice100View = styled.View`
  background-color: ${colors.grey};
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin: 12px 12px 12px 12px;
`;

export const Dice100Text = styled.Text<Dice100TextProps>`
  font-size: ${({ isSmallDevice }) => (isSmallDevice ? 18 : 25)}px;
  color: ${colors.white};
  font-weight: bold;
`;
