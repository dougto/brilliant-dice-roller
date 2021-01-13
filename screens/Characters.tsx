import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Characters: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Characters</Text>
    </View>
  );
}

export default Characters;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
