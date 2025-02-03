import AsyncStorage from '@react-native-async-storage/async-storage';

// Função para criar as tabelas (estrutura inicial de dados no AsyncStorage)
export const createTables = async () => {
  try {
    // Tabela de saldo
    const saldo = await AsyncStorage.getItem('saldo');
    if (!saldo) {
      await AsyncStorage.setItem('saldo', JSON.stringify({ id: 1, saldo: 0 }));
    }

    // Tabela de metas
    const metas = await AsyncStorage.getItem('definirmeta');
    if (!metas) {
      await AsyncStorage.setItem('definirmeta', JSON.stringify([]));
    }

    // Tabela de cadastro de usuários
    const cadastro = await AsyncStorage.getItem('cadastro');
    if (!cadastro) {
      await AsyncStorage.setItem('cadastro', JSON.stringify([]));
    }

    console.log('Estrutura inicial criada.');
  } catch (error) {
    console.error('Erro ao criar a estrutura inicial:', error);
  }
};

// Função para manipular dados (inserir, atualizar ou excluir)
export const modifyData = async (table, data, action, id = null) => {
  try {
    const storedData = JSON.parse(await AsyncStorage.getItem(table)) || [];

    let updatedData;
    switch (action) {
      case 'insert':
        updatedData = [...storedData, data];
        break;

      case 'update':
        updatedData = storedData.map((item) =>
          item.id === id ? { ...item, ...data } : item
        );
        break;

      case 'delete':
        updatedData = storedData.filter((item) => item.id !== id);
        break;

      default:
        throw new Error('Ação inválida');
    }

    await AsyncStorage.setItem(table, JSON.stringify(updatedData));
    console.log(`Dados em "${table}" atualizados com sucesso.`);
  } catch (error) {
    console.error(`Erro ao modificar "${table}":`, error);
  }
};

// Função para carregar dados de uma "tabela"
export const loadData = async (table) => {
  try {
    const data = await AsyncStorage.getItem(table);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Erro ao carregar dados de "${table}":`, error);
    return [];
  }
};