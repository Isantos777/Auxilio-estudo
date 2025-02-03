import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

 //

  const showAlert = (title, message) => {
    if (Platform.OS !== 'web') {
      Alert.alert(title, message);
    }
  };

  const handleLogin = async () => {
    if (!identifier || !password) {
      showAlert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }

    try {
      const users = JSON.parse(await AsyncStorage.getItem('users')) || [];

      const userExists = users.find(
        (user) =>
          (user.cpf === identifier || user.email === identifier) &&
          user.password === password
      );

      console.log('User Exists:', userExists);  // Log para verificação

      if (userExists) {
        // Atualizando o status de login do usuário
        const updatedUsers = users.map((user) =>
          (user.cpf === identifier || user.email === identifier)
            ? { ...user, isLoggedIn: true }
            : user
        );
        await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));

        showAlert('Sucesso', 'Login realizado com sucesso!');

        // Verificar saldo após o login
        if (userExists.saldo > 0) {
          console.log('Saldo maior que 0, redirecionando para Menu');
          navigation.navigate('Menu');
        } else {
          console.log('Saldo igual a 0, redirecionando para Perguntas');
          navigation.navigate('Perguntas');
        }
      } else {
        showAlert('Erro', 'CPF/E-mail ou senha incorretos!');
      }
    } catch (error) {
      console.error('Erro ao verificar usuário:', error);
      showAlert('Erro', 'Não foi possível realizar o login.');
    }
  };

  const handleSignUp = () => {
    navigation.navigate('Cadastro');
  };

  const handleForgotPassword = () => {
    navigation.navigate('RecuperarSenha');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Boas-vindas!</Text>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <Icon name="person" size={20} color="#666" />
        <TextInput
          style={styles.input}
          placeholder="CPF ou E-mail"
          value={identifier}
          onChangeText={setIdentifier}
          accessible
          accessibilityLabel="Campo para CPF ou E-mail"
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
          accessible
          accessibilityLabel="Campo para Senha"
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        accessible
        accessibilityLabel="Botão para entrar"
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignUp}>
        <Text style={styles.signUpText}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
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
  signUpText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#6a0dad',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  forgotPasswordText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#6a0dad',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
