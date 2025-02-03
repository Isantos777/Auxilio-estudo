import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SaldoContext = createContext();

export const SaldoProvider = ({ children }) => {
  const [saldo, setSaldo] = useState(0);
  const [userId, setUserId] = useState(null); // Armazena o ID do usuário logado

  // Função para carregar o saldo do usuário logado
  const carregarSaldo = async () => {
    try {
      const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
      const currentUser = users.find(user => user.id === userId);
      if (currentUser) {
        setSaldo(currentUser.saldo);
      }
    } catch (error) {
      console.error('Erro ao carregar saldo:', error);
    }
  };

  // Função para atualizar o saldo
  const atualizarSaldo = async (novoSaldo) => {
    try {
      const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
      const updatedUsers = users.map(user =>
        user.id === userId ? { ...user, saldo: novoSaldo } : user
      );
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
      setSaldo(novoSaldo);
    } catch (error) {
      console.error('Erro ao atualizar saldo:', error);
    }
  };

  // Define o usuário logado e carrega seu saldo
  const setUser = async (id) => {
    setUserId(id);
    await carregarSaldo();
  };

  return (
    <SaldoContext.Provider value={{ saldo, atualizarSaldo, setUser }}>
      {children}
    </SaldoContext.Provider>
  );
};

export const useSaldo = () => {
  return useContext(SaldoContext);
};
