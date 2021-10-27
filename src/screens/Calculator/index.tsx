import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { ScrollView } from 'react-native';

import { EvalDiceExpression, isDiceExpressionValid } from '../../helpers/Math';
import { useHistory } from '../../hooks/History';
import {
  Container,
  ResultText,
  ExpressionContainer,
  ExpressionText,
  ButtonsContainer,
  Row,
  Button,
  ButtonText,
  EvaluateButton,
  ClearButton,
  ClearText,
  GridContainer,
} from './styles';

const ExpressionMaxSize = 25;

const Calculator: React.FC = () => {
  const { addHistoryItem } = useHistory();

  const [result, setResult] = useState('0');
  const [expression, setExpression] = useState('');
  const [expressionToShow, setExpressionToShow] = useState('');

  const updateExpressions = (newCharacter: string) => {
    if (expression.length < ExpressionMaxSize) {
      const newExpression = expression + newCharacter;
      setExpression(newExpression);
      setExpressionToShow(newExpression.replace(/\//g, '÷').replace(/\*/g, 'x'));
    }
  };

  const clearExpression = () => {
    setExpression('');
    setExpressionToShow('');
    setResult('0');
  };

  const evaluateExpression = () => {
    const expressionResult = EvalDiceExpression(expression);

    setResult(`${expressionResult}`);

    addHistoryItem({
      expression,
      name: 'Calculator',
      result: `${expressionResult}`,
    });
  };

  const isSmallDevice = useMediaQuery({
    maxDeviceHeight: 700,
  });

  return (
    <Container>
      <ScrollView style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
        <ResultText small={isSmallDevice}>{result}</ResultText>
        <ExpressionContainer small={isSmallDevice}>
          <ExpressionText>{expressionToShow}</ExpressionText>
        </ExpressionContainer>
        <ButtonsContainer small={isSmallDevice}>
          <Row small={isSmallDevice}>
            <Button onPress={() => { updateExpressions('1'); }}>
              <ButtonText>1</ButtonText>
            </Button>
            <Button onPress={() => { updateExpressions('2'); }}>
              <ButtonText>2</ButtonText>
            </Button>
            <Button onPress={() => { updateExpressions('3'); }}>
              <ButtonText>3</ButtonText>
            </Button>
            <Button onPress={() => { updateExpressions('-'); }} disabled={!isDiceExpressionValid(`${expression}-1`)}>
              <ButtonText>-</ButtonText>
            </Button>
          </Row>
          <Row small={isSmallDevice}>
            <Button onPress={() => { updateExpressions('4'); }}>
              <ButtonText>4</ButtonText>
            </Button>
            <Button onPress={() => { updateExpressions('5'); }}>
              <ButtonText>5</ButtonText>
            </Button>
            <Button onPress={() => { updateExpressions('6'); }}>
              <ButtonText>6</ButtonText>
            </Button>
            <Button onPress={() => { updateExpressions('+'); }} disabled={!isDiceExpressionValid(`${expression}+1`)}>
              <ButtonText>+</ButtonText>
            </Button>
          </Row>
          <Row small={isSmallDevice}>
            <Button onPress={() => { updateExpressions('7'); }}>
              <ButtonText>7</ButtonText>
            </Button>
            <Button onPress={() => { updateExpressions('8'); }}>
              <ButtonText>8</ButtonText>
            </Button>
            <Button onPress={() => { updateExpressions('9'); }}>
              <ButtonText>9</ButtonText>
            </Button>
            <Button onPress={() => { updateExpressions('d'); }} disabled={!isDiceExpressionValid(`${expression}d1`)}>
              <ButtonText>d</ButtonText>
            </Button>
          </Row>
          <Row small={isSmallDevice}>
            <GridContainer>
              <Button onPress={() => { updateExpressions('0'); }} disabled={!isDiceExpressionValid(`${expression}0`)}>
                <ButtonText>0</ButtonText>
              </Button>
            </GridContainer>
            <GridContainer>
              <Button onPress={() => { updateExpressions('*'); }} disabled={!isDiceExpressionValid(`${expression}*1`)}>
                <ButtonText>x</ButtonText>
              </Button>
            </GridContainer>
            <GridContainer>
              <Button onPress={() => { updateExpressions('/'); }} disabled={!isDiceExpressionValid(`${expression}/1`)}>
                <ButtonText>÷</ButtonText>
              </Button>
            </GridContainer>
            <GridContainer>
              <EvaluateButton small={isSmallDevice} onPress={() => { evaluateExpression(); }} disabled={!isDiceExpressionValid(expression)}>
                <ButtonText>=</ButtonText>
              </EvaluateButton>
            </GridContainer>
          </Row>
          <Row small={isSmallDevice}>
            <ClearButton small={isSmallDevice} onPress={() => { clearExpression(); }}>
              <ClearText small={isSmallDevice}>Clear</ClearText>
            </ClearButton>
          </Row>
        </ButtonsContainer>
      </ScrollView>
    </Container>
  );
};

export default Calculator;
