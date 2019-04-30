import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default class SearchWorkshop extends Component {
    state = {
        empresas: [
            {nome: 'Oficina 4 rodas', id: 1, endereco: 'Rua das amebas, 78'}, 
            {nome: 'Oficina rodaqui', id: 2, endereco: "Rua dos navegantes 598"},
            {nome: 'oficina bateu', id: 3, endereco: "Avenida saibora, 13"},
            {nome: 'oficina nitro', id: 4, endereco: 'Praça Rui Leopoldo S/N'},
            {nome: 'oficina dois irmãos', id: 5, endereco: 'Rua piracora, 59'}
        ],
        cor: '#eee1d6'
    }

    RenderItem(obj){
        return(
            <TouchableOpacity style={[styles.cell, {backgroundColor: '#eee1d6'}]}
            onPress={() => alert(obj.item.endereco)}>
                <Text style={styles.workText}>{obj.item.nome}</Text>
            </TouchableOpacity>
        )
    }

    color(cor){
        if (cor == '#111e29'){
            this.setState = ({
                cor: '#eee1d6'
            })
            return '#eee1d6'
        }
        else{
            this.setState = ({
                cor: '#111e29'
            })
            return '#111e29' 
        }
    }

    render() {
        return (
            <LinearGradient 
                colors={['#2250d9', '#204ac8', '#1d43b7']}
                style = { styles.container }>
                <FontAwesome name="chevron-left" size={20} 
                    color="white" 
                    style={styles.menuIcon}
                    onPress = {() => this.props.navigation.navigate('DrawerNavigatorClient')}/>
                <FlatList data={this.state.empresas} renderItem={this.RenderItem} ></FlatList>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,

        alignItems: 'center',
        justifyContent: 'center'
    },
    cell:{
        paddingLeft: 10,
        top:10,
        paddingTop: 20,
        width: 340,
        marginBottom: 5,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    workText:{
        paddingBottom:20
    },
    menuIcon: {
        left: 5,
        padding: 19

    }

})