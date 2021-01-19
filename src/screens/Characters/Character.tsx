import React, { useState, useCallback } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
} from './styles';

interface IRouteParams {
  character: ICharacter;
}

const Character: React.FC = () => {
  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);
  const [isAddRollModalOpen, setIsAddRollModalOpen] = useState(false);
  const [newRoll, setNewRoll] = useState<ICharacterRoll>({} as ICharacterRoll);

  const route = useRoute();
  const { character } = route.params as IRouteParams;

  const navigation = useNavigation();

  const handleAddRoll = useCallback(() => {
    console.log('roll added: ', newRoll);
  }, [newRoll, character]);

  const handleCharacterDeletion = useCallback(async () => {
    const characters = JSON.parse(await AsyncStorage.getItem('@bdr:characters') as string) as ICharacter[];
    const newCharactersSet = characters.filter(char => char.name != character.name);

    await AsyncStorage.setItem('@bdr:characters', JSON.stringify(newCharactersSet) || '');

    navigation.navigate('Characters');
  }, [character]);

  const renderRolls = useCallback(() => {
    if (character.rolls.length > 0) {
      return (
        <ScrollView>
          <Text>Rolls!</Text>
        </ScrollView>
      )
    }

    return (<NoCharactersText>No rolls yet :(</NoCharactersText>)
  }, [character]);

  const renderAddRollModal = useCallback(() => (
    <Backdrop>
      <ModalContainer>
        <ModalRow>
          <ModalText>Insert new roll name:</ModalText>
          <TouchableOpacity
            onPress={() => {
              setNewRoll({} as ICharacterRoll);
              setIsAddRollModalOpen(false);
            }}>
            <MaterialCommunityIcons size={30} name="close" color={colors.grey}/>
          </TouchableOpacity>
        </ModalRow>
        <ModalInput
          onChangeText={(value) => setNewRoll({ ...newRoll, name: value}) }
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
  }, [isDeletionModalOpen, isAddRollModalOpen]);

  return (
    <CharacterScreenContainer>
      <CharacterHeaderContainer>
        <TouchableOpacity onPress={() => { navigation.navigate('Characters') }}>
          <MaterialCommunityIcons size={30} name="chevron-left" color={colors.grey} />
        </TouchableOpacity>
        <CharacterName>{character.name}</CharacterName>
        <DeleteButton onPress={() => { setIsDeletionModalOpen(true) }}>
          <MaterialCommunityIcons size={30} name="trash-can-outline" color={colors.white} />
        </DeleteButton>
      </CharacterHeaderContainer>
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
