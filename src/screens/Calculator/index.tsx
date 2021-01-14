import React, { useState, useCallback } from 'react';

import { EvalDiceExpression } from "../../helpers/Math";

import {
  Container,
  ResultText,
  ExpressionContainer,
  ExpressionText,
  ButtonsContainer,
  Row,
  Button,
  ButtonText,
} from "./styles";

const ExpressionMaxSize = 25;

const Calculator: React.FC = () => {
  const [result, setResult] = useState("0");
  const [expression, setExpression] = useState("");
  const [expressionsError, setExpressionError] = useState(false);

  const updateExpressions = useCallback((newCharacter: string) => {
    if (expression.length < ExpressionMaxSize) {
      setExpression(expression + newCharacter);
    }
  }, [expression]);

  const clearExpression = useCallback(() => {
    setExpression("");
    setResult("0");
    setExpressionError(false);
  }, []);

  const evaluateExpression = useCallback(() => {
    let expressionResult = 0;

    try {
      expressionResult = EvalDiceExpression(expression);
    } catch (error) {
      setResult("Syntax Error");
      setExpressionError(true);
      return;
    }
    setExpressionError(false);
    setResult(`${expressionResult}`);
  }, [expression]);

  return (
    <Container>
      <ResultText error={expressionsError}>{result}</ResultText>
      <ExpressionContainer error={expressionsError}>
        <ExpressionText>{expression}</ExpressionText>
      </ExpressionContainer>
      <ButtonsContainer>
        <Row>
          <Button onPress={() => {updateExpressions("1")}}>
            <ButtonText>1</ButtonText>
          </Button>
          <Button onPress={() => {updateExpressions("2")}}>
            <ButtonText>2</ButtonText>
          </Button>
          <Button onPress={() => {updateExpressions("3")}}>
            <ButtonText>3</ButtonText>
          </Button>
          <Button onPress={() => {updateExpressions("-")}}>
            <ButtonText>-</ButtonText>
          </Button>
        </Row>
        <Row>
          <Button onPress={() => {updateExpressions("4")}}>
            <ButtonText>4</ButtonText>
          </Button>
          <Button onPress={() => {updateExpressions("5")}}>
            <ButtonText>5</ButtonText>
          </Button>
          <Button onPress={() => {updateExpressions("6")}}>
            <ButtonText>6</ButtonText>
          </Button>
          <Button onPress={() => {updateExpressions("+")}}>
            <ButtonText>+</ButtonText>
          </Button>
        </Row>
        <Row>
          <Button onPress={() => {updateExpressions("7")}}>
            <ButtonText>7</ButtonText>
          </Button>
          <Button onPress={() => {updateExpressions("8")}}>
            <ButtonText>8</ButtonText>
          </Button>
          <Button onPress={() => {updateExpressions("9")}}>
            <ButtonText>9</ButtonText>
          </Button>
          <Button onPress={() => {updateExpressions("d")}}>
            <ButtonText>d</ButtonText>
          </Button>
        </Row>
        <Row>
          <Button onPress={() => {clearExpression()}}>
            <ButtonText>clear</ButtonText>
          </Button>
          <Button onPress={() => {updateExpressions("0")}}>
            <ButtonText>0</ButtonText>
          </Button>
          <Button onPress={() => {evaluateExpression()}}>
            <ButtonText>=</ButtonText>
          </Button>
        </Row>
      </ButtonsContainer>
    </Container>
  );
}

export default Calculator;
