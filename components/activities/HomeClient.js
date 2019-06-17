import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions, Image, Alert } from 'react-native'
import { FloatingAction } from "react-native-floating-action"
import { FlatList } from 'react-native-gesture-handler';
import { getUsers, contains } from '../SearchConfig'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwersome from 'react-native-vector-icons/FontAwesome'

import _ from 'lodash'

const { width, height } = Dimensions.get('window')

const actions = [
    {
        text: "Meus Agendamento",
        icon: require('../../images/calendarIcon.png'),
        name: 'bt_addcar',
        position: 1
    }
]

export default class HomeClient extends Component {

    state = {
        loading: false,
        data: [],
        error: null,
        query: "",
        fullData: [],

        isFilterModalVisible: false,

        agendamentoMarcado: false,
        isAgendamentoModalVisible: false
    }

    componentDidMount() {
        this.makeRemoteRequest();
        /* Colocar a função de checagem se o usuario tem algum agendamento marcado

            isAgendamentoMarcado retornar True
            ? this.setState({agendamentoMarcado: true})
            : null
        
        */
    }

    makeRemoteRequest = () => {
        this.setState({ loading: true });
        console.log(this.state.loading)

        getUsers(20, this.state.query)
            .then(users => {
                this.setState({
                    loading: false,
                    data: users,
                    fullData: users
                });
            })
            .catch(error => {
                this.setState({ error, loading: false })
            })
    }


    handlerSearch = (text) => {
        const formatQuery = text
        const data = _.filter(this.state.fullData, user => {
            return contains(user, formatQuery)
        })
        this.setState({ query: formatQuery, data }, () => this.makeRemoteRequest())
    }

    toggleModal = () => {
        this.setState({ isFilterModalVisible: !this.state.isFilterModalVisible })
    }

    toggleModalAgendamento = () => {
        this.setState({ isAgendamentoModalVisible: !this.state.isAgendamentoModalVisible })
        console.log('Chamou a função Toggle')
    }



    floatingButtonPress = () => {
        if (this.state.agendamentoMarcado) {
            Alert.alert(
                'Oficina Do Manoel',
                'Endereço: Rua da Aurora \nData: 05/02/20\nHora: 14:00',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            );
        } else {
            Snackbar.show({
                title: 'Você ainda não tem nenhum agendamento marcado',
                duration: Snackbar.LENGTH_LONG,
            });
        }
    }

    RenderItem = (obj) => {
        const object = obj.item

        const name = object.name.first
        const formatedName = name.charAt(0).toUpperCase() + name.slice(1);
        const especialidade = object.especialidade
        const formatedEspecialidade = especialidade.charAt(0).toUpperCase() + especialidade.slice(1)
        const likes = object.likes
        const logo = object.logo
        const distance = object.distance

        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('WorkShopLayout', {
                        name: formatedName,
                        distance: distance,
                        likes: likes
                    })
                }}
                style={{ backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', marginTop: 10, height: 100, width: width - 40, borderRadius: 5 }}>


                <View style={{ width: '30%', height: 100, borderWidth: 0.2, borderRadius: 5 }}>

                    <Image source={{ uri: logo }}
                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }} />
                </View>
                <View style={{ width: '70%', height: 100 }}>
                    <View style={{ marginTop: 10, marginLeft: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Oficina {formatedName}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon
                                name="md-thumbs-up"
                                size={13}
                                style={{ marginTop: 3 }}

                            />
                            <Text style={{ marginLeft: 3 }}>{likes}</Text>

                            <Icon
                                name="md-navigate"
                                size={15}
                                style={{ marginTop: 2, marginLeft: 10 }}
                            />
                            <Text style={{ marginLeft: 3 }}>{distance} KM</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 10, marginLeft: 10, flexDirection: 'row' }}>
                        <Icon
                            name="md-star"
                            size={20}
                            color='#0d47a1'
                            style={{ marginBottom: 4 }}
                        />
                        <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>{formatedEspecialidade}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (

            <View
                style={{ flex: 1, alignItems: 'center' }}>

                <View style={{ flexDirection: 'row', width: width, backgroundColor: '#0d47a1', justifyContent: 'space-between', alignItems: 'center' }}>
                    <FontAwersome
                        name="bars"
                        size={30}
                        style={{ padding: 15, color: '#fff' }}
                        onPress={() => this.props.navigation.toggleDrawer()}
                    />
                    <View>
                        <Text style={{ padding: 15, fontSize: 25, color: '#fff', fontWeight: 'bold' }}>Oficina legal</Text>
                    </View>

                    <Image
                        source={require('../../images/LogoBranca.png')}
                        style={styles.logo}
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginLeft: 20, marginVertical: 10, flexDirection: 'row', backgroundColor: '#f1f2f6', borderRadius: 5, justifyContent: 'space-between', alignItems: 'center', width: width - 100 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Icon
                                name="md-search"
                                size={30}
                                style={{ padding: 10, color: '#0d47a1', marginLeft: 10 }}
                            />
                            <TextInput style={styles.input}
                                placeholder="Pesquisar"
                                value={this.state.query}
                                autoCapitalize='none'
                                autoCorrect={false}
                                onChangeText={this.handlerSearch} />
                        </View>


                        { //Condicionador de render do "X" para apagar o campo de pesquisa
                            this.state.query !== ''
                                ?
                                <TouchableOpacity onPress={() => this.handlerSearch('')}>
                                    <Icon
                                        name="md-close"
                                        size={20}
                                        style={{ color: '#0d47a1', marginRight: 10 }}
                                    />
                                </TouchableOpacity>
                                :
                                null
                        }

                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={{ padding: 20 }} onPress={this.toggleModal}>
                            <Text style={{ color: '#0d47a1', fontSize: 15 }}>Filtros</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Modal
                    onBackButtonPress={this.toggleModal}
                    onBackdropPress={this.toggleModal}
                    animationIn='zoomIn'
                    animationOut='zoomOut'
                    isVisible={this.state.isFilterModalVisible}
                >
                    <View style={{ backgroundColor: '#fff', justifyContent: 'center', borderRadius: 5, width: width - 40 }}>
                        <View style={{ marginBottom: 20 }}>
                            <View style={{ backgroundColor: '#0d47a1', padding: 10, width: '100%' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#fff' }}>Filtrar Busca</Text>
                            </View>
                            <Text style={{ color: '#0d47a1', marginTop: 10, marginLeft: 10 }}>Especialidade</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
                                <TouchableOpacity
                                    style={styles.filterButton}
                                    onPress={() => { this.handlerSearch('mecanica'); this.setState({ isFilterModalVisible: !this.state.isFilterModalVisible }) }}>
                                    <Text style={styles.filterButtonText}>Mecanica</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.filterButton}
                                    onPress={() => { this.handlerSearch('eletrica'); this.setState({ isFilterModalVisible: !this.state.isFilterModalVisible }) }}>
                                    <Text style={styles.filterButtonText}>Eletrica</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.filterButton}
                                    onPress={() => { this.handlerSearch('funilaria'); this.setState({ isFilterModalVisible: !this.state.isFilterModalVisible }) }}>
                                    <Text style={styles.filterButtonText}>Funilaria</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>


                <FlatList
                    data={this.state.data}
                    keyExtractor={item => `${item.id}`}
                    renderItem={this.RenderItem}
                    ListFooterComponent={this.renderFooter}
                    showsVerticalScrollIndicator={false}
                />

                <FloatingAction
                    actions={actions}
                    position='right'
                    overlayColor='trasparent'
                    onPressItem={
                        this.floatingButtonPress
                    }
                    
                />
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 70,
        backgroundColor: 'white'
    },

    menuIcon: {
        position: 'absolute',
        paddingLeft: 20
    },

    logo: {
        width: 50,
        height: 50,
        marginRight: 5
    },

    input: {
        borderRadius: 5,
        alignSelf: 'stretch',
        fontSize: 16,
        paddingVertical: 10,
        width: '75%'
    },

    filterButton: {
        padding: 10,
        borderWidth: 0.5,
        borderRadius: 5
    },

    filterButtonText: {
        fontSize: 15,
        color: 'black'
    }

})