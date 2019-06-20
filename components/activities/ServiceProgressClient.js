import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import Task from '../TaskServicesClient'
import Icon from 'react-native-vector-icons/Ionicons'
import defaultStyle from '../styles/Default'
import LinearGradient from 'react-native-linear-gradient'


export default class ServiceProgressClient extends Component {
    state = {
        tasks: [
            { id: Math.random(), serviceName: "Troca de Pneu", date: "03/26/19", isDone: "concluido" },
            { id: Math.random(), serviceName: "Troca de Óleo", date: "03/26/19", isDone: "concluido" },
            { id: Math.random(), serviceName: "Pintura do capô", date: "03/26/19", isDone: "concluido" },
            { id: Math.random(), serviceName: "Troca da maçaneta", date: "03/26/19", isDone: "pendente" },
            { id: Math.random(), serviceName: "Suspensão", date: "03/26/19", isDone: "pendente" },
            { id: Math.random(), serviceName: "Ar-condicionado", date: "03/26/19", isDone: "pendente" },
            { id: Math.random(), serviceName: "Jante Dianteira", date: "03/26/19", isDone: "pendente" },
            { id: Math.random(), serviceName: "Jante Dianteira", date: "03/26/19", isDone: "pendente" },
            { id: Math.random(), serviceName: "Jante Dianteira", date: "03/26/19", isDone: "pendente" },
            { id: Math.random(), serviceName: "Jante Dianteira", date: "03/26/19", isDone: "pendente" },
        ],

        isOS_Making: true
    }

    componentDidMount() {
        /* Colocar a função de verificação se há alguma OS sendo realiziada

            functio(isOS_Making) retornar True
            ? this.setState({isOS_Making: true})
            : null
        
        */
    }

    /*<Text style={styles.headerInformation}>Oficina_name</Text>
<Text style={[styles.headerInformation, { marginRight: 20 }]}>JKS-2112</Text>*/
    render() {
        return (
            this.state.isOS_Making
                ?
                <View style={styles.container}>
                    <LinearGradient colors={['#3949ab', '#303f9f', '#283593', '#1a237e']} style={styles.header}>
                        <Icon
                            name="md-arrow-back"
                            size={30}
                            color={defaultStyle.colors.textOnPrimary}
                            style={{ padding: 15, position: 'absolute', top: 0, left: 0 }}
                            onPress={() => { this.props.navigation.goBack() }}
                        />
                        <View style={{ justifyContent: 'center', alignItems: 'flex-start', }}>
                            <Text style={{ fontSize: 30, fontFamily: 'roboto', color: defaultStyle.colors.textOnPrimary, textAlign: 'center' }}>PROGRESSO DO SERVIÇO</Text>
                        </View>
                    </LinearGradient>

                    <View style={[styles.servicesContainer, {alignItems: 'center'}]}>
                        <FlatList data={this.state.tasks}
                            keyExtractor={item => `${item.id}`}
                            renderItem={({ item }) => <Task {...item} toggleTask={this.toggleTask} />} 
                            showsVerticalScrollIndicator={false}/>
                    </View>

                </View>
                :
                <View style={styles.container}>
                    <LinearGradient colors={['#3949ab', '#303f9f', '#283593', '#1a237e']} style={styles.header}>
                        <Icon
                            name="md-arrow-back"
                            size={30}
                            color={defaultStyle.colors.textOnPrimary}
                            style={{ padding: 15, position: 'absolute', top: 0, left: 0 }}
                            onPress={() => { this.props.navigation.goBack() }}
                        />
                        <View style={{ justifyContent: 'center', alignItems: 'flex-start', }}>
                            <Text style={{ fontSize: 30, fontFamily: 'roboto', color: defaultStyle.colors.textOnPrimary, }}>Progresso do Serviço</Text>
                        </View>
                    </LinearGradient>

                    <View style={styles.servicesContainer}>
                        <Text style={{ marginTop: 20, marginLeft: 20, fontSize: 25, fontWeight: 'bold' }}>Não há nenhum serviço sendo realizado no momento.</Text>
                    </View>
                </View>
        )
    }
}

const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1a237e'
    },

    header: {
        width: width,
        height: "30%",
        //backgroundColor: defaultStyle.colors.primaryColor,
        justifyContent: 'center',
        alignItems: 'center'
    },

    headerTitle: {
        color: '#fff',
        fontSize: 30,
        marginLeft: 20,
        marginBottom: 20,
        fontFamily: 'roboto'
    },

    headerInformation: {
        color: '#fff',
        fontSize: 20,
        marginLeft: 25,
        marginBottom: 10,
    },

    servicesContainer: {
        width: width,
        height: '70%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: defaultStyle.colors.textOnPrimary
    }
})