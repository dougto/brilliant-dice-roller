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
  isMax: boolean;
  isMin: boolean;
}

interface IButtonContainerProps {
  small: boolean;
}

interface IRowProps {
  small: boolean;
}

interface IEvaluateButtonProps {
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
  color: ${({ isMax, isMin }) => (isMax ? colors.green : isMin ? colors.red : colors.grey)};
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

export const ButtonsContainer = styled.View<IButtonContainerProps>`
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: ${(props) => (props.small ? 12 : 24)}px;
`;

export const Row = styled.View<IRowProps>`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  min-height: 40px;
  margin: ${(props) => (props.small ? 8 : 16)}px;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${colors.grey};
  border-radius: 4px;
  padding: 4px 16px 4px 16px;
  min-width: 44px;
  height: 36px;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
`;

export const BackButton = styled.TouchableOpacity`
  background-color: ${colors.orange};
  border-radius: 4px;
  padding: 4px 16px 4px 16px;
  min-width: 44px;
  height: 36px;
  justify-content: center;
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

export const EvaluateButton = styled.TouchableOpacity<IEvaluateButtonProps>`
  align-items: center;
  justify-content: center;
  height: ${(props) => (props.small ? 48 : 60)}px;
  width: ${(props) => (props.small ? 48 : 60)}px;
  border-radius: ${(props) => (props.small ? 24 : 30)}px;
  background-color: ${colors.blue};
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
`;

export const ClearButton = styled.TouchableOpacity<IMediaSize>`
  border: 2px solid ${colors.grey};
  border-radius: 20px;
  height: ${(props) => (props.small ? 36 : 48)}px;
  width: 60%;
  align-items: center;
  justify-content: center;
  margin-top: ${(props) => (props.small ? 0 : 48)}px;
`;

export const ClearText = styled.Text<IMediaSize>`
  font-size: ${(props) => (props.small ? 20 : 30)}px;
  color: ${colors.grey};
`;
