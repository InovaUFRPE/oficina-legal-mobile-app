import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions, Image } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import { contains } from '../SearchConfig'
import Icon from 'react-native-vector-icons/Ionicons'
import _ from 'lodash'
import axios from 'axios';
import { getApiUrl } from '../../service/api'
import defaultStyle from '../styles/Default'
const baseURL = getApiUrl();
const { width, height } = Dimensions.get('window')


export default class TypeProblem extends Component {
    state = {
        region: null,
        loading: false,
        data: [{}],
        error: null,
        query: "",
        fullData: [],

        isFilterModalVisible: false,
        agendamentoMarcado: false,
    }

    componentDidMount() {
        this.makeRemoteRequest();
        /* Colocar a função de checagem se o usuario tem algum agendamento marcado

            isAgendamentoMarcado retornar True
            ? this.setState({agendamentoMarcado: true})
            : null
        
        */
    }

    makeRemoteRequest = async () => {
        this.setState({ loading: true });
        console.log('Loading: ', this.state.loading)

        await axios.get(`${baseURL}/api/servico/oficina/${this.props.navigation.getParam('oficina', 0)}`)
            .then(problems => {
                this.setState({
                    loading: false,
                    data: problems.data,
                    fullData: problems
                });
            })
            .catch(error => {
                this.setState({ error, loading: false })
            })
    }

    removeAcento = () => {
        text = text.toLowerCase();
        text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
        text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
        text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
        text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
        text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
        text = text.replace(new RegExp('[Ç]', 'gi'), 'c');
        return text;
    }

    handlerSearch = (text) => {
        const formatQuery = text
        console.log(text)
        const data = _.filter(this.state.fullData, user => {
            return contains(user, formatQuery)
        })
        this.setState({ query: formatQuery, data }, () => this.makeRemoteRequest())
    }

    toggleModal = () => {
        this.setState({ isFilterModalVisible: !this.state.isFilterModalVisible })
    }

    RenderItem = (obj) => {
        const object = obj.item
        const name = object.nomeServico
        const id = object.id
        const formatedName = name/* .charAt(0).toUpperCase() + name.slice(1); */
        const price = object.preco
        const time = object.tempoRealizacao

        return (
            <TouchableOpacity

                onPress={() => {this.props.navigation.navigate('Agendamento', {
                    idProb: id,
                    nomeServico: formatedName,
                    preco: price,
                    tempoRealizacao: time
                })}}


                style={styles.workShopComponent}>
                <View style={{ flexDirection: 'row', marginLeft: 15, alignItems: 'center' }}>
                    <View style={{ backgroundColor: defaultStyle.colors.primaryColor, width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
                        <Icon
                            name='ios-settings'
                            size={20}
                            color='#fff'
                        />
                    </View>

                    <View style={{ marginLeft: 10 }}>
                        <Text>{formatedName}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon
                                name="md-time"
                                size={15}
                            />
                            <Text style={{ marginLeft: 5 }}>{time}</Text>
                        </View>


                    </View>
                </View>
                <View style={{ marginRight: 15 }}>
                    <Text style={{ fontSize: 15 }}>R$ {price}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <View
                style={{ width: width, backgroundColor: '#fff', alignItems: 'center', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.searchContainer}>
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
                                        style={{ color: '#0d47a1', paddingRight: 15 }}
                                    />
                                </TouchableOpacity>
                                :
                                null
                        }
                    </View>
                </View>
                <FlatList
                    data={this.state.data}
                    keyExtractor={item => `${item.id}`}
                    renderItem={this.RenderItem}
                    showsVerticalScrollIndicator={false}
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

    workShopComponent: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 5,
        height: 60,
        width: width - 20,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },

    searchContainer: {
        marginLeft: 20,
        marginVertical: 10,
        flexDirection: 'row',
        backgroundColor: '#f1f2f6',
        borderRadius: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width - 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },

    menuIcon: {
        position: 'absolute',
        paddingLeft: 20
    },

    logo: {
        width: 50,
        height: 50,
        marginRight: 10
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
    },


})