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
  EditButton,
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
  EditBoxContainer,
  EditBoxText,
  MarginView,
} from './styles';

interface IRouteParams {
  character: ICharacter;
}

const Character: React.FC = () => {
  const route = useRoute();
  const { character } = route.params as IRouteParams;
  const { addHistoryItem } = useHistory();

  const [newCharacterName, setNewCharacterName] = useState('');
  const [isEditCharacterNameModalOpen, setIsEditCharacterNameModalOpen] = useState(false);
  const [isEditBoxOpen, setisEditBoxOpen] = useState(false);
  const [currentCharacter, setCurrentCharacter] = useState(character);
  const [isCharacterDeletionModalOpen, setIsCharacterDeletionModalOpen] = useState(false);
  const [isAddRollModalOpen, setIsAddRollModalOpen] = useState(false);
  const [selectedRoll, setSelectedRoll] = useState<ICharacterRoll>({} as ICharacterRoll);
  const [isRollDeletionModalOpen, setIsRollDeletionModalOpen] = useState(false);
  const [newRoll, setNewRoll] = useState<ICharacterRoll>({ name: '', expression: '' });
  const [rollResults, setRollResults] = useState<number[]>([]);
  const [isMaxValue, setIsMaxValue] = useState<boolean[]>([]);
  const [isMinValue, setIsMinValue] = useState<boolean[]>([]);

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

  const handleEditCharacterName = async () => {
    if (!newCharacterName) {
      Alert.alert('Please insert a name');
      return;
    }

    const updatedCharacter: ICharacter = {
      ...currentCharacter,
      name: newCharacterName,
    };

    const storedCharacters = JSON.parse(await AsyncStorage.getItem('@bdr:characters') as string) as ICharacter[];
    const filteredCharacters = storedCharacters.filter((char) => char.name != currentCharacter.name);
    const newCharactersSet = [updatedCharacter, ...filteredCharacters];

    await AsyncStorage.setItem('@bdr:characters', JSON.stringify(newCharactersSet) || '');

    setCurrentCharacter(updatedCharacter);
    setIsEditCharacterNameModalOpen(false);
  };

  const handleCharacterDeletion = async () => {
    const characters = JSON.parse(await AsyncStorage.getItem('@bdr:characters') as string) as ICharacter[];
    const newCharactersSet = characters.filter((char) => char.name != currentCharacter.name);

    await AsyncStorage.setItem('@bdr:characters', JSON.stringify(newCharactersSet) || '');

    navigation.navigate('Characters');
  };

  const handleRoll = (expression: string, name: string, index: number) => {
    const [result, max, min] = EvalDiceExpression(expression);

    const newIsMaxValue = [...isMaxValue];
    newIsMaxValue[index] = max === result;
    setIsMaxValue([...newIsMaxValue]);

    const newIsMinValue = [...isMinValue];
    newIsMinValue[index] = min === result;
    setIsMinValue([...newIsMinValue]);

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
    if (!rollName) {
      return;
    }

    const rollIndex = currentCharacter.rolls.map((roll) => roll.name).indexOf(rollName);
    const newRollResults = [...rollResults];
    newRollResults.splice(rollIndex, 1);
    setRollResults(newRollResults);

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
              onPress={() => { setSelectedRoll(roll); setIsRollDeletionModalOpen(true); }}
            >
              <RedText>delete</RedText>
            </TouchableOpacity>
          </RollContentColumn>
          <RollResultContainer>
            <RollResultText isMax={isMaxValue[index]} isMin={isMinValue[index]}>
              {rollResults[index]}
            </RollResultText>
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
          <ModalText>(example: 2d8+5)</ModalText>
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

  const renderRollDeletionModal = () => (
    <Backdrop>
      <ModalContainer>
        <ModalCloseButtonContainer>
          <TouchableOpacity
            onPress={() => {
              setIsRollDeletionModalOpen(false);
            }}
          >
            <MaterialCommunityIcons size={30} name="close" color={colors.grey} />
          </TouchableOpacity>
        </ModalCloseButtonContainer>
        <ModalRow>
          <ModalText>
            Are you sure you want to delete the roll '
            {selectedRoll.name}
            '?
          </ModalText>
        </ModalRow>
        <MarginView />
        <ModalDoubleButtonsContainer>
          <ModalYesButton onPress={() => {
            handleRollDeletion(selectedRoll.name);
            setIsRollDeletionModalOpen(false);
          }}
          >
            <ModalButtonText>
              Yes
            </ModalButtonText>
          </ModalYesButton>
          <ModalNoButton onPress={() => {
            setIsRollDeletionModalOpen(false);
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

  const renderCharacterDeletionModal = () => (
    <Backdrop>
      <ModalContainer>
        <ModalCloseButtonContainer>
          <TouchableOpacity
            onPress={() => {
              setIsCharacterDeletionModalOpen(false);
            }}
          >
            <MaterialCommunityIcons size={30} name="close" color={colors.grey} />
          </TouchableOpacity>
        </ModalCloseButtonContainer>
        <ModalRow>
          <ModalText>Are you sure you want to delete this character?</ModalText>
        </ModalRow>
        <MarginView />
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
            setIsCharacterDeletionModalOpen(false);
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

  const renderEditBox = () => (
    <Backdrop>
      <ModalContainer>
        <ModalCloseButtonContainer>
          <TouchableOpacity
            onPress={() => {
              setisEditBoxOpen(false);
            }}
          >
            <MaterialCommunityIcons size={30} name="close" color={colors.grey} />
          </TouchableOpacity>
        </ModalCloseButtonContainer>
        <EditBoxContainer>
          <TouchableOpacity
            onPress={() => {
              setisEditBoxOpen(false);
              setIsEditCharacterNameModalOpen(true);
            }}
          >
            <EditBoxText>Edit character name</EditBoxText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setisEditBoxOpen(false);
              setIsCharacterDeletionModalOpen(true);
            }}
          >
            <EditBoxText>Delete character</EditBoxText>
          </TouchableOpacity>
        </EditBoxContainer>
      </ModalContainer>
    </Backdrop>
  );

  const renderEditCharacterNameModal = () => (
    <Backdrop>
      <StyledKeyboardAvoidingView>
        <ModalContainer>
          <ModalCloseButtonContainer>
            <TouchableOpacity
              onPress={() => {
                setIsEditCharacterNameModalOpen(false);
              }}
            >
              <MaterialCommunityIcons size={30} name="close" color={colors.grey} />
            </TouchableOpacity>
          </ModalCloseButtonContainer>
          <ModalText>Insert new character name:</ModalText>
          <ModalInput
            onChangeText={(value) => setNewCharacterName(value)}
            placeholder="New character name"
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
          />
          <ModalDoubleButtonsContainer>
            <ModalYesButton onPress={() => {
              handleEditCharacterName();
            }}
            >
              <ModalButtonText>
                Confirm
              </ModalButtonText>
            </ModalYesButton>
            <ModalNoButton onPress={() => {
              setIsEditCharacterNameModalOpen(false);
            }}
            >
              <ModalButtonText>
                Cancel
              </ModalButtonText>
            </ModalNoButton>
          </ModalDoubleButtonsContainer>
        </ModalContainer>
      </StyledKeyboardAvoidingView>
    </Backdrop>
  );

  const renderModal = () => {
    if (isAddRollModalOpen) {
      return renderAddRollModal();
    }

    if (isCharacterDeletionModalOpen) {
      return renderCharacterDeletionModal();
    }

    if (isRollDeletionModalOpen) {
      return renderRollDeletionModal();
    }

    if (isEditBoxOpen) {
      return renderEditBox();
    }

    if (isEditCharacterNameModalOpen) {
      return renderEditCharacterNameModal();
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
        <EditButton onPress={() => { setisEditBoxOpen(true); }}>
          <MaterialCommunityIcons size={30} name="dots-vertical" color={colors.grey} />
        </EditButton>
      </CharacterHeaderContainer>
      <CharacterContainerBottomLine />
      {renderRolls()}
      <AddRollButton onPress={() => { setIsAddRollModalOpen(true); }}>
        <AddRollText>Add Roll</AddRollText>
      </AddRollButton>
      {renderModal()}
    </CharacterScreenContainer>
  );
};

export default Character;
