import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CadastroScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cpf, setCpf] = useState('');

  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirmPassword || !cpf) {
      alert('Erro: Todos os campos são obrigatórios!');
      return;
    }

    if (password !== confirmPassword) {
      alert('Erro: As senhas não coincidem!');
      return;
    }

    if (!/^[0-9]{11}$/.test(cpf)) {
      alert('Erro: Digite um CPF válido com 11 dígitos!');
      return;
    }

    try {
      const users = JSON.parse(await AsyncStorage.getItem('users')) || [];

      const emailExists = users.some((user) => user.email === email);
      const cpfExists = users.some((user) => user.cpf === cpf);
      if (emailExists || cpfExists) {
        alert('Erro: Este e-mail ou CPF já está cadastrado!');
        return;
      }

      // Novo usuário com saldo inicial zerado
      const newUser = {
        id: Date.now(),
        fullName,
        email,
        password,
        cpf,
        saldo: 0,
      };

      users.push(newUser);
      await AsyncStorage.setItem('users', JSON.stringify(users));

      alert('Sucesso: Cadastro realizado com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      alert('Erro: Não foi possível realizar o cadastro.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <View style={styles.inputContainer}>
        <Icon name="person" size={20} color="#666" />
        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="email" size={20} color="#666" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="credit-card" size={20} color="#666" />
        <TextInput
          style={styles.input}
          placeholder="CPF"
          keyboardType="numeric"
          value={cpf}
          onChangeText={setCpf}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#666" />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock-outline" size={20} color="#666" />
        <TextInput
          style={styles.input}
          placeholder="Confirme a Senha"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
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
  title: {
    fontSize: 32,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#4a004d',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#6a0dad',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 45,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#4a004d',
  },
  button: {
    backgroundColor: '#6a0dad',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default CadastroScreen;
