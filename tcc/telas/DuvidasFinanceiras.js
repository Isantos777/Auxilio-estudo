import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const categories = {
  "Auxílio Estudantil": [
    { question: 'O que é auxílio estudantil?', answer: 'O auxílio estudantil é uma forma de apoio financeiro que ajuda estudantes a cobrir custos relacionados à educação, como mensalidades, livros e transporte.' },
    { question: 'Quem pode solicitar auxílio estudantil?', answer: 'Geralmente, estudantes de baixa renda, matriculados em instituições de ensino superior ou técnico, podem solicitar.' },
    { question: 'Como faço para solicitar o auxílio estudantil?', answer: 'Normalmente, você deve se inscrever através da instituição de ensino, preenchendo um formulário e apresentando documentos que comprovem sua situação financeira.' },
    { question: 'Qual é a diferença entre bolsa e auxílio?', answer: 'A bolsa é um apoio financeiro que pode ser dado com base em mérito acadêmico, enquanto o auxílio é geralmente destinado a ajudar a cobrir despesas básicas.' },
    { question: 'O auxílio estudantil é cumulativo com outros benefícios?', answer: 'Depende da instituição e das políticas locais. Verifique as regras da sua instituição.' },
  ],
  "Orçamento e Gestão Financeira": [
    { question: 'Como posso gerenciar meu dinheiro enquanto recebo auxílio?', answer: 'Crie um orçamento mensal, priorizando despesas essenciais, e evite gastos desnecessários.' },
    { question: 'O que é um orçamento?', answer: 'Um orçamento é um plano financeiro que ajuda a gerenciar receitas e despesas, garantindo que você não gaste mais do que ganha.' },
    { question: 'Como posso economizar dinheiro enquanto estudo?', answer: 'Você pode economizar fazendo compras inteligentes, evitando dívidas, e utilizando transporte público.' },
    { question: 'O que é um fundo de emergência?', answer: 'Um fundo de emergência é uma reserva de dinheiro para cobrir despesas inesperadas, como contas médicas ou reparos.' },
    { question: 'Como posso começar a investir?', answer: 'Pesquise sobre opções de investimento, comece com pequenos valores e considere usar uma conta de corretora.' },
  ],
  "Empréstimos e Crédito": [
    { question: 'O que é um empréstimo estudantil?', answer: 'Um empréstimo estudantil é um valor emprestado para cobrir despesas educacionais, que deve ser pago após a conclusão do curso.' },
    { question: 'Como funcionam os juros compostos?', answer: 'Juros compostos são os juros calculados sobre o valor principal e também sobre os juros acumulados de períodos anteriores.' },
    { question: 'O que é um cartão de crédito?', answer: 'Um cartão de crédito permite que você faça compras com um limite de crédito, que deve ser pago posteriormente, muitas vezes com juros.' },
    { question: 'Como funciona o pagamento de faturas de cartão de crédito?', answer: 'Você deve pagar pelo menos o valor mínimo da fatura na data de vencimento para evitar juros e multas.' },
  ],
  "Investimentos e Educação Financeira": [
    { question: 'O que é educação financeira?', answer: 'Educação financeira é o conhecimento sobre como gerenciar dinheiro, poupança, investimentos e planejamento financeiro.' },
    { question: 'Como os juros afetam empréstimos estudantis?', answer: 'Juros podem aumentar o total que você pagará ao longo do tempo, portanto, é essencial entender como eles funcionam antes de pegar um empréstimo.' },
    { question: 'Quais são as despesas mais comuns para estudantes?', answer: 'Mensalidades, livros, transporte, alimentação e moradia são algumas das despesas mais comuns.' },
    { question: 'O que são despesas fixas e variáveis?', answer: 'Despesas fixas são aquelas que não mudam de mês para mês, como aluguel, enquanto despesas variáveis podem mudar, como alimentação.' },
  ],
};
const FinancialQuestionsScreen = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedIndex, setExpandedIndex] = useState(null);

    const filteredFaqs = Object.keys(categories).reduce((acc, category) => {
        const filteredQuestions = categories[category].filter(faq =>
            faq.question.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filteredQuestions.length > 0) {
            acc[category] = filteredQuestions;
        }
        return acc;
    }, {});

    const toggleAnswer = (category, index) => {
        setExpandedIndex(expandedIndex === `${category}-${index}` ? null : `${category}-${index}`);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Pesquise uma pergunta..."
                value={searchTerm}
                onChangeText={setSearchTerm}
            />

            <FlatList
                data={Object.keys(filteredFaqs)}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item: category }) => (
                    <View style={styles.categoryContainer}>
                        <Text style={styles.categoryTitle}>{category}</Text>
                        <FlatList
                            data={filteredFaqs[category]}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                <View style={styles.faqContainer}>
                                    <TouchableOpacity onPress={() => toggleAnswer(category, index)} style={styles.questionContainer}>
                                        <Icon name="question-answer" size={24} color="#6A1B9A" />
                                        <Text style={styles.question}>{item.question}</Text>
                                    </TouchableOpacity>
                                    {expandedIndex === `${category}-${index}` && (
                                        <Text style={styles.answer}>{item.answer}</Text>
                                    )}
                                </View>
                            )}
                        />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    categoryContainer: {
        marginBottom: 20,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#6A1B9A',
        marginBottom: 10,
    },
    faqContainer: {
        marginBottom: 10,
    },
    questionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    question: {
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 10,
    },
    answer: {
        marginTop: 5,
        fontSize: 14,
        color: '#555',
    },
});

export default FinancialQuestionsScreen;