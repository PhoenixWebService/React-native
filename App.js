import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import 'react-native-gesture-handler';
import Container from './screens/ScreenContainer';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.screen}>
        <Header title="Sorokad" />
        <Container />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  screen: {
    flex: 1
  }

});
