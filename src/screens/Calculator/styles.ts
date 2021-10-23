import styled from 'styled-components/native';
import colors from '../../constants/Colors';

interface IMediaSize {
  small: boolean;
}

interface IExpressionContainerProps {
  small: boolean;
}

interface IResultTextProps {
  small: boolean;
}

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ResultText = styled.Text<IResultTextProps>`
  font-size: ${(props) => (props.small ? 50 : 80)}px;
  color: ${colors.grey};
`;

export const ExpressionContainer = styled.View<IExpressionContainerProps>`
  margin-top: ${(props) => (props.small ? 32 : 48)}px;
  border: 2px solid ${colors.grey};
  border-radius: 20px;
  height: 48px;
  width: 80%;
  align-items: center;
  justify-content: center;
`;

export const ExpressionText = styled.Text`
  font-size: 20px;
  color: ${colors.grey};
`;

export const ButtonsContainer = styled.View`
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 24px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  min-height: 40px;
  margin: 16px;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${colors.grey};
  border-radius: 4px;
  padding: 4px 16px 4px 16px;
  min-width: 44px;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

export const GridContainer = styled.View`
  flex: 0.25;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-size: 24px;
  color: ${colors.white};
`;

export const EvaluateButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 60px;
  border-radius: 30px;
  background-color: ${colors.blue};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
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
