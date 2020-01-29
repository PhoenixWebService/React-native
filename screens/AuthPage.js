import React, { Component } from 'react';
import { Button, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Card from '../components/card';
import Colors from '../constants/color';

class AuthPage extends Component {
    render() {
        return (
            <View style={styles.screen}>
                <Card style={styles.inputContainer}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity>
                            <View style={styles.button}>
                                <Button
                                    title="Login"
                                    color={Colors.primary}
                                    onPress={() => this.props.navigation.navigate('LoginScreen')}
                                />
                            </View>
                            <View style={styles.button}
                            ><Button
                                    title="Signup"
                                    color={Colors.secondary}
                                    onPress={() => this.props.navigation.navigate('SignupScreen')}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </Card>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
        padding: 20
    },
    buttonContainer: {
        padding: 10,
        marginVertical: 10,
    },
    button: {
        width: 100,
        marginVertical: 20
    }
});

export default AuthPage;