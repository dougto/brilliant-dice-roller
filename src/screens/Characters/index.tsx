import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from "../../constants/Colors";
import {
  Container,
  CharacterContainer,
  CharacterName,
  CharacterContainerBottomLine,
  TouchableContainer,
  AddButton,
  Backdrop,
  ModalContainer,
  ModalText,
  ModalInput,
  ModalButton,
  ModalButtonText,
  ModalRow,
  NoCharactersText,
} from './styles';

export interface ICharacterRoll {
  name: string;
  expression: string;
}

export interface ICharacter {
  name: string;
  rolls: ICharacterRoll[];
}

const Characters: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [newCharacterName, setNewCharacterName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigation = useNavigation();

  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadCharacters() {
      const storedCharacters = await AsyncStorage.getItem('@bdr:characters');
      setLoading(false);
      if (!storedCharacters) return;
      setCharacters(JSON.parse(storedCharacters) as ICharacter[])
    }

    loadCharacters();
  }, [isFocused]);

  const handleAddCharacter = async () => {
    if (characters.find(char => char.name === newCharacterName)) {
      Alert.alert('Character already exists!');
      return;
    }

    const newCharacter: ICharacter = {
      name: newCharacterName,
      rolls: [],
    };

    await AsyncStorage.setItem('@bdr:characters', JSON.stringify([...characters, newCharacter]));

    setCharacters([...characters, newCharacter]);
    setIsModalOpen(false);
  };

  const renderCharacters = () => {
    if (loading) {
      return <ActivityIndicator/>;
    }

    if (characters.length > 0) {
      return characters.map((character) => (
        <CharacterContainer key={character.name}>
          <TouchableContainer onPress={() => { navigation.navigate('Character', {character}) }}>
            <CharacterName>{character.name}</CharacterName>
            <MaterialCommunityIcons size={30} name="chevron-right" color={colors.grey} />
          </TouchableContainer>
          <CharacterContainerBottomLine />
        </CharacterContainer>
      ))
    }
    return (<NoCharactersText>No characters created yet. Press the plus button to create a character.</NoCharactersText>)
  };

  const renderAddCharacterModal = () => (
    <Backdrop>
      <ModalContainer>
        <ModalRow>
          <ModalText>Insert character name:</ModalText>
          <TouchableOpacity
            onPress={() => {
              setNewCharacterName('');
              setIsModalOpen(false);
            }}>
            <MaterialCommunityIcons size={30} name="close" color={colors.grey}/>
          </TouchableOpacity>
        </ModalRow>
        <ModalInput
          onChangeText={(value) => setNewCharacterName(value) }
          placeholder="Name"
          autoCapitalize="none"
          autoCompleteType="off"
          autoCorrect={false}
        />
        <ModalButton onPress={handleAddCharacter}>
          <ModalButtonText>Add Character</ModalButtonText>
        </ModalButton>
      </ModalContainer>
    </Backdrop>
  );

  return (
    <Container>
      <ScrollView style={{ width: '100%' }}>
        {renderCharacters()}
      </ScrollView>
      <AddButton onPress={() => { setIsModalOpen(true) }}>
        <MaterialCommunityIcons size={60} name="plus" color={colors.white}/>
      </AddButton>
      {isModalOpen ? renderAddCharacterModal() : null}
    </Container>
  );
}

export default Characters;
