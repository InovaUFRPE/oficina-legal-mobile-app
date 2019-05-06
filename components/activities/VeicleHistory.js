import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default class VeicleHistory extends Component {
    state = {
        laudos: [
            {oficina: '4 rodas', id: 1, data: '02/02/17', servico: "-Funilaria \n-Mecanica \n-Eletrico", custo: "300.06"}, 
            {oficina: 'Rodaqui', id: 2, data: '12/05/18', servico: "\n-Mecanica \n-Eletrico", custo: "350.06"}, 
            {oficina: 'do Monoel', id: 3, data: '22/12/17', servico: "-Funilaria \n-Mecanica", custo: "150.06"}, 
            {oficina: 'Dois Rios', id: 4, data: '06/05/18', servico: "-Mecanica", custo: "260.06"}, 
            {oficina: 'Martelinho de Ouro', id: 5, data: '02/02/18', servico: "-Funilaria \n-Mecanica \n-Eletrico", custo: "720.06"}, 
            {oficina: 'Joaozinho', id: 6, data: '12/03/19', servico: "\n-Mecanica \n-Eletrico", custo: "1240.06"}, 
            {oficina: 'Carburador', id: 7, data: '01/06/18', servico: "Eletrico", custo: "345.06"}, 
            {oficina: 'Vintage', id: 8, data: '05/02/18', servico: "-Funilaria \n-Mecanica \n-Eletrico", custo: "932.06"}, 
            {oficina: 'Três irmãos', id: 9, data: '29/04/18', servico: "-Funilaria \n-Mecanica", custo: "55.06"}, 
            {oficina: 'Gasolina', id: 10, data: '08/08/18', servico: "\n-Mecanica \n-Eletrico", custo: "87.06"}, 
        ],
        cor: '#eee1d6'
    }

    RenderItem(obj){
        return(
            <TouchableOpacity style={[styles.cell, {backgroundColor: '#eee1d6'}]}
            onPress={() => Alert.alert("Serviços Realizados" , obj.item.servico + "\nR$ " + obj.item.custo )}>
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
                    <FontAwesome
                        name="bars"
                        size={30}
                        style={{padding: 20, color: 'white', position: 'absolute', left: 1}}
                        onPress = {() => this.props.navigation.toggleDrawer()}
                    />
                    <Text style={styles.headerTitle}>Histórico do Veículo</Text>
                </View>
                
                <ScrollView style={{flex: 1, width: '100%'}}>
                <FlatList 
                    style={styles.flatContainer} 
                    data={this.state.laudos}
                    keyExtractor={item => `${item.id}`} 
                    renderItem={this.RenderItem} ></FlatList>
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
        width: '100%', 
        height: 60, 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderBottomWidth: 1, 
        borderBottomColor: 'white'},

    headerTitle: {
        fontSize: 20, 
        fontWeight: 'bold', 
        color: 'white'
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