import React, { useState } from 'react';

import {
  Container,
  CharacterName
} from './styles';

const Character: React.FC = () => {
  return (
    <Container>
      <CharacterName>Single Character</CharacterName>
    </Container>
  );
}

export default Character;
