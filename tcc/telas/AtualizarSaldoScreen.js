import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native'; // Certifique-se de que o Text é importado corretamente
import { useSaldo } from '../Context/SaldoContext';

const AtualizarSaldoScreen = () => {
  const [novoSaldo, setNovoSaldo] = useState('');
  const { atualizarSaldo } = useSaldo();

  const handleUpdate = () => {
    if (novoSaldo) {
      atualizarSaldo(parseFloat(novoSaldo));
      alert('Sucesso: Seu saldo foi atualizado com sucesso!');
      setNovoSaldo('');
    } else {
      alert('Erro: Por favor, insira um valor válido!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Informe o novo saldo:</Text>
      <TextInput
        style={styles.input}
        value={novoSaldo}
        onChangeText={setNovoSaldo}
        keyboardType="numeric"
      />
      
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Atualizar Saldo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0e5ff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6a0dad',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6a0dad',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AtualizarSaldoScreen;
