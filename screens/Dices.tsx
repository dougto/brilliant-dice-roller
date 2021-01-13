import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Dices: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dices</Text>
    </View>
  );
}

export default Dices;

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
