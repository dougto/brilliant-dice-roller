import styled from "styled-components/native";
import colors from "../../constants/Colors";

interface IExpressionContainerProps {
  error: boolean;
  small: boolean;
}

interface IResultTextProps {
  error: boolean;
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
  font-size: ${(props) => (props.error || props.small ? 50 : 80)}px;
  margin-bottom: ${(props) => (props.error ? 30 : 0)}px;
  color: ${(props) => (props.error ? colors.red : colors.grey)};
`;

export const ExpressionContainer = styled.View<IExpressionContainerProps>`
  margin-top: ${(props) => (props.small ? 32 : 48)}px;
  border: 2px solid ${(props) => (props.error ? colors.red : colors.grey)};
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

export const Button = styled.TouchableOpacity`
  background-color: ${colors.grey};
  border-radius: 4px;
  padding: 4px 16px 4px 16px;
  min-width: 44px;
`;

export const ButtonText = styled.Text`
  font-size: 24px;
  color: ${colors.white};
`;
