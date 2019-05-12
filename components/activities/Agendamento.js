import React, {Component} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { StyleSheet, Text, View, ImageBackground, DatePickerAndroid, DatePickerIOS, Platform, TouchableOpacity, TextInput, ScrollView, Image, Picker} from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'
import imageOficina from '../../images/Oficina.jpg'


const initialState = { desc: '', date: new Date(), workShopInformation: [{name: '', adress: '', phoneNumber: ''}]}
export default class Agendamento extends Component {
    state = { ...initialState}

    handleDateAndroidChanged = () => {
        DatePickerAndroid.open({
            date: this.state.date,
            minDate: this.state.date,
            mode: 'default'
        }).then(e => {
            if (e.action !== DatePickerAndroid.dismissedAction) {
                const momentDate = moment(this.state.date)
                momentDate.date(e.day)
                momentDate.month(e.month)
                momentDate.year(e.year)
                this.setState({ date: momentDate.toDate() })
            }
        })
    }
    render() {
        let datePicker = null
        if (Platform.OS === 'ios') {
            datePicker = <DatePickerIOS mode='time' date={this.state.date} minimumDate={this.state.date}
                            onDateChange={date => this.setState({date})}/>
        }   else {
            datePicker = (
                <TouchableOpacity onPress={this.handleDateAndroidChanged}>
                    <Text style={styles.date}>
                        {moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY')}
                    </Text>
                </TouchableOpacity>
            )
        }
        
        return(
            <View style={styles.container}>
                <ImageBackground 
                    source={imageOficina}
                    style={styles.background}>
                    <View style={styles.titleBar}>
                        <Image
                            source={require('../../images/profileWorkShop.png')}
                            style={styles.image}/>                                   
                    </View>
                </ImageBackground>
                <ScrollView style={{width: '100%'}}>
                    
                    <View style={{justifyContent: 'flex-start', marginTop: 10}}>
                        <Text style = {{fontSize: 25, fontWeight: 'bold', marginLeft: 10}}>Oficina Automotiva</Text>
                        <Text style = {{fontSize: 15, marginLeft: 30}}>Rua Rio da Dores, Recife, Penambuco</Text>
                        <Text style = {{fontSize: 15, marginLeft: 30}}>3339-2210</Text>
                        <Icon
                            name='map-marker'
                            size={15}
                            style={{position: 'absolute', marginLeft: 15, marginTop: 35}}
                        />
                        <Icon
                            name='phone'
                            size={15}
                            style={{position: 'absolute', marginLeft: 15, marginTop: 58}}
                        />
                    </View>

                    <View style={[styles.infoContainer, {height: 70, marginTop: 20}]}>
                        <Icon
                            name='calendar'
                            size={30}
                            style={{}}
                        />
                        {datePicker}
                    </View>
                    
                    <View style={styles.infoContainer}>
                        <Icon
                            name='exclamation-circle'
                            size={30}
                        />
                        <TextInput
                            style={[styles.input, {paddingLeft: 10}]}
                            placeholder="Problema do veiculo"
                            autoCorrect={false}
                            multiline={true}
                        />  
                    </View>

                    <View style={styles.infoContainer}>
                        <Icon
                            name='car'
                            size={30}
                            style={{paddingRight: 5}}
                        />
                    
                        <Picker
                            selectedValue={this.state.pickerSection}                  
                            style={styles.input}
                            onValueChange={(itemValue, itemIndex) => this.setState({pickerSection: itemValue})}                                                      
                        >
                        <Picker.Item label='CARRO A' value='carroA' />
                        <Picker.Item label='CARRO B' value='carroB' /> 
                        <Picker.Item label='CARRO C' value='carroC' />                       
                        </Picker>
                    </View>



                </ScrollView>
                     <View style={{alignItems: 'center', padding: 10}}>
                        <TouchableOpacity style={styles.buttonAgendar}>
                            <Text style={styles.textButton}>Agendar</Text>
                        </TouchableOpacity>
                    </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center' 
    },
    background: {
        width: "100%",
        height: 150,
        borderRadius: 100
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    title: {
        color: 'red',
        fontSize: 40,
        marginLeft: 20,
        marginBottom: 10,
        textShadowRadius: 19
        
    },
    subtitle: {
        color: 'blue',
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30
    },
    inputsContainer: {
        flex: 7,
    },

    input: {
        width: "80%",
    },  

    infoContainer: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 0.5
    },
    
    infoText: {
        color: 'lightgray',
        fontWeight: '500',
        fontSize: 20
    },  

    date: {
        position: 'relative',
        fontSize: 20,
        fontWeight: '400',
        paddingRight: 90

    },
    buttonAgendar: {
        width: 300,
        padding: 15,
        alignItems: 'center',
        backgroundColor: 'blue',
        borderRadius: 100,
    },
    textButton: {
        fontSize: 20,
        color: 'white'
    },
    image: {
        width: 120,
        height: 120,
        marginLeft: 10,
        borderWidth: 5,
        borderRadius: 100,
        borderColor: 'white'
    },
    
})