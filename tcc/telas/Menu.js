import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSaldo } from '../Context/SaldoContext'; // Usando o contexto

const Menu = ({ navigation }) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const { saldo } = useSaldo(); // Acessando o saldo atualizado do contexto

  // Garantir que saldo é um número, com um fallback para 0
  const numericSaldo = typeof saldo === 'number' ? saldo : parseFloat(saldo) || 0;

  return (
    <ScrollView style={styles.container}>
      {/* Imagem de banner no topo */}
      <Image
        source={require('../img/students.webp')}
        style={styles.banner}
        resizeMode="cover"
      />

      {/* Exibindo Saldo Total */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Saldo Total</Text>
        <View style={styles.balanceValueContainer}>
          <Text style={styles.balanceValue}>
            {isBalanceVisible ? `R$ ${numericSaldo.toFixed(2)}` : '****'}
          </Text>
          <TouchableOpacity onPress={() => setIsBalanceVisible(!isBalanceVisible)}>
            <Icon
              name={isBalanceVisible ? 'visibility' : 'visibility-off'}
              size={24}
              color="#6a0dad"
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Botões de navegação */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Saldo')}>
        <Text style={styles.buttonText}>Atualizar Saldo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Meta')}>
        <Text style={styles.buttonText}>Metas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Dúvidas Financeiras')}>
        <View style={styles.buttonContent}>
          <Icon name="school" size={30} color="#fff" />
          <Text style={styles.buttonText}>Educação Financeira</Text>
        </View>
      </TouchableOpacity>

      {/* Botão de Configurações */}
      <TouchableOpacity style={styles.wheelButton} onPress={() => navigation.navigate('Configurações')}>
        <Icon name="settings" size={30} color="#fff" />
      </TouchableOpacity>
    </ScrollView>
  );
};

// Substitua o estilo de "wheelButton" para manter o botão dentro do fluxo do ScrollView
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0e5ff',
    padding: 20,
  },
  banner: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
  },
  balanceContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  balanceLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6a0dad',
  },
  balanceValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  balanceValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6a0dad',
    marginRight: 8,
  },
  eyeIcon: {
    padding: 5,
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
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Remover position absolute do botão de configurações
  wheelButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6a0dad',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    marginTop: 30, // Adicionando margem para o botão de configurações
    alignSelf: 'flex-end', // Para alinhá-lo à direita
  },
});


export default Menu;
