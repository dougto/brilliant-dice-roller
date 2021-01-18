import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

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
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [newCharacterName, setNewCharacterName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigation = useNavigation();

  const handleAddCharacter = useCallback(() => {
    const newCharacter: ICharacter = {
      name: newCharacterName,
      rolls: [],
    };

    setCharacters([...characters, newCharacter]);

    setIsModalOpen(false);
  }, [newCharacterName, characters]);

  const renderCharacters = useCallback(() => {
    if (characters.length > 0) {
      return characters.map((character) => (
        <CharacterContainer key={character.name}>
          <TouchableContainer onPress={() => { navigation.navigate('Character') }}>
            <CharacterName>{character.name}</CharacterName>
            <MaterialCommunityIcons size={30} name="chevron-right" color={colors.grey} />
          </TouchableContainer>
          <CharacterContainerBottomLine />
        </CharacterContainer>
      ))
    }
    return (<NoCharactersText>No Characters saved yet :(</NoCharactersText>)
  }, [characters]);

  const renderAddCharacterModal = useCallback(() => (
    <Backdrop>
      <ModalContainer>
        <ModalRow>
          <ModalText>Insert character name:</ModalText>
          <TouchableOpacity onPress={() => { setIsModalOpen(false) }}>
            <MaterialCommunityIcons size={30} name="close" color={colors.grey}/>
          </TouchableOpacity>
        </ModalRow>
        <ModalInput
          onChangeText={(value) => setNewCharacterName(value) }
          placeholder="Name"
        />
        <ModalButton onPress={handleAddCharacter}>
          <ModalButtonText>Add Character</ModalButtonText>
        </ModalButton>
      </ModalContainer>
    </Backdrop>
  ), [newCharacterName, setNewCharacterName]);

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
