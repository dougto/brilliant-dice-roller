import * as React from 'react';

import {
  Container,
  ResultText,
  ExpressionContainer,
  ButtonsContainer,
  Row,
  Button,
  ButtonText,
} from "./styles";

const Calculator: React.FC = () => {
  return (
    <Container>
      <ResultText>0</ResultText>
      <ExpressionContainer/>
      <ButtonsContainer>
        <Row>
          <Button>
            <ButtonText>1</ButtonText>
          </Button>
          <Button>
            <ButtonText>2</ButtonText>
          </Button>
          <Button>
            <ButtonText>3</ButtonText>
          </Button>
          <Button>
            <ButtonText>-</ButtonText>
          </Button>
        </Row>
        <Row>
          <Button>
            <ButtonText>4</ButtonText>
          </Button>
          <Button>
            <ButtonText>5</ButtonText>
          </Button>
          <Button>
            <ButtonText>6</ButtonText>
          </Button>
          <Button>
            <ButtonText>+</ButtonText>
          </Button>
        </Row>
        <Row>
          <Button>
            <ButtonText>7</ButtonText>
          </Button>
          <Button>
            <ButtonText>8</ButtonText>
          </Button>
          <Button>
            <ButtonText>9</ButtonText>
          </Button>
          <Button>
            <ButtonText>d</ButtonText>
          </Button>
        </Row>
        <Row>
          <Button>
            <ButtonText>clear</ButtonText>
          </Button>
          <Button>
            <ButtonText>0</ButtonText>
          </Button>
          <Button>
            <ButtonText>=</ButtonText>
          </Button>
        </Row>
      </ButtonsContainer>
    </Container>
  );
}

export default Calculator;
