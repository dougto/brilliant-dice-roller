import React, { useState } from 'react';
import {
  Alert, FlatList, TouchableOpacity, View,
} from 'react-native';
import { useMediaQuery } from 'react-responsive';
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
  BlueText,
  ModifyRollsButtonsContainer,
  EditBoxContainer,
  EditBoxText,
  MarginView,
  ModalYellowButton,
  ButtonsContainer,
  Row,
  Button,
  ButtonText,
  BackButton,
  GridContainer,
  ExpressionPreview,
  ExpressionPreviewContainer,
} from './styles';

interface IRouteParams {
  character: ICharacter;
}

const ExpressionMaxSize = 25;

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
  const [isEditRollModalOpen, setIsEditRollModalOpen] = useState(false);
  const [isSelectExpressionModalOpen, setIsSelectExpressionModalOpen] = useState(false);
  const [newRoll, setNewRoll] = useState<ICharacterRoll>({ name: '', expression: '' });
  const [rollResults, setRollResults] = useState<number[]>([]);
  const [isMaxValue, setIsMaxValue] = useState<boolean[]>([]);
  const [isMinValue, setIsMinValue] = useState<boolean[]>([]);
  const [editableExpression, setEditableExpression] = useState('');
  const [editableExpressionToShow, setEditableExpressionToShow] = useState('');

  const navigation = useNavigation();

  const isSmallDevice = useMediaQuery({
    maxDeviceHeight: 700,
  });

  const handleAddRoll = async () => {
    if (!newRoll.name) {
      Alert.alert('Insert a name');
      return;
    }

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

    setEditableExpression('');
    setEditableExpressionToShow('');

    setNewRoll({ name: '', expression: '' });
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

  const handleEditRoll = async () => {
    if (!isDiceExpressionValid(newRoll.expression || selectedRoll.expression)) {
      setSelectedRoll({} as ICharacterRoll);
      Alert.alert('Invalid expression');
      return;
    }

    const rollExists = currentCharacter.rolls.some((roll) => roll.name === newRoll.name);
    if (rollExists) {
      setSelectedRoll({} as ICharacterRoll);
      Alert.alert('Roll already exists');
      return;
    }

    const rollIndex = currentCharacter.rolls.map((roll) => roll.name).indexOf(selectedRoll.name);

    const updatedRoll = {
      name: newRoll.name || selectedRoll.name,
      expression: newRoll.expression || selectedRoll.expression,
    };

    const updatedCharacter: ICharacter = { ...currentCharacter };
    updatedCharacter.rolls[rollIndex] = { ...updatedRoll };

    const characters = JSON.parse(await AsyncStorage.getItem('@bdr:characters') as string) as ICharacter[];
    const newCharactersSet = characters.map((char) => {
      if (char.name === updatedCharacter.name) {
        return updatedCharacter;
      }
      return char;
    });

    await AsyncStorage.setItem('@bdr:characters', JSON.stringify(newCharactersSet) || '');

    setCurrentCharacter(updatedCharacter);
    setSelectedRoll({} as ICharacterRoll);
    setNewRoll({ name: '', expression: '' });
    setIsEditRollModalOpen(false);

    setEditableExpression('');
    setEditableExpressionToShow('');
  };

  const updateExpressions = (newCharacter: string) => {
    if (editableExpression.length < ExpressionMaxSize) {
      const newExpression = editableExpression + newCharacter;
      setEditableExpression(newExpression);
      setEditableExpressionToShow(newExpression.replace(/\//g, '÷').replace(/\*/g, 'x'));
    }
  };

  const eraseLastExpressionCharacter = () => {
    if (editableExpression === '') return;

    const newExpression = editableExpression.slice(0, -1);

    setEditableExpression(newExpression);
    setEditableExpressionToShow(newExpression.replace(/\//g, '÷').replace(/\*/g, 'x'));
  };

  const renderRoll = ({ item: roll, index }: { item: ICharacterRoll, index: number}) => (
    <RollOutsideContainer>
      <RollContainer>
        <RollContentContainer>
          <RollContentColumn>
            <RollName>{roll.name}</RollName>
            <RollExpression>{roll.expression}</RollExpression>
            <ModifyRollsButtonsContainer>
              <TouchableOpacity
                onPress={() => { setSelectedRoll(roll); setIsRollDeletionModalOpen(true); }}
              >
                <RedText>delete</RedText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => { setSelectedRoll(roll); setIsEditRollModalOpen(true); }}
              >
                <BlueText>edit</BlueText>
              </TouchableOpacity>
            </ModifyRollsButtonsContainer>
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
                setEditableExpression('');
                setEditableExpressionToShow('');
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
            defaultValue={newRoll.name}
            autoCorrect={false}
          />
          <ModalText>Press to select roll expression:</ModalText>
          <MarginView />
          <ModalYellowButton onPress={() => setIsSelectExpressionModalOpen(true)}>
            <ModalButtonText>{editableExpressionToShow || 'Select expression'}</ModalButtonText>
          </ModalYellowButton>
          <MarginView />
          <ModalButton onPress={handleAddRoll}>
            <ModalButtonText>Add Roll</ModalButtonText>
          </ModalButton>
        </ModalContainer>
      </StyledKeyboardAvoidingView>
    </Backdrop>
  );

  const renderSelectExpressionModal = () => (
    <Backdrop>
      <ModalContainer>
        <ModalText>Select expression:</ModalText>
        <ExpressionPreviewContainer>
          <ExpressionPreview>{editableExpressionToShow}</ExpressionPreview>
        </ExpressionPreviewContainer>
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
            <Button onPress={() => { updateExpressions('-'); }} disabled={!isDiceExpressionValid(`${editableExpression}-1`)}>
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
            <Button onPress={() => { updateExpressions('+'); }} disabled={!isDiceExpressionValid(`${editableExpression}+1`)}>
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
            <Button onPress={() => { updateExpressions('d'); }} disabled={!isDiceExpressionValid(`${editableExpression}d1`)}>
              <ButtonText>d</ButtonText>
            </Button>
          </Row>
          <Row small={isSmallDevice}>
            <GridContainer>
              <Button onPress={() => { updateExpressions('0'); }} disabled={!isDiceExpressionValid(`${editableExpression}0`)}>
                <ButtonText>0</ButtonText>
              </Button>
            </GridContainer>
            <GridContainer>
              <Button onPress={() => { updateExpressions('*'); }} disabled={!isDiceExpressionValid(`${editableExpression}*1`)}>
                <ButtonText>x</ButtonText>
              </Button>
            </GridContainer>
            <GridContainer>
              <BackButton onPress={eraseLastExpressionCharacter}>
                <MaterialCommunityIcons size={20} name="arrow-left-thick" color={colors.white} />
              </BackButton>
            </GridContainer>
          </Row>
        </ButtonsContainer>
        <ModalDoubleButtonsContainer>
          <ModalYesButton
            disabled={!isDiceExpressionValid(editableExpression)}
            onPress={() => {
              setNewRoll({ ...newRoll, expression: editableExpression });
              setSelectedRoll({ ...selectedRoll, expression: editableExpression });
              setIsSelectExpressionModalOpen(false);
            }}
          >
            <ModalButtonText>
              Confirm
            </ModalButtonText>
          </ModalYesButton>
          <ModalNoButton onPress={() => {
            setIsSelectExpressionModalOpen(false);
            setEditableExpression(newRoll.expression);
            setEditableExpressionToShow(newRoll.expression.replace(/\//g, '÷').replace(/\*/g, 'x'));
          }}
          >
            <ModalButtonText>
              Cancel
            </ModalButtonText>
          </ModalNoButton>
        </ModalDoubleButtonsContainer>
      </ModalContainer>
    </Backdrop>
  );

  const renderEditRollModal = () => (
    <Backdrop>
      <StyledKeyboardAvoidingView>
        <ModalContainer>
          <ModalCloseButtonContainer>
            <TouchableOpacity
              onPress={() => {
                setSelectedRoll({} as ICharacterRoll);
                setNewRoll({ name: '', expression: '' });
                setIsEditRollModalOpen(false);
              }}
            >
              <MaterialCommunityIcons size={30} name="close" color={colors.grey} />
            </TouchableOpacity>
          </ModalCloseButtonContainer>
          <ModalText>New roll name:</ModalText>
          <ModalInput
            onChangeText={(value) => setNewRoll({ ...newRoll, name: value })}
            placeholder="Roll name"
            autoCapitalize="none"
            autoCompleteType="off"
            defaultValue={selectedRoll.name}
            autoCorrect={false}
          />
          <ModalText>Press to select roll expression:</ModalText>
          <MarginView />
          <ModalYellowButton onPress={() => {
            setEditableExpressionToShow(selectedRoll.expression.replace(/\//g, '÷').replace(/\*/g, 'x'));
            setEditableExpression(selectedRoll.expression);
            setIsSelectExpressionModalOpen(true);
          }}
          >
            <ModalButtonText>{selectedRoll.expression || 'Select expression'}</ModalButtonText>
          </ModalYellowButton>
          <MarginView />
          <ModalButton onPress={handleEditRoll}>
            <ModalButtonText>Save roll</ModalButtonText>
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
    if (isSelectExpressionModalOpen) {
      return renderSelectExpressionModal();
    }

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

    if (isEditRollModalOpen) {
      return renderEditRollModal();
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
