import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, KeyboardAvoidingView,
  Platform, TouchableWithoutFeedback, Keyboard, ActivityIndicator
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ProgressBar } from 'react-native-paper';
import { modifyData, loadData } from '../database/database';

const DefinirMetaScreen = () => {
  const [goalDescription, setGoalDescription] = useState('');
  const [goalCategory, setGoalCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [goalValue, setGoalValue] = useState('');
  const [goalTargetValue, setGoalTargetValue] = useState('');
  const [savedGoals, setSavedGoals] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCustomCategory, setIsCustomCategory] = useState(false);

  useEffect(() => {
    const loadGoals = async () => {
      try {
        setIsLoading(true);
        const goals = await loadData('definirmeta');
        setSavedGoals(Array.isArray(goals) ? goals : []);
      } catch (error) {
        console.error('Erro ao carregar metas:', error);
        // Replace Toast with console error or another feedback method
        alert('Erro: Não foi possível carregar as metas.');
      } finally {
        setIsLoading(false);
      }
    };

    loadGoals();
  }, []);

  const validateInputs = () => {
    const finalCategory = isCustomCategory ? customCategory : goalCategory;
    if (!goalDescription.trim() || !finalCategory.trim()) {
      // Replace Toast with console error or another feedback method
      alert('Erro: Descrição e Categoria são obrigatórios.');
      return false;
    }
    if (isNaN(goalValue) || isNaN(goalTargetValue) || goalTargetValue <= 0) {
      // Replace Toast with console error or another feedback method
      alert('Erro: Valores devem ser numéricos e a meta deve ser maior que 0.');
      return false;
    }
    return true;
  };

  const saveGoal = async () => {
    if (!validateInputs()) return;

    const finalCategory = isCustomCategory ? customCategory : goalCategory;

    const newGoal = {
      id: editingIndex !== null ? savedGoals[editingIndex].id : Date.now(),
      categoria: finalCategory,
      valor_meta: parseFloat(goalTargetValue),
      valor_atingido: parseFloat(goalValue),
      descricao: goalDescription,
    };

    try {
      setIsLoading(true);
      if (editingIndex !== null) {
        await modifyData('definirmeta', newGoal, 'update', newGoal.id);
      } else {
        await modifyData('definirmeta', newGoal, 'insert');
      }
      const updatedGoals = await loadData('definirmeta');
      setSavedGoals(Array.isArray(updatedGoals) ? updatedGoals : []);
      resetForm();
      // Replace Toast with success message or another feedback method
      alert('Sucesso: Meta salva com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar meta:', error);
      // Replace Toast with error message or another feedback method
      alert('Erro: Houve um problema ao salvar a meta.');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteGoal = async (index) => {
    try {
      setIsLoading(true);
      const goalId = savedGoals[index].id;
      await modifyData('definirmeta', {}, 'delete', goalId);
      const updatedGoals = await loadData('definirmeta');
      setSavedGoals(Array.isArray(updatedGoals) ? updatedGoals : []);
      // Replace Toast with success message or another feedback method
      alert('Sucesso: Meta excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir meta:', error);
      // Replace Toast with error message or another feedback method
      alert('Erro: Houve um problema ao excluir a meta.');
    } finally {
      setIsLoading(false);
    }
  };

  const editGoal = (index) => {
    const goal = savedGoals[index];
    setGoalDescription(goal.descricao);
    setGoalCategory(goal.categoria);
    setGoalValue(goal.valor_atingido.toString());
    setGoalTargetValue(goal.valor_meta.toString());
    setEditingIndex(index);
    setIsCustomCategory(goal.categoria === 'Outros');
    setCustomCategory(goal.categoria === 'Outros' ? goal.categoria : '');
  };

  const resetForm = () => {
    setGoalDescription('');
    setGoalCategory('');
    setCustomCategory('');
    setGoalValue('');
    setGoalTargetValue('');
    setEditingIndex(null);
    setIsCustomCategory(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Definir Meta do Mês</Text>

          <TextInput
            style={styles.input}
            placeholder="Descrição da meta"
            value={goalDescription}
            onChangeText={setGoalDescription}
          />

          <Picker
            selectedValue={goalCategory}
            onValueChange={(itemValue) => {
              setGoalCategory(itemValue);
              setIsCustomCategory(itemValue === 'Outros');
            }}
            style={styles.input}
          >
            <Picker.Item label="Selecione uma categoria" value="" />
            <Picker.Item label="Compras" value="Compras" />
            <Picker.Item label="Estudos" value="Estudos" />
            <Picker.Item label="Alimentação" value="Alimentação" />
            <Picker.Item label="Viagem" value="Viagem" />
            <Picker.Item label="Outros" value="Outros" />
          </Picker>

          {isCustomCategory && (
            <TextInput
              style={styles.input}
              placeholder="Digite a categoria"
              value={customCategory}
              onChangeText={setCustomCategory}
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Valor atual da meta"
            value={goalValue}
            onChangeText={setGoalValue}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Valor a ser atingido"
            value={goalTargetValue}
            onChangeText={setGoalTargetValue}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.saveButton} onPress={saveGoal}>
            <Text style={styles.saveButtonText}>
              {editingIndex !== null ? 'Editar Meta' : 'Salvar Meta'}
            </Text>
          </TouchableOpacity>

          {isLoading && <ActivityIndicator size="large" color="#4CAF50" />}

          {savedGoals.length > 0 && (
            <View style={styles.savedGoalsContainer}>
              <Text style={styles.savedGoalsTitle}>Metas Salvas</Text>
              {savedGoals.map((goal, index) => {
                const progress = parseFloat(
                  Math.min(Math.max(goal.valor_atingido / goal.valor_meta, 0), 1).toFixed(2)
                );

                return (
                  <View key={goal.id || index} style={styles.savedGoalItem}>
                    <Text>{goal.descricao || 'Descrição não disponível'}</Text>
                    <Text>Categoria: {goal.categoria || 'Sem categoria'}</Text>
                    <Text>Meta: {goal.valor_meta}</Text>
                    <Text>Atingido: {goal.valor_atingido}</Text>
                    <ProgressBar
                      progress={progress}
                      color="#4CAF50"
                      style={styles.progressBar}
                    />
                    <Text style={styles.progressText}>
                      {Math.round(progress * 100)}% concluído
                    </Text>
                    <View style={styles.buttonRow}>
                      <TouchableOpacity onPress={() => editGoal(index)}>
                        <Text style={styles.editButton}>Editar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => deleteGoal(index)}>
                        <Text style={styles.deleteButton}>Excluir</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  savedGoalsContainer: {
    width: '100%',
    marginTop: 16,
  },
  savedGoalsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  savedGoalItem: {
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  progressBar: {
    height: 10,
    borderRadius: 8,
    marginVertical: 8,
  },
  progressText: {
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  editButton: {
    color: '#FFA500',
    fontWeight: 'bold',
  },
  deleteButton: {
    color: '#FF0000',
    fontWeight: 'bold',
  },
});

export default DefinirMetaScreen;
