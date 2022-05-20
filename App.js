
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useState, useEffect } from 'react';
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import SpeakColor from './src/SpeakColor';
 import Audiodownload from './src/Audiodownload';
 
 //import AsyncStorage from '@react-native-async-storage/async-storage';
 import { ASYNC_KEYS } from './src/methodFiles/constants';
 import { View,TouchableHighlight,StyleSheet,Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
 
 const Stack = createNativeStackNavigator();
 
 const App = () => {
   const [initialRoute, setInitialRoute] = useState('Speaktest');
   useEffect(() => {
  
   }, [])
 
   const changeroot = async () => {
   setInitialRoute('Speaktest')
   }
   
   const changerootSpeakTest = async () => {
   setInitialRoute('Audiotest')
   }
   if (initialRoute == 'Speaktest') {
     return (
       <View style={{flex:1}}>
      <View style={styles.horizontalView}>
      <TouchableHighlight
       onPress={changeroot}
       style={{ flex: 1,
        justifyContent: 'center',
        marginTop: 15,
        padding: 10,
        backgroundColor: '#8ad24e',
        marginRight: 2,
        marginLeft: 2,}}>
        <Text style={styles.buttonTextStyle}>
        Speak Test
        </Text>
      </TouchableHighlight>
      {/* <TouchableHighlight
        onPress={cancelRecognizing}
        style={styles.buttonStyle}>
        <Text style={styles.buttonTextStyle}>
          Cancel
        </Text>
      </TouchableHighlight> */}
      <TouchableHighlight
       onPress={changerootSpeakTest}
       style={{ flex: 1,
        justifyContent: 'center',
        marginTop: 15,
        padding: 10,
        backgroundColor: 'gray',
        marginRight: 2,
        marginLeft: 2,}}>
        <Text style={styles.buttonTextStyle}>
          Audio Test
        </Text>
      </TouchableHighlight>
    </View>
      <SpeakColor/>
      </View>
     );
   } 
   else if( initialRoute == 'Audiotest')
   {
    return (
      
     
      <View style={{flex:1}}>
      <View style={styles.horizontalView}>
      <TouchableHighlight
       onPress={changeroot}
        style={{ flex: 1,
          justifyContent: 'center',
          marginTop: 15,
          padding: 10,
          backgroundColor: 'gray',
          marginRight: 2,
          marginLeft: 2,}}>
        <Text style={styles.buttonTextStyle}>
          Speak Test
        </Text>
      </TouchableHighlight>
      {/* <TouchableHighlight
        onPress={cancelRecognizing}
        style={styles.buttonStyle}>
        <Text style={styles.buttonTextStyle}>
          Cancel
        </Text>
      </TouchableHighlight> */}
      <TouchableHighlight
       onPress={changerootSpeakTest}
        style={{ flex: 1,
          justifyContent: 'center',
          marginTop: 15,
          padding: 10,
          backgroundColor: '#8ad24e',
          marginRight: 2,
          marginLeft: 2,}}>
        <Text style={styles.buttonTextStyle}>
           Audio Test
        </Text>
      </TouchableHighlight>
    </View>
      <Audiodownload/>
      </View>
     );
   }
 
  
 };
 
 export default App;

 const styles = StyleSheet.create({
  
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#8ad24e',
    marginRight: 2,
    marginLeft: 2,
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
  horizontalView: {
    flexDirection: 'row',
   // position: 'absolute',
    bottom: 0,
  },
 
});