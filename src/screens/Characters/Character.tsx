import React, { useState, useCallback } from 'react';
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { EvalDiceExpression } from '../../helpers/Math';
import colors from "../../constants/Colors";
import { ICharacterRoll, ICharacter } from '.';
import {
  CharacterScreenContainer,
  CharacterName,
  CharacterHeaderContainer,
  DeleteButton,
  CharacterContainerBottomLine,
  AddRollButton,
  NoCharactersText,
  AddRollText,
  Backdrop,
  ModalContainer,
  ModalText,
  ModalRow,
  ModalButton,
  ModalButtonText,
  ModalDoubleButtonsContainer,
  ModalInput,
  RollContentContainer,
  RollContentColumn,
  RollContainer,
  RollButton,
  RollButtonText,
  RollExpression,
  RollName,
  SmallDeleteButton,
  RollBottomLine,
  RollOutsideContainer,
  RollResult,
} from './styles';

interface IRouteParams {
  character: ICharacter;
}

const Character: React.FC = () => {
  const route = useRoute();
  const { character } = route.params as IRouteParams;

  const [currentCharacter, setCurrentCharacter] = useState(character);
  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);
  const [isAddRollModalOpen, setIsAddRollModalOpen] = useState(false);
  const [newRoll, setNewRoll] = useState<ICharacterRoll>({ name: '', expression: ''});
  const [rollResult, setRollResult] = useState(0);

  const navigation = useNavigation();

  const handleAddRoll = useCallback(async () => {
    try {
      EvalDiceExpression(newRoll.expression);
    } catch(error) {
      Alert.alert('Invalid expression');
      return;
    }

    const rollExists = currentCharacter.rolls.some(roll => roll.name === newRoll.name);
    if (rollExists) {
      Alert.alert('Roll already exists');
      return;
    }

    const updatedCharacter: ICharacter = { ...currentCharacter, rolls: [...currentCharacter.rolls, newRoll]};

    const characters = JSON.parse(await AsyncStorage.getItem('@bdr:characters') as string) as ICharacter[];
    const newCharactersSet = characters.map(char => {
      if (char.name === updatedCharacter.name) {
        return updatedCharacter;
      }
      return char;
    });

    await AsyncStorage.setItem('@bdr:characters', JSON.stringify(newCharactersSet) || '');

    setCurrentCharacter(updatedCharacter);
    setIsAddRollModalOpen(false);
  }, [newRoll, currentCharacter]);

  const handleCharacterDeletion = useCallback(async () => {
    const characters = JSON.parse(await AsyncStorage.getItem('@bdr:characters') as string) as ICharacter[];
    const newCharactersSet = characters.filter(char => char.name != currentCharacter.name);

    await AsyncStorage.setItem('@bdr:characters', JSON.stringify(newCharactersSet) || '');

    navigation.navigate('Characters');
  }, [currentCharacter]);

  const handleRoll = useCallback((expression: string) => {
    const result = EvalDiceExpression(expression);

    setRollResult(result);
  }, [setRollResult]);

  const handleRollDeletion = useCallback(async (rollName: string) => {
    const updatedRolls: ICharacterRoll[] = currentCharacter.rolls.filter(roll => roll.name != rollName);
    const updatedCharacter: ICharacter = { ...currentCharacter, rolls: [...updatedRolls]};

    const characters = JSON.parse(await AsyncStorage.getItem('@bdr:characters') as string) as ICharacter[];
    const newCharactersSet = characters.map(char => {
      if (char.name === updatedCharacter.name) {
        return updatedCharacter;
      }
      return char;
    });

    await AsyncStorage.setItem('@bdr:characters', JSON.stringify(newCharactersSet) || '');

    setCurrentCharacter(updatedCharacter);
  }, [currentCharacter, setCurrentCharacter]);

  const renderRolls = useCallback(() => {
    if (currentCharacter.rolls.length > 0) {
      return (
        <>
          <ScrollView style={{ width: '100%' }}>
            {currentCharacter.rolls.map(roll => (
              <RollOutsideContainer key={roll.name}>
                <RollContainer>
                  <SmallDeleteButton onPress={() => { handleRollDeletion(roll.name) }}>
                    <MaterialCommunityIcons size={20} name="trash-can-outline" color={colors.white} />
                  </SmallDeleteButton>
                  <RollContentContainer>
                    <RollContentColumn>
                      <RollName>{roll.name}</RollName>
                      <RollExpression>{roll.expression}</RollExpression>
                    </RollContentColumn>
                    <RollButton>
                      <RollButtonText onPress={() => { handleRoll(roll.expression) }}>Roll</RollButtonText>
                    </RollButton>
                  </RollContentContainer>
                </RollContainer>
                <RollBottomLine/>
              </RollOutsideContainer>
            ))}
          </ScrollView>
          <View style={{ marginBottom: 40 }}/>
        </>
      );
    }

    return (<NoCharactersText>No rolls yet :(</NoCharactersText>)
  }, [currentCharacter, setCurrentCharacter, handleRoll]);

  const renderAddRollModal = useCallback(() => (
    <Backdrop>
      <ModalContainer>
        <ModalRow>
          <ModalText>Insert new roll name:</ModalText>
          <TouchableOpacity
            onPress={() => {
              setNewRoll({ name: '', expression: ''});
              setIsAddRollModalOpen(false);
            }}>
            <MaterialCommunityIcons size={30} name="close" color={colors.grey}/>
          </TouchableOpacity>
        </ModalRow>
        <ModalInput
          onChangeText={(value) => setNewRoll({ ...newRoll, name: value})}
          placeholder="Roll name"
          autoCapitalize="none"
          autoCompleteType="off"
          autoCorrect={false}
        />
        <ModalText>Insert new roll expression:</ModalText>
        <ModalInput
          onChangeText={(value) => setNewRoll({ ...newRoll, expression: value}) }
          placeholder="Roll expression"
          autoCapitalize="none"
          autoCompleteType="off"
          autoCorrect={false}
        />
        <ModalButton onPress={handleAddRoll}>
          <ModalButtonText>Add Roll</ModalButtonText>
        </ModalButton>
      </ModalContainer>
    </Backdrop>
  ), [setIsAddRollModalOpen, newRoll, setNewRoll, handleAddRoll]);

  const renderDeletionModal = useCallback(() => (
    <Backdrop>
      <ModalContainer>
        <ModalRow>
          <ModalText>Are you sure you want to delete this character?</ModalText>
        </ModalRow>
        <ModalDoubleButtonsContainer>
          <ModalButton onPress={() => {
              handleCharacterDeletion();
          }}>
            <ModalButtonText>
              Yes
            </ModalButtonText>
          </ModalButton>
          <ModalButton onPress={() => {
              setIsDeletionModalOpen(false);
          }}>
            <ModalButtonText>
              No
            </ModalButtonText>
          </ModalButton>
        </ModalDoubleButtonsContainer>
      </ModalContainer>
    </Backdrop>
  ), []);

  const renderModal = useCallback(() => {
    if (isAddRollModalOpen) {
      return renderAddRollModal();
    }

    if (isDeletionModalOpen) {
      return renderDeletionModal();
    }

    return null;
  }, [
    isDeletionModalOpen,
    isAddRollModalOpen,
    setIsAddRollModalOpen,
    newRoll,
    setNewRoll,
    handleAddRoll
  ]);

  return (
    <CharacterScreenContainer>
      <CharacterHeaderContainer>
        <TouchableOpacity onPress={() => { navigation.navigate('Characters') }}>
          <MaterialCommunityIcons size={30} name="chevron-left" color={colors.grey} />
        </TouchableOpacity>
        <CharacterName>{currentCharacter.name}</CharacterName>
        <DeleteButton onPress={() => { setIsDeletionModalOpen(true) }}>
          <MaterialCommunityIcons size={30} name="trash-can-outline" color={colors.white} />
        </DeleteButton>
      </CharacterHeaderContainer>
      <CharacterContainerBottomLine/>
        <RollResult>{rollResult}</RollResult>
      <CharacterContainerBottomLine/>
      {renderRolls()}
      <AddRollButton onPress={() => { setIsAddRollModalOpen(true) }}>
        <AddRollText>Add Roll</AddRollText>
      </AddRollButton>
      {isAddRollModalOpen || isDeletionModalOpen ? renderModal() : null}
    </CharacterScreenContainer>
  );
}

export default Character;
