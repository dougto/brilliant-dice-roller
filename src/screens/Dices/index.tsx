import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMediaQuery } from 'react-responsive';
import { ScrollView } from 'react-native';

import { useHistory } from '../../hooks/History';
import { Roll } from '../../helpers/Math';
import colors from '../../constants/Colors';

import {
  Container,
  ResultsText,
  ResultsSumText,
  ResultsContainer,
  DicesContainer,
  Row,
  DiceContainer,
  DiceContainerWrapper,
  ClearButton,
  ClearText,
  DiceCounterContainer,
  DiceCounterText,
  Dice100View,
  Dice100Text,
} from './styles';

type DiceNumbers = 2 | 4 | 6 | 8 | 10 | 12 | 20 | 100;

type Dice = 'd2' | 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100';

interface IDiceCounter {
  d2: number;
  d4: number;
  d6: number;
  d8: number;
  d10: number;
  d12: number;
  d20: number;
  d100: number;
}

const Dices: React.FC = () => {
  const { addHistoryItem } = useHistory();

  const [resultsSum, setResultsSum] = useState(0);
  const [lastResults, setLastResults] = useState<number[]>([]);
  const [diceCounter, setDiceCounter] = useState<IDiceCounter>({
    d2: 0, d4: 0, d6: 0, d8: 0, d10: 0, d12: 0, d20: 0, d100: 0,
  });

  const rollDice = (dice: DiceNumbers) => {
    const currentDice = `d${dice}` as Dice;
    diceCounter[currentDice] = diceCounter[currentDice] + 1;

    const rollResult = Roll(1, dice);
    const newSum = resultsSum + rollResult;
    setResultsSum(newSum);
    setLastResults([...lastResults, rollResult]);
    setDiceCounter({ ...diceCounter });

    addHistoryItem({
      expression: `1d${dice}`,
      name: 'Dices Screen',
      result: `${rollResult}`,
    });
  };

  const clearResults = () => {
    setResultsSum(0);
    setLastResults([]);
    setDiceCounter({
      d2: 0, d4: 0, d6: 0, d8: 0, d10: 0, d12: 0, d20: 0, d100: 0,
    });
  };

  const renderLastResults = (): string => (lastResults.length > 4
    ? `... + ${lastResults.slice(lastResults.length - 4, lastResults.length).join().replace(/,/g, ' + ')}`
    : lastResults.join().replace(/,/g, ' + ') || '0');

  const renderDiceCounter = (counter: Dice) => {
    const count = diceCounter[counter];

    if (count > 0) {
      return (
        <DiceCounterContainer>
          <DiceCounterText>{count}</DiceCounterText>
        </DiceCounterContainer>
      );
    }

    return null;
  };

  const isSmallDevice = useMediaQuery({
    maxDeviceHeight: 700,
  });

  const iconSize = isSmallDevice ? 50 : 72;

  return (
    <Container>
      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}
        bounces={false}
      >
        <ResultsSumText small={isSmallDevice}>{resultsSum}</ResultsSumText>
        <ResultsContainer small={isSmallDevice}>
          <ResultsText>{renderLastResults()}</ResultsText>
        </ResultsContainer>
        <DicesContainer>
          <Row>
            <DiceContainerWrapper>
              <DiceContainer onPress={() => { rollDice(2); }}>
                <MaterialCommunityIcons size={iconSize} name="numeric-2-circle" color={colors.grey} />
                {renderDiceCounter('d2')}
              </DiceContainer>
            </DiceContainerWrapper>
            <DiceContainerWrapper>
              <DiceContainer onPress={() => { rollDice(4); }}>
                <MaterialCommunityIcons size={iconSize} name="dice-d4" color={colors.grey} />
                {renderDiceCounter('d4')}
              </DiceContainer>
            </DiceContainerWrapper>
          </Row>
          <Row>
            <DiceContainerWrapper>
              <DiceContainer onPress={() => { rollDice(6); }}>
                <MaterialCommunityIcons size={iconSize} name="dice-d6" color={colors.grey} />
                {renderDiceCounter('d6')}
              </DiceContainer>
            </DiceContainerWrapper>
            <DiceContainerWrapper>
              <DiceContainer onPress={() => { rollDice(8); }}>
                <MaterialCommunityIcons size={iconSize} name="dice-d8" color={colors.grey} />
                {renderDiceCounter('d8')}
              </DiceContainer>
            </DiceContainerWrapper>
            <DiceContainerWrapper>
              <DiceContainer onPress={() => { rollDice(10); }}>
                <MaterialCommunityIcons size={iconSize} name="dice-d10" color={colors.grey} />
                {renderDiceCounter('d10')}
              </DiceContainer>
            </DiceContainerWrapper>
          </Row>
          <Row>
            <DiceContainerWrapper>
              <DiceContainer onPress={() => { rollDice(12); }}>
                <MaterialCommunityIcons size={iconSize} name="dice-d12" color={colors.grey} />
                {renderDiceCounter('d12')}
              </DiceContainer>
            </DiceContainerWrapper>
            <DiceContainerWrapper>
              <DiceContainer onPress={() => { rollDice(20); }}>
                <MaterialCommunityIcons size={iconSize} name="dice-d20" color={colors.grey} />
                {renderDiceCounter('d20')}
              </DiceContainer>
            </DiceContainerWrapper>
            <DiceContainerWrapper>
              <DiceContainer onPress={() => { rollDice(100); }}>
                <Dice100View style={{
                  width: iconSize * 0.7,
                  height: iconSize * 0.7,
                  transform: [{ rotate: '45deg' }],
                }}
                >
                  <Dice100Text
                    isSmallDevice={isSmallDevice}
                    style={{
                      transform: [{ rotate: '-45deg' }],
                    }}
                  >
                    100
                  </Dice100Text>
                </Dice100View>
                {renderDiceCounter('d100')}
              </DiceContainer>
            </DiceContainerWrapper>
          </Row>
          <ClearButton small={isSmallDevice} onPress={() => { clearResults(); }}>
            <ClearText small={isSmallDevice}>Clear</ClearText>
          </ClearButton>
        </DicesContainer>
      </ScrollView>
    </Container>
  );
};

export default Dices;
