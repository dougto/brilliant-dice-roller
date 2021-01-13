import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Calculator: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculator</Text>
    </View>
  );
}

export default Calculator;

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
