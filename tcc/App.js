import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SaldoProvider } from './Context/SaldoContext'; // Importa o contexto de saldo
import { ThemeProvider } from './telas/Configuracoes';  // Importe o contexto de tema

import LoginScreen from './telas/LoginScreen';
import BasicQuestionsScreen from './telas/Perguntas';
import Menu from './telas/Menu';
import DuvidasFinanceiras from './telas/DuvidasFinanceiras';
import Configuracoes from './telas/Configuracoes';
import MetaDoMes from './telas/Metas';
import DefinirMetaScreen from './telas/DefinirMetaScreen';
import AtualizarSaldoScreen from './telas/AtualizarSaldoScreen';
import CadastroScreen from './telas/CadastroScreen';
import RecuperarSenhaScreen from './telas/RecuperarSenha';

import { createTables } from './database/database';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    createTables();
  }, []);

  return (
    <SaldoProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={LoginScreen}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Perguntas" component={BasicQuestionsScreen} />
            <Stack.Screen name="Menu" component={Menu} />
            <Stack.Screen name="Meta" component={MetaDoMes} />
            <Stack.Screen name="Dúvidas Financeiras" component={DuvidasFinanceiras} />
            <Stack.Screen name="Configurações" component={Configuracoes} />
            <Stack.Screen name="DefinirMeta" component={DefinirMetaScreen} />
            <Stack.Screen name="Saldo" component={AtualizarSaldoScreen} />
            <Stack.Screen name="Cadastro" component={CadastroScreen} />
          <Stack.Screen name="RecuperarSenha" component={RecuperarSenhaScreen} />

          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SaldoProvider>
  );
};

export default App;
