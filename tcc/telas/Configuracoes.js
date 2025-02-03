import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Switch, Button, TextInput, ScrollView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Contexto para gerenciar o tema escuro globalmente
const ThemeContext = React.createContext();

export const useTheme = () => useContext(ThemeContext);

export default function Configuracoes() {
    const [fonteGrande, setFonteGrande] = useState(false);
    const [relatorio, setRelatorio] = useState('');
    const [modalVisible, setModalVisible] = useState(false); // Controla a visibilidade do modal
    const navigation = useNavigation();
    const { temaEscuro, setTemaEscuro } = useTheme(); // Tema escuro via contexto

    const toggleTema = () => setTemaEscuro(!temaEscuro);
    const toggleFonte = () => setFonteGrande(!fonteGrande);

    const sairDaConta = () => {
        setModalVisible(true); // Exibe o modal de confirmação
    };

    const confirmarSair = () => {
        // Redefine a navegação e leva à tela de login
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }], // Certifique-se que o nome da rota é 'Login'
        });
        setModalVisible(false); // Fecha o modal
    };

    const cancelarSair = () => {
        setModalVisible(false); // Fecha o modal
    };

    const enviarRelatorio = () => {
        if (relatorio.trim()) {
            alert('Relatório Enviado: Obrigado pelo seu feedback!');
            setRelatorio('');
        } else {
            alert('Erro: Por favor, escreva seu relatório antes de enviar.');
        }
    };

    const estilosAtuais = temaEscuro ? styles.darkTheme : styles.lightTheme;
    const tamanhoFonte = fonteGrande ? styles.largeText : styles.normalText;

    return (
        <ScrollView style={[styles.container, estilosAtuais]}>
            <Text style={[styles.title, tamanhoFonte]}>Configurações de Acessibilidade</Text>

            <View style={styles.switchContainer}>
                <Text style={[styles.label, tamanhoFonte]}>Tema Escuro</Text>
                <Switch value={temaEscuro} onValueChange={toggleTema} />
            </View>

            <View style={styles.switchContainer}>
                <Text style={[styles.label, tamanhoFonte]}>Fonte Grande</Text>
                <Switch value={fonteGrande} onValueChange={toggleFonte} />
            </View>

            {/* Campo para relatório */}
            <View style={styles.reportContainer}>
                <Text style={[styles.label, tamanhoFonte]}>O que você achou do app?</Text>
                <TextInput
                    style={[styles.textInput, tamanhoFonte]}
                    placeholder="Escreva seu relatório aqui..."
                    multiline
                    numberOfLines={4}
                    value={relatorio}
                    onChangeText={setRelatorio}
                />
                <Button title="Enviar Relatório" onPress={enviarRelatorio} color="#6A1B9A" />
            </View>

            {/* Botão de Sair da Conta */}
            <Button title="Sair da Conta" onPress={sairDaConta} color="#6A1B9A" />

            {/* Modal de Confirmação */}
            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={cancelarSair}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Você tem certeza que deseja sair?</Text>
                        <View style={styles.modalButtons}>
                            <Button title="Não" onPress={cancelarSair} color="#6A1B9A" />
                            <Button title="Sim" onPress={confirmarSair} color="#6A1B9A" />
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Informações de Suporte */}
            <View style={styles.supportContainer}>
                <Text style={[styles.label, tamanhoFonte]}>Precisa de ajuda?</Text>
                <Text style={[styles.supportText, tamanhoFonte]}>Email: suporte@meuapp.com</Text>
                <Text style={[styles.supportText, tamanhoFonte]}>Telefone: (11) 98765-4321</Text>
            </View>
        </ScrollView>
    );
}

// Componente Contexto para tema escuro
export function ThemeProvider({ children }) {
    const [temaEscuro, setTemaEscuro] = useState(false);
    return (
        <ThemeContext.Provider value={{ temaEscuro, setTemaEscuro }}>
            {children}
        </ThemeContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#6A1B9A',
    },
    label: {
        fontSize: 18,
    },
    normalText: {
        fontSize: 18,
    },
    largeText: {
        fontSize: 22,
    },
    lightTheme: {
        backgroundColor: '#f7f7f7',
        color: '#000',
    },
    darkTheme: {
        backgroundColor: '#333',
        color: '#fff',
    },
    reportContainer: {
        marginVertical: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
    },
    textInput: {
        height: 100,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    supportContainer: {
        marginTop: 30,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
    },
    supportText: {
        fontSize: 16,
        marginBottom: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
});
