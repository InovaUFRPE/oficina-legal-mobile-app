import React, { Component } from 'react'
import {
    Modal,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Picker,
    DatePickerAndroid,
    DatePickerIOS,
    Alert,
    Platform
} from 'react-native'
import moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome'

//props: serviceName, serviceType, price, estimateDate

const initialState = { serviceName: '', serviceType: '', price: '', date: new Date() }

export default class AddTask extends Component {
    state = { ...initialState }

    validation = () => {
        if (!this.state.serviceName.trim || !this.state.serviceType || !this.state.price || !this.state.price) {
            Alert.alert('Dados inválidos', 'Preencha todos os campos para criar o processo')
            return
        }
        Alert.alert(
            'Ordem de Serviço',
            'Voce deseja realizar o serviço de ' + this.state.serviceName + ' até o dia ' + moment(this.state.date).format('DD[/]MM[/]YY') + ' no valor de R$ ' + this.state.price + '?',
            [
                {
                    text: 'Não',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Sim', onPress: this.save },
            ],
            { cancelable: false },
        );
    }

    save = () => {
        const data = { ...this.state }
        this.props.onSave(data)
        this.setState({ ...initialState })
    }

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
            datePicker = <DatePickerIOS mode='date' date={this.state.date}
                onChangeText={date => this.setState({ date })} />
        }
        else {
            datePicker = (
                <TouchableOpacity onPress={this.handleDateAndroidChanged} style={{ width: '100%' }}>
                    <Text style={styles.date}>
                        {moment(this.state.date).format('DD[/]MM[/]YY')}
                    </Text>
                </TouchableOpacity>
            )
        }

        return (
            <Modal onRequestClose={this.props.onCancel}
                visible={this.props.isVisible}
                animationType='fade' transparent={true}>
                <TouchableWithoutFeedback>
                    <View style={styles.offset}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Adicionar Serviço</Text>
                    <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>Nome do serviço</Text>
                    <TextInput
                        placeholder="Nome do serviço" style={styles.input}
                        onChangeText={serviceName => this.setState({ serviceName })}
                        autoCapitalize='words'
                        value={this.state.serviceName}
                    />

                    <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>Tipo do serviço</Text>
                    <Picker
                        selectedValue={this.state.serviceType}
                        style={[styles.input, { backgroundColor: '#EDEDED' }]}
                        mode='dropdown'
                        onValueChange={(itemValue, itemIndex) => this.setState({ serviceType: itemValue })}>
                        <Picker.Item label='Serviços: ' value='' />
                        <Picker.Item label='Funilaria' value='Funilaria' />
                        <Picker.Item label='Eletronica' value='Eletronica' />
                        <Picker.Item label='Mecanica' value='Mecanica' />
                    </Picker>

                    <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>Preço</Text>
                    <TextInput
                        placeholder="R$ 00,00" style={styles.input}
                        onChangeText={price => this.setState({ price })}
                        value={this.state.price}
                        keyboardType='decimal-pad'
                    />

                    <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>Previsão de entrega</Text>
                    <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                        <Icon
                            name="calendar"
                            size={20}
                            style={{ marginTop: 3 }}
                        />
                        {datePicker}
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}
                    >
                        <TouchableOpacity onPress={this.props.onCancel} style={[styles.button, { backgroundColor: '#ffffff' }]}>
                            <Text style={[styles.textButton, { color: '#2250d9' }]}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.validation} style={styles.button}>
                            <Text style={styles.textButton}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'space-between'
    },

    offset: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },

    button: {
        margin: 20,
        backgroundColor: '#2250d9',
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 0.5
    },
    textButton: {
        fontSize: 15,
        padding: 18,
        color: '#ffffff'
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 15
    },

    input: {
        width: '90%',
        height: 50,
        marginLeft: 10,
        marginBottom: 20,
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: '#e3e3e3',
        borderRadius: 5
    },

    date: {
        fontSize: 20,
        marginLeft: 10
    }
})