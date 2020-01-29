import React from 'react';
import {View,StyleSheet,Text,Image} from 'react-native';
import Colors from '../constants/color'

const Header = props=>{
    return(
        <View style={styles.Header}>
            <View style={{}}><Image source={require('../img/logo.png')}/></View>
            <Text style={styles.titleText}>{props.title}</Text>
        </View>
    );
};

const styles=StyleSheet.create({
    Header:{
        flexDirection:'row',
        width:'100%',
        height:90,
        paddingTop:36,
        backgroundColor:Colors.primary,
        alignItems:'center',
        justifyContent:'center'
    },

    titleText:{
        color:'black',
        fontSize: 25,
        fontWeight:"bold",
        paddingLeft:10,
    }

});

export default Header;