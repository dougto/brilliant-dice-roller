import React, { useState } from 'react';
import {
  Alert, FlatList, TouchableOpacity, View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useHistory } from '../../hooks/History';
import { EvalDiceExpression, isDiceExpressionValid } from '../../helpers/Math';
import colors from '../../constants/Colors';
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
  RollBottomLine,
  RollOutsideContainer,
  RollResultText,
  RollResultContainer,
  ModalCloseButtonContainer,
  StyledKeyboardAvoidingView,
  ModalYesButton,
  ModalNoButton,
  RedText,
} from './styles';

interface IRouteParams {
  character: ICharacter;
}

const Character: React.FC = () => {
  const route = useRoute();
  const { character } = route.params as IRouteParams;
  const { addHistoryItem } = useHistory();

  const [currentCharacter, setCurrentCharacter] = useState(character);
  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);
  const [isAddRollModalOpen, setIsAddRollModalOpen] = useState(false);
  const [newRoll, setNewRoll] = useState<ICharacterRoll>({ name: '', expression: '' });
  const [rollResults, setRollResults] = useState<number[]>([]);

  const navigation = useNavigation();

  const handleAddRoll = async () => {
    if (!isDiceExpressionValid(newRoll.expression)) {
      Alert.alert('Invalid expression');
      return;
    }

    const rollExists = currentCharacter.rolls.some((roll) => roll.name === newRoll.name);
    if (rollExists) {
      Alert.alert('Roll already exists');
      return;
    }

    const updatedCharacter: ICharacter = { ...currentCharacter, rolls: [...currentCharacter.rolls, newRoll] };

    const characters = JSON.parse(await AsyncStorage.getItem('@bdr:characters') as string) as ICharacter[];
    const newCharactersSet = characters.map((char) => {
      if (char.name === updatedCharacter.name) {
        return updatedCharacter;
      }
      return char;
    });

    await AsyncStorage.setItem('@bdr:characters', JSON.stringify(newCharactersSet) || '');

    setCurrentCharacter(updatedCharacter);
    setIsAddRollModalOpen(false);
  };

  const handleCharacterDeletion = async () => {
    const characters = JSON.parse(await AsyncStorage.getItem('@bdr:characters') as string) as ICharacter[];
    const newCharactersSet = characters.filter((char) => char.name != currentCharacter.name);

    await AsyncStorage.setItem('@bdr:characters', JSON.stringify(newCharactersSet) || '');

    navigation.navigate('Characters');
  };

  const handleRoll = (expression: string, name: string, index: number) => {
    const result = EvalDiceExpression(expression);

    const newRollResults = [...rollResults];
    newRollResults[index] = result;

    setRollResults([...newRollResults]);

    addHistoryItem({
      result: `${result}`,
      expression,
      name,
    });
  };

  const handleRollDeletion = async (rollName: string) => {
    const updatedRolls: ICharacterRoll[] = currentCharacter.rolls.filter((roll) => roll.name != rollName);
    const updatedCharacter: ICharacter = { ...currentCharacter, rolls: [...updatedRolls] };

    const characters = JSON.parse(await AsyncStorage.getItem('@bdr:characters') as string) as ICharacter[];
    const newCharactersSet = characters.map((char) => {
      if (char.name === updatedCharacter.name) {
        return updatedCharacter;
      }
      return char;
    });

    await AsyncStorage.setItem('@bdr:characters', JSON.stringify(newCharactersSet) || '');

    setCurrentCharacter(updatedCharacter);
  };

  const renderRoll = ({ item: roll, index }: { item: ICharacterRoll, index: number}) => (
    <RollOutsideContainer>
      <RollContainer>
        <RollContentContainer>
          <RollContentColumn>
            <RollName>{roll.name}</RollName>
            <RollExpression>{roll.expression}</RollExpression>
            <TouchableOpacity
              onPress={() => handleRollDeletion(roll.name)}
            >
              <RedText>delete</RedText>
            </TouchableOpacity>
          </RollContentColumn>
          <RollResultContainer>
            <RollResultText>{rollResults[index]}</RollResultText>
            <RollButton onPress={() => { handleRoll(roll.expression, roll.name, index); }}>
              <RollButtonText>Roll</RollButtonText>
            </RollButton>
          </RollResultContainer>
        </RollContentContainer>
      </RollContainer>
      <RollBottomLine />
    </RollOutsideContainer>
  );

  const renderRolls = () => {
    if (currentCharacter.rolls.length > 0) {
      return (
        <FlatList
          style={{ width: '100%' }}
          data={currentCharacter.rolls}
          renderItem={renderRoll}
          keyExtractor={({ name }) => name}
          ListFooterComponent={<View style={{ marginBottom: 100 }} />}
        />
      );
    }

    return (<NoCharactersText>No rolls yet.</NoCharactersText>);
  };

  const renderAddRollModal = () => (
    <Backdrop>
      <StyledKeyboardAvoidingView>
        <ModalContainer>
          <ModalCloseButtonContainer>
            <TouchableOpacity
              onPress={() => {
                setNewRoll({ name: '', expression: '' });
                setIsAddRollModalOpen(false);
              }}
            >
              <MaterialCommunityIcons size={30} name="close" color={colors.grey} />
            </TouchableOpacity>
          </ModalCloseButtonContainer>
          <ModalText>Insert new roll name:</ModalText>
          <ModalInput
            onChangeText={(value) => setNewRoll({ ...newRoll, name: value })}
            placeholder="Roll name"
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
          />
          <ModalText>Insert new roll expression:</ModalText>
          <ModalInput
            onChangeText={(value) => setNewRoll({ ...newRoll, expression: value })}
            placeholder="Roll expression"
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
          />
          <ModalButton onPress={handleAddRoll}>
            <ModalButtonText>Add Roll</ModalButtonText>
          </ModalButton>
        </ModalContainer>
      </StyledKeyboardAvoidingView>
    </Backdrop>
  );

  const renderDeletionModal = () => (
    <Backdrop>
      <ModalContainer>
        <ModalCloseButtonContainer>
          <TouchableOpacity
            onPress={() => {
              setIsDeletionModalOpen(false);
            }}
          >
            <MaterialCommunityIcons size={30} name="close" color={colors.grey} />
          </TouchableOpacity>
        </ModalCloseButtonContainer>
        <ModalRow>
          <ModalText>Are you sure you want to delete this character?</ModalText>
        </ModalRow>
        <ModalDoubleButtonsContainer>
          <ModalYesButton onPress={() => {
            handleCharacterDeletion();
          }}
          >
            <ModalButtonText>
              Yes
            </ModalButtonText>
          </ModalYesButton>
          <ModalNoButton onPress={() => {
            setIsDeletionModalOpen(false);
          }}
          >
            <ModalButtonText>
              No
            </ModalButtonText>
          </ModalNoButton>
        </ModalDoubleButtonsContainer>
      </ModalContainer>
    </Backdrop>
  );

  const renderModal = () => {
    if (isAddRollModalOpen) {
      return renderAddRollModal();
    }

    if (isDeletionModalOpen) {
      return renderDeletionModal();
    }

    return null;
  };

  return (
    <CharacterScreenContainer>
      <CharacterHeaderContainer>
        <TouchableOpacity onPress={() => { navigation.navigate('Characters'); }}>
          <MaterialCommunityIcons size={30} name="chevron-left" color={colors.grey} />
        </TouchableOpacity>
        <CharacterName>{currentCharacter.name}</CharacterName>
        <DeleteButton onPress={() => { setIsDeletionModalOpen(true); }}>
          <MaterialCommunityIcons size={30} name="trash-can-outline" color={colors.white} />
        </DeleteButton>
      </CharacterHeaderContainer>
      <CharacterContainerBottomLine />
      {renderRolls()}
      <AddRollButton onPress={() => { setIsAddRollModalOpen(true); }}>
        <AddRollText>Add Roll</AddRollText>
      </AddRollButton>
      {isAddRollModalOpen || isDeletionModalOpen ? renderModal() : null}
    </CharacterScreenContainer>
  );
};

export default Character;
