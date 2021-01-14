import React, { useState } from 'react';

import {
  Container,
  BigText,
} from './styles';

const Characters: React.FC = () => {
  const [characters, setCharacters] = useState({});

  return (
    <Container>
      <BigText>Characters</BigText>
    </Container>
  );
}

export default Characters;
