import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, FlatList } from 'react-native'
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
        date: this.props.navigation.getParam('date', ''),

        isFilterModalVisible: false,
        agendamentoMarcado: false,
    }

    componentDidMount() {
        this.makeRemoteRequest();
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
                onPress={() => {
                    this.props.navigation.navigate('Agendamento', {
                        idProb: id,
                        nomeServico: formatedName,
                        preco: price,
                        tempoRealizacao: time,
                        date: this.state.date
                    })
                }}

                style={styles.workShopComponent}>
                <View style={{ flexDirection: 'row', marginLeft: 15, alignItems: 'center', width: '75%' }}>
                    <View style={{ backgroundColor: defaultStyle.colors.primaryColor, width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
                        <Icon
                            name='ios-settings'
                            size={20}
                            color='#fff'
                        />
                    </View>

                    <View style={{ marginLeft: 10, width: '70%' }}>
                        <Text style={{ color: 'black', fontSize: 16 }}>{formatedName}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon
                                name="md-time"
                                size={15}
                                color={defaultStyle.colors.primaryColor}
                            />
                            <Text style={{ marginLeft: 5 }}>{time}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ width: '20%'}}>
                    <Text style={{ fontSize: 16, fontFamily: 'Robot-Light', letterSpacing: 1, color: 'black' }}>R$ {price}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <View
                style={styles.container}>
                <View style={{ width: '100%', height: '20%', backgroundColor: defaultStyle.colors.primaryColor, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('Agendamento')
                        }}
                        style={{ padding: 15, position: 'absolute', top: 0, left: 0 }}>
                        <Icon
                            name='ios-arrow-back'
                            size={25}
                            color='#fff'
                        />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'Roboto-Light', color: '#fff', fontSize: 25, letterSpacing: 2 }}>SERVIÇOS DA OFICINA</Text>
                </View>
                <View style={styles.servicesContainer}>
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
                    {this.state.loading === true
                        ?
                        <View style={{ width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size="small" color={defaultStyle.colors.primaryColor} />
                        </View>

                        :
                        <FlatList
                            data={this.state.data}
                            keyExtractor={item => `${item.id}`}
                            renderItem={this.RenderItem}
                            showsVerticalScrollIndicator={false}
                            style={{ marginBottom: 30 }}
                        />
                    }
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: defaultStyle.colors.primaryColor,
        alignItems: 'center',

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
        marginVertical: 5,
        justifyContent: 'flex-start',
        height: 80,
        width: width - 20,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
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

    servicesContainer: {
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    }


})