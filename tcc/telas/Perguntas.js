import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Platform } from 'react-native';

const BasicQuestionsScreen = ({ navigation }) => {
  const [responses, setResponses] = useState({});

  // Lista de perguntas
  const questions = [
    { id: '1', text: 'Mora sozinho?' },
    { id: '2', text: 'Conhece algo sobre financeiro?' },
    { id: '3', text: 'Trabalha atualmente?' },
    { id: '4', text: 'Possui alguma renda fixa?' },
    { id: '5', text: 'Possui algum tipo de investimento?' },
    { id: '6', text: 'Tem dependentes financeiros?' },
    { id: '7', text: 'Sabe fazer um planejamento financeiro?' },
    { id: '8', text: 'Está satisfeito com sua situação financeira atual?' },
    { id: '9', text: 'Tem alguma reserva de emergência?' },
    { id: '10', text: 'Gosta de aprender sobre educação financeira?' },
  ];

  // Função para lidar com respostas
  const handleResponse = (questionId, answer) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: answer,
    }));
  };

  // Botão para pular perguntas
  const handleSkip = () => {
    navigation.navigate('Menu');
  };

  // Botão para seguir após responder perguntas
  const handleFollow = () => {
    const unansweredQuestions = questions.filter(
      (question) => !responses[question.id]
    );

    if (unansweredQuestions.length > 0) {
      const unansweredTexts = unansweredQuestions.map((q) => q.text).join(', ');
      showAlert('Perguntas não respondidas', `Responda: ${unansweredTexts}`);
    } else {
      navigation.navigate('Menu');
    }
  };

  // Função para mostrar alerta
  const showAlert = (title, message) => {
    if (Platform.OS !== 'web') {
      Alert.alert(title, message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perguntas Básicas</Text>
      <FlatList
        data={questions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{item.text}</Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  responses[item.id] === 'Sim' && styles.selectedOption,
                ]}
                onPress={() => handleResponse(item.id, 'Sim')}
              >
                <Text style={styles.optionText}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  responses[item.id] === 'Não' && styles.selectedOption,
                ]}
                onPress={() => handleResponse(item.id, 'Não')}
              >
                <Text style={styles.optionText}>Não</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipButtonText}>Pular perguntas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.followButton} onPress={handleFollow}>
        <Text style={styles.followButtonText}>Seguir</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4a004d',
    textAlign: 'center',
  },
  questionContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
  selectedOption: {
    backgroundColor: '#6a0dad',
  },
  optionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  skipButton: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#6a0dad',
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  followButton: {
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#6a0dad',
    alignItems: 'center',
  },
  followButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default BasicQuestionsScreen;
