import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Button,
    Alert,
    TouchableWithoutFeedback,
    Keyboard,
    ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Card from '../components/card';
import Colors from '../constants/color';
import { Icon } from 'react-native-elements';
class loginPage extends Component {

    static navigationOption = {
        title: 'LoginActivity',
    };

    constructor(props) {
        super(props)
        this.state = {
            UserId: '',
            Password: '',
            isLoading: false,
            passworda: '',
            userid: '',
        }
    }

    componentDidMount() {
        this.loadInitialState().done();
    }

    loadInitialState = async () => {
        var value = await AsyncStorage.getItem('userid');
        if (value !== null) {
            this.props.navigation.navigate('UserScreen_1');
        }
    }



    UserLoginFunction = () => {
        this.setState({ isLoading: true });

        const { UserId } = this.state;
        const { Password } = this.state;

        fetch('http://3.15.239.88/php/userLogin.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: UserId,
                password: Password
            })
        }).then((response) => response.json())
            .then((responseJson) => {

                // If server response message same as Data Matched
                if (responseJson === 'Data Matched') {
                    //Then open Profile activity and send user email to profile activity.
                    this.setState({ isLoading: false, })
                    AsyncStorage.setItem('password', this.state.Password );
                    AsyncStorage.setItem('userid', this.state.UserId);
                    this.props.navigation.navigate('UserScreen_1', { userid: this.state.UserId, password: this.state.Password });
                }
                else {
                    this.setState({ isLoading: false });
                    Alert.alert(responseJson);
                }
            }).done();
    }


    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
                <View style={styles.screen}>
                    <Card style={styles.inputContainer}>
                        <View style={styles.textContainer}>
                            <View style={styles.textStyle}>
                                <Icon
                                    name="account-circle"
                                    type="Material"
                                    size={25}
                                    iconStyle={{ padding: 10 }}
                                />
                                <TextInput
                                    placeholder="Mail ID"
                                    keyboardType="email-address"
                                    placeholderTextColor={Colors.secondary}
                                    autoCorrect={false}
                                    ref={ref => {
                                        this.mail_id = ref;
                                    }}
                                    returnKeyType="next"
                                    onSubmitEditing={() =>
                                        this.password && this.password.focus()
                                    }
                                    blurOnSubmit={false}
                                    onChangeText={UserId => this.setState({ UserId })}
                                    autoCapitalize="none"
                                />
                            </View>
                            <View style={styles.textStyle}>
                                <Icon
                                    name="lock"
                                    type="Foundation"
                                    size={25}
                                    iconStyle={{ padding: 10 }}
                                />
                                <TextInput
                                    placeholder="Password"
                                    secureTextEntry={true}
                                    placeholderTextColor={Colors.secondary}
                                    autoCorrect={false}
                                    ref={ref => {
                                        this.password = ref;
                                    }}
                                    returnKeyType="done"
                                    onSubmitEditing={this.UserLoginFunction}
                                    blurOnSubmit={false}
                                    onChangeText={Password => this.setState({ Password })}
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <View style={styles.button}>
                                <Button
                                    title="Login"
                                    color={Colors.primary}
                                    onPress={this.UserLoginFunction}
                                />
                            </View>
                            <View style={styles.button}>
                                <Button
                                    title="Cancel"
                                    color={Colors.secondary}
                                    onPress={() => this.props.navigation.navigate('WelcomeScreen')}
                                />
                            </View>
                        </View>
                    </Card>
                </View>
            </TouchableWithoutFeedback >
        );
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        padding: 20
    },
    textContainer: {
        padding: 10,
        marginVertical: 10
    },
    textStyle: {
        width: '80%',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        padding: 10,
        flexDirection: 'row'
    },
    buttonContainer: {
        flexDirection: "row",
        padding: 10,
        alignContent: "center",
        justifyContent: "space-between"
    },
    button: {
        width: 100,
        marginVertical: 20
    }
});

export default loginPage;