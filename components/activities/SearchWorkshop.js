import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { ActivityIndicator ,StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, SafeAreaView, Alert} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {SearchBar} from 'react-native-elements'
import {getUsers, contains} from '../SearchConfig'
import Data from '../users'
import _ from 'lodash'

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
        this.setState({loading: true});

        getUsers(20, this.state.query)
            .then(users => {
                this.setState({
                    loading: false,
                    data: users,
                    fullData: users
                });
            })
            .catch(error => {
                this.setState({error, loading: false})
            })
    }, 150)

    RenderItem(obj){
        return(
            <TouchableOpacity onPress={() => Alert.alert("Informaçoes da Oficina", "Rua: " + obj.item.location.street + "\nCidade: " + obj.item.location.city + "\nContato: " + obj.item.email)} style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10}}>
                <FontAwesome
                    name="wrench"
                    size={50}
                    style={{padding: 5, color: 'lightgray'}}
                />
                <View>
                    <Text style={{fontSize: 20, color: 'white'}}>{obj.item.name.first.toUpperCase() }</Text>
                </View>
                <FontAwesome
                    name="star"
                    size={30}
                    style={{padding: 5}}
                    color="#f6e58d"
                />
            </TouchableOpacity>
        )
    }




    handlerSearch = (text) => {
        const formatQuery = text
        const data = _.filter(this.state.fullData, user => {
            return contains(user, formatQuery)
        })
        this.setState({query: formatQuery, data}, () => this.makeRemoteRequest())
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
        return  <SearchBar 
                    inputStyle={{color:'black'}}
                    placeholderTextColor='black'
                    placeholder="Pesquise aqui.."
                    containerStyle={{backgroundColor: '#2250d9', borderRadius: 15}}
                    inputContainerStyle={{backgroundColor: 'white'}}
                    value={this.state.query} 
                    onChangeText={this.handlerSearch}       
                    round                         
                        />

    }

    renderFooter = () => {
        if (!this.state.loading) return null;

        return(
            <View style={{paddingVertical: 20, borderTopWidth: 1, borderColor: "'#2250d9'",}}>
                <ActivityIndicator animating size="large"/>
            </View>
        )
    }
    render() {
        return (
            <LinearGradient 
                    colors={['#2250d9', '#204ac8', '#1d43b7']} style={{flex: 1}}>
                <View style={styles.headerContainer}>
                    <FontAwesome
                        name="bars"
                        size={30}
                        style={{padding: 20, color: 'white', position: 'absolute', left: 1}}
                        onPress = {() => this.props.navigation.toggleDrawer()}
                    />
                    <Text style={styles.headerTitle}>Buscar Oficina</Text>
                </View>
                <FlatList
                    data={this.state.data}
                    keyExtractor={item => `${item.id}`}
                    renderItem={this.RenderItem}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}
                />
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    
    container:{
        alignItems: 'center',
        justifyContent: 'center'
    },

    headerContainer: {
        width: '100%', 
        height: 70, 
        alignItems: 'center', 
        justifyContent: 'center'},

    headerTitle: {
        fontSize: 20, 
        fontWeight: 'bold', 
        color: 'white'
    },

    cell:{
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
    workText:{
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
        backgroundColor:'white'
    }
})