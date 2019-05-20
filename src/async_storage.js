import React, {Component} from 'react'
import {
    StatusBar, Text, View, AsyncStorage, TextInput, StyleSheet
} from 'react-native'

class AsyncStorageExample extends Component{
    state = {
        'name' : '',
        'age'  : ''
    }
    componentDidMount = () => 
   
    AsyncStorage.getItem('name')
    .then( (value) => this.setState({ 'name': value }) )
     
    setName = (value) => {
        AsyncStorage.setItem('name', value);
        // AsyncStorage.setItem('age','21');
        // this.setState({ 'name': value })
    }
        render(){
            return(
                <View style ={styles.container}>
                    <TextInput style = {styles.textInput} autoCapitalize = 'none' onChangeText = {this.setName}/>
                    <Text>
                        {this.state.name}
                        {this.state.age}
                    </Text>
                </View>
            )
        }
}

export default AsyncStorageExample

const styles = StyleSheet.create ({
    container: {
       flex: 1,
       alignItems: 'center',
       marginTop: 50
    },
    textInput: {
       margin: 5,
       height: 100,
       borderWidth: 1,
       backgroundColor: '#7685ed'
    }
 })