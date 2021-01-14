import styled from "styled-components/native";
import colors from "../../constants/Colors";

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ResultsSumText = styled.Text`
  font-size: 80px;
  color: ${colors.grey};
`;

export const ResultsContainer = styled.View`
  margin-top: 48px;
  border: 2px solid ${colors.grey};
  border-radius: 20px;
  height: 48px;
  width: 80%;
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

export const ClearButton = styled.TouchableOpacity`
  border: 2px solid ${colors.grey};
  border-radius: 20px;
  height: 48px;
  width: 60%;
  align-items: center;
  justify-content: center;
  margin-top: 48px;
`;

export const ClearText = styled.Text`
  font-size: 30px;
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
