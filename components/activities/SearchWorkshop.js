import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, Text, View, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { createStackNavigator } from 'react-navigation'
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons'
import { SearchBar } from 'react-native-elements'
import { getUsers, contains } from '../SearchConfig'
import Data from '../users'
import _ from 'lodash'

import WorkShopLayout from './WorkShopLayout'
import Agendamento from './Agendamento'

//<Text style={{ fontSize: 20, color: 'white' }}>{obj.item.name.first.toUpperCase()}</Text>

const { width, height } = Dimensions.get('window')

export default class SearchWorkshop extends Component {
    state = {
        loading: false,
        data: Data,
        error: null,
        query: "",
        fullData: [],
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = _.debounce(() => {
        this.setState({ loading: true });

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
    }, 150)

    RenderItem = (obj) => {
        return (
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('WorkShopLayout') }} style={{ backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', marginTop: 10, height: 100, width: width - 40, borderRadius: 5 }}>
                <View style={{ width: '30%', height: 100, borderRightWidth: 0.2 }}>

                </View>
                <View style={{ width: '70%', height: 100 }}>
                    <View style={{ marginTop: 10, marginLeft: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{obj.item.name.first.toUpperCase()}</Text>
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
                            color='yellow'
                            style={{ marginBottom: 4 }}
                        />
                        <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>{obj.item.especialidade}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }




    handlerSearch = (text) => {
        const formatQuery = text
        const data = _.filter(this.state.fullData, user => {
            return contains(user, formatQuery)
        })
        this.setState({ query: formatQuery, data }, () => this.makeRemoteRequest())
    }

    renderSeparator = () => {
        return (
            <View style={{
                height: 1,
                width: '86%',
                backgroundColor: "black",
                marginLeft: "14%"
            }}>
            </View>
        )
    }

    renderHeader = () => {
        return <SearchBar
            inputStyle={{ color: 'black' }}
            placeholderTextColor='black'
            placeholder="Pesquise aqui.."
            containerStyle={{ backgroundColor: '#fff', borderRadius: 15 }}
            inputContainerStyle={{ backgroundColor: 'white' }}
            value={this.state.query}
            onChangeText={this.handlerSearch}
            round
        />



    }

    renderFooter = () => {
        if (!this.state.loading) return null;

        return (
            <View style={{ paddingVertical: 20, borderTopWidth: 1 }}>
                <ActivityIndicator animating size="large" />
            </View>
        )
    }
    render() {
        return (

            <View
                style={{ flex: 1, alignItems: 'center' }}>
                <FlatList
                    data={this.state.data}
                    keyExtractor={item => `${item.id}`}
                    renderItem={this.RenderItem}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    headerContainer: {
        width: '100%',
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0d47a1'
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },

    cell: {
        margin: 5,
        marginHorizontal: 10,
        borderRadius: 10
    },

    workContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 20,
        height: 80

    },
    workText: {
        fontSize: 20,
    },
    menuIcon: {
        position: 'relative',
        color: 'white',
        height: 40,
        width: 40,
        justifyContent: 'center',
    },

    searchInput: {
        borderWidth: 1,
        borderColor: 'white',
        width: '100%',
        height: 50,
        marginVertical: 10,
        color: 'black',
        backgroundColor: 'white'
    }
})

export const SearchWorkShopNavigation = createStackNavigator({
    SearchWorkshop: {
        screen: SearchWorkshop,
        navigationOptions: {
            headerTintColor: '#eee1d6',
            headerTransparent: 'true'
        }
    },

    WorkShopLayout: {
        screen: WorkShopLayout,
        navigationOptions: {
            headerTintColor: '#eee1d6',
            headerTransparent: 'true'
        }
    },

    Agendamento: {
        screen: Agendamento,
        navigationOptions: {
            headerTransparent: 'true',
            headerTintColor: '#2250d9'
        }
    }
})