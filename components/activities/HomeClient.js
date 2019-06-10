import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions, ActivityIndicator, Image } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import { getUsers, contains } from '../SearchConfig'
import { SearchBar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwersome from 'react-native-vector-icons/FontAwesome'
import Data from '../users'
import _ from 'lodash'

const { width, height } = Dimensions.get('window')

export default class HomeClient extends Component {

    state = {
        loading: false,
        data: [],
        error: null,
        query: "",
        fullData: [],
    }

    componentDidMount() {
        this.makeRemoteRequest();
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

    RenderItem = (obj) => {
        const name = obj.item.name.first
        const formatedName = name.charAt(0).toUpperCase() + name.slice(1);
        const especialidade = obj.item.especialidade
        const formatedEspecialidade = especialidade.charAt(0).toUpperCase() + especialidade.slice(1)
        const logo = obj.item.logo
    
        return (
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('WorkShopLayout') }} style={{ backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', marginTop: 10, height: 100, width: width - 40, borderRadius: 5 }}>
                <View style={{ width: '30%', height: 100, borderWidth: 0.2, borderRadius: 5}}>

                    <Image source={{uri: logo}}
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
                            <Text style={{ marginLeft: 3 }}>{obj.item.likes}</Text>

                            <Icon
                                name="md-navigate"
                                size={15}
                                style={{ marginTop: 2, marginLeft: 10 }}
                            />
                            <Text style={{ marginLeft: 3 }}>1.8 KM</Text>
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
                <View style={{ flexDirection: 'row', width: width, backgroundColor: '#0d47a1', justifyContent: 'space-between', alignItems: 'center'}}>
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
                    <View style={{ marginLeft: 20, marginVertical: 10, flexDirection: 'row', backgroundColor: '#f1f2f6', borderRadius: 5, justifyContent: 'flex-start', alignItems: 'center', width: width - 100 }}>
                        <Icon
                            name="md-search"
                            size={30}
                            style={{ padding: 10, color: '#0d47a1', marginLeft: 20 }}
                        />
                        <TextInput style={styles.input}
                            placeholder="Pesquisar"
                            value={this.state.query}
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={this.handlerSearch} />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={{ padding: 20 }}>
                            <Text style={{ color: '#0d47a1', fontSize: 15 }}>Filtros</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <FlatList
                    data={this.state.data}
                    keyExtractor={item => `${item.id}`}
                    renderItem={this.RenderItem}
                    ListFooterComponent={this.renderFooter}
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

    menuIcon: {
        position: 'absolute',
        paddingLeft: 20
    },

    buttonWorkshop: {
        width: 300,
        height: 380,
        top: 40,
        backgroundColor: 'white',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'center',
    },

    workshop: {
        color: 'black',
        top: 20,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    workshop2: {
        color: 'black',
        top: 150,
        fontSize: 20,
        fontWeight: 'bold'
    },
    workshop3: {
        color: 'black',
        top: 155,
        fontSize: 20,
        fontWeight: 'bold'
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
        paddingVertical: 10
    },

})