import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default class VeicleHistory extends Component {
    state = {
        laudos: [
            {oficina: '4 rodas', id: 1, data: '02/02/18', servico: "-Funilaria \n-Mecanica \n-Eletrico"}, 
            {oficina: 'Rodaqui', id: 2, data: '02/02/18', servico: "\n-Mecanica \n-Eletrico"}, 
            {oficina: 'do Monoel', id: 3, data: '02/02/18', servico: "-Funilaria \n-Mecanica"}, 
            {oficina: 'Dois Rios', id: 4, data: '02/02/18', servico: "-Mecanica"}, 
            {oficina: 'Martelinho de Ouro', id: 5, data: '02/02/18', servico: "-Funilaria \n-Mecanica \n-Eletrico"}, 
            {oficina: 'Joaozinho', id: 6, data: '02/02/18', servico: "\n-Mecanica \n-Eletrico"}, 
            {oficina: 'Carburador', id: 7, data: '02/02/18', servico: "Eletrico"}, 
            {oficina: 'Vintage', id: 8, data: '02/02/18', servico: "-Funilaria \n-Mecanica \n-Eletrico"}, 
            {oficina: 'Três irmãos', id: 9, data: '02/02/18', servico: "-Funilaria \n-Mecanica"}, 
            {oficina: 'Gasolina', id: 10, data: '02/02/18', servico: "\n-Mecanica \n-Eletrico"}, 
        ],
        cor: '#eee1d6'
    }

    RenderItem(obj){
        return(
            <TouchableOpacity style={[styles.cell, {backgroundColor: '#eee1d6'}]}
            onPress={() => alert(obj.item.servico)}>
                <View style={styles.workContainer}>
                    <Text style={styles.workText}>Oficina {obj.item.oficina}</Text>
                    <Text style={styles.workText}>Data: {obj.item.data}</Text>
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
                        Histórico do seu veiculo
                    </Text>
                </View>
                
                <FontAwesome name="arrow-left" size={20} 
                color="white" 
                style={styles.menuIcon}
                onPress = {() => this.props.navigation.navigate('HomeClient')}/>
                <ScrollView style={{flex: 1, width: '100%'}}>
                <FlatList style={styles.flatContainer} data={this.state.laudos} renderItem={this.RenderItem} ></FlatList>
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