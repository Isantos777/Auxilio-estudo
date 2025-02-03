import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MetaDoMes = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meta do Mês</Text>

   

      {/* Botão Definir Meta do Mês */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('DefinirMeta')}
      >
        <Text style={styles.buttonText}>Definir Meta do Mês</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0e5ff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6a0dad',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#6a0dad',
    padding: 15,
    borderRadius: 10,
    marginVertical: 15,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default MetaDoMes;
