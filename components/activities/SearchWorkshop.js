import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default class SearchWorkshop extends Component {
    state = {
        empresas: [
            {nome: 'Oficina 4 rodas', id: 1, endereco: 'Rua das amebas, 78'}, 
            {nome: 'Oficina rodaqui', id: 2, endereco: "Rua dos navegantes 598"},
            {nome: 'Oficina bateu', id: 3, endereco: "Avenida saibora, 13"},
            {nome: 'Oficina nitro', id: 4, endereco: 'Praça Rui Leopoldo S/N'},
            {nome: 'Oficina tres irmãos', id: 6, endereco: 'Rua piracora, 59'},
            {nome: 'Oficina do Manoel', id: 7, endereco: 'Rua piracora, 59'},
            {nome: 'Oficina Pao', id: 8, endereco: 'Rua piracora, 59'},
            {nome: 'Oficina Disel', id: 9, endereco: 'Rua piracora, 59'},
            {nome: 'Oficina Carburador', id: 10, endereco: 'Rua piracora, 59'},
            {nome: 'Oficina Do Joao', id: 11, endereco: 'Rua piracora, 59'},
            {nome: 'Oficina Calos', id: 12, endereco: 'Rua piracora, 59'},
            {nome: 'Oficina Martelinho de ouro', id: 13, endereco: 'Rua piracora, 59'},
            {nome: 'Oficina Jundiair', id: 14, endereco: 'Rua piracora, 59'},
            {nome: 'Oficina dois Rios', id: 15, endereco: 'Rua piracora, 59'},
            {nome: 'Oficina Vintage', id: 16, endereco: 'Rua piracora, 59'},

        ],
        cor: '#eee1d6'
    }

    RenderItem(obj){
        return(
            <TouchableOpacity style={[styles.cell, {backgroundColor: '#eee1d6'}]}
            onPress={() => alert(obj.item.endereco)}>
                <View style={styles.workContainer}>
                    <Text style={styles.workText}>{obj.item.nome}</Text>
                    <FontAwesome
                    name="star-half" size={20}
                    color="black"
                    style={styles.rattingIcon}
                    />
                </View>
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
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>
                    Oficinas proximo a você
                    </Text>
                </View>
                
                <FontAwesome name="arrow-left" size={20} 
                color="white" 
                style={styles.menuIcon}
                onPress = {() => this.props.navigation.navigate('HomeClient')}/>
                <ScrollView style={{flex: 1, width: '100%'}}>
                <FlatList style={styles.flatContainer} data={this.state.empresas} renderItem={this.RenderItem} ></FlatList>
                </ScrollView>
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
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '18%',
    },
    header: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold' ,
        justifyContent: 'center',
        alignItems: 'center'  
    },

    flatContainer : {
        marginTop: 20,
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
        position: 'absolute',
        left: 1,
        top: 1,
        padding: 14
    },

    rattingIcon: {
        marginLeft: 50
    }

})