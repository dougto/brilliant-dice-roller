import styled from "styled-components/native";
import colors from "../../constants/Colors";

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ResultText = styled.Text`
  font-size: 80px;
  color: ${colors.grey};
`;

export const ExpressionContainer = styled.View`
  margin-top: 48px;
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
`;

export const ButtonText = styled.Text`
  font-size: 24px;
  color: ${colors.white};
`;
