import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecuperarSenhaScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [maskedEmail, setMaskedEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const showAlert = (title, message) => {
    if (Platform.OS !== 'web') { // Exibir alertas apenas no mobile
      Alert.alert(title, message);
    }
  };

  const handleVerifyEmail = async () => {
    if (!email) {
      showAlert('Erro', 'Por favor, insira o e-mail.');
      return;
    }

    try {
      const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
      const userExists = users.find((user) => user.email === email);

      if (userExists) {
        const emailParts = email.split('@');
        const hiddenPart = emailParts[0].slice(0, emailParts[0].length / 2) + '*****';
        const masked = `${hiddenPart}@${emailParts[1]}`;
        setMaskedEmail(masked);
        setIsEmailVerified(true);

        showAlert('Sucesso', 'E-mail encontrado! Insira uma nova senha.');
      } else {
        showAlert('Erro', 'E-mail não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao verificar e-mail:', error);
      showAlert('Erro', 'Não foi possível verificar o e-mail.');
    }
  };

  const handleSavePassword = async () => {
    if (!newPassword || !confirmPassword) {
      showAlert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (newPassword !== confirmPassword) {
      showAlert('Erro', 'A nova senha e a confirmação não são iguais.');
      return;
    }

    try {
      const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
      const updatedUsers = users.map((user) =>
        user.email === email ? { ...user, password: newPassword } : user
      );
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));

      showAlert('Sucesso', 'Sua senha foi alterada com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar nova senha:', error);
      showAlert('Erro', 'Não foi possível alterar a senha.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Senha</Text>
      {!isEmailVerified ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity style={styles.button} onPress={handleVerifyEmail}>
            <Text style={styles.buttonText}>Verificar E-mail</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.label}>E-mail:</Text>
          <Text style={styles.maskedEmail}>{maskedEmail}</Text>
          <TextInput
            style={styles.input}
            placeholder="Nova Senha"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar Nova Senha"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity style={styles.button} onPress={handleSavePassword}>
            <Text style={styles.buttonText}>Salvar Senha</Text>
          </TouchableOpacity>
        </>
      )}
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#4a004d',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    color: '#4a004d',
    marginBottom: 10,
    textAlign: 'center',
  },
  maskedEmail: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a004d',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6a0dad',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default RecuperarSenhaScreen;
