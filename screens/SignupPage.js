import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Button,
    Alert,
    Keyboard,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from '../constants/color';



export default class SignupPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Cus_Name: '',
            Cmpny_Name: '',
            Gst_No: '',
            Mob_No: '',
            User_Id: '',
            Password: ''
        }
    }

    UserRegistrationFunction = () => {
        const { Cus_Name } = this.state;
        const { Cmpny_Name } = this.state;
        const { Gst_No } = this.state;
        const { Mob_No } = this.state;
        const { User_Id } = this.state;
        const { Password } = this.state;

        fetch('http://3.15.239.88/php/userRegistration.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cus_name: Cus_Name,
                cmpny_name: Cmpny_Name,
                gst_no: Gst_No,
                mob_no: Mob_No,
                user_id: User_Id,
                password: Password
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                Alert.alert(responseJson);
            }).catch((error) => {
                console.error(error);
            }).done();
        this.props.navigation.navigate("LoginScreen")
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignContent: 'center',
                }}
                behavior="padding"
                enabled
                keyboardVerticalOffset={100}>
                <ScrollView>
                    <View style={styles.screen}>
                        <View style={styles.textContainer}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Icon
                                    name="Torso"
                                    type="Foundation"
                                    size={30}
                                    iconStyle={{ padding: 10 }}
                                    color="#413E4F" />
                                <View style={styles.textStyle}>
                                    <TextInput
                                        placeholder="Customer Name"
                                        placeholderTextColor={Colors.secondary}
                                        autoCapitalize='sentences'
                                        autoCorrect={false}
                                        onChangeText={Cus_Name => this.setState({ Cus_Name })}
                                        ref={ref => {
                                            this.cus_name = ref;
                                        }}
                                        returnKeyType="next"
                                        onSubmitEditing={() =>
                                            this.cmpny_name && this.cmpny_name.focus()
                                        }
                                        blurOnSubmit={false}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Icon
                                    name="torso-business"
                                    type="Foundation"
                                    size={30}
                                    iconStyle={{ padding: 10 }}
                                    color="#413E4F" />
                                <View style={styles.textStyle}>
                                    <TextInput
                                        placeholder="Company Name"
                                        placeholderTextColor={Colors.secondary}
                                        autoCapitalize='sentences'
                                        autoCorrect={false}
                                        onChangeText={Cmpny_Name => this.setState({ Cmpny_Name })}
                                        ref={ref => {
                                            this.cmpny_name = ref;
                                        }}
                                        returnKeyType="next"
                                        onSubmitEditing={() =>
                                            this.gst_no && this.gst_no.focus()
                                        }
                                        blurOnSubmit={false}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Icon
                                    name="dollar-bill"
                                    type="Foundation"
                                    size={30}
                                    iconStyle={{ padding: 10 }}
                                    color="#413E4F" />
                                <View style={styles.textStyle}>
                                    <TextInput
                                        placeholder="GST No"
                                        placeholderTextColor={Colors.secondary}
                                        autoCapitalize='sentences'
                                        autoCorrect={false}
                                        onChangeText={Gst_No => this.setState({ Gst_No })}
                                        ref={ref => {
                                            this.gst_no = ref;
                                        }}
                                        returnKeyType="next"
                                        onSubmitEditing={() =>
                                            this.mob_no && this.mob_no.focus()
                                        }
                                        blurOnSubmit={false}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Icon
                                    name="mobile"
                                    type="Foundation"
                                    size={30}
                                    iconStyle={{ padding: 10 }}
                                    color="#413E4F" />
                                <View style={styles.textStyle}>
                                    <TextInput
                                        placeholder="Mobile No"
                                        placeholderTextColor={Colors.secondary}
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        keyboardType="number-pad"
                                        onChangeText={Mob_No => this.setState({ Mob_No })}
                                        ref={ref => {
                                            this.mob_no = ref;
                                        }}
                                        returnKeyType="next"
                                        onSubmitEditing={() =>
                                            this.user_id && this.user_id.focus()
                                        }
                                        blurOnSubmit={false}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Icon
                                    name="torsos-all"
                                    type="Foundation"
                                    size={30}
                                    iconStyle={{ padding: 10 }}
                                    color="#413E4F" />
                                <View style={styles.textStyle}>
                                    <TextInput placeholder="User Id"
                                        placeholderTextColor={Colors.secondary}
                                        autoCapitalize='sentences'
                                        autoCorrect={false}
                                        onChangeText={User_Id => this.setState({ User_Id })}
                                        ref={ref => {
                                            this.user_id = ref;
                                        }}
                                        returnKeyType="next"
                                        onSubmitEditing={() =>
                                            this.password && this.password.focus()
                                        } blurOnSubmit={false}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Icon
                                    name="key"
                                    type="Foundation"
                                    size={30}
                                    iconStyle={{ padding: 10 }}
                                    color="#413E4F" />
                                <View style={styles.textStyle}>
                                    <TextInput placeholder="Password"
                                        placeholderTextColor={Colors.secondary}
                                        secureTextEntry={true}
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        onChangeText={Password => this.setState({ Password })}
                                        ref={ref => {
                                            this.password = ref;
                                        }}
                                        returnKeyType="next"
                                        onSubmitEditing={Keyboard.dismiss}
                                        blurOnSubmit={false}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <View style={styles.button}>
                                <Button
                                    title="Register"
                                    color={Colors.primary}
                                    onPress={this.UserRegistrationFunction}
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
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: 'white'
    },
    textContainer: {
        padding: 10,
        marginVertical: 10,
    },
    textStyle: {
        width: '80%',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    },
    buttonContainer: {
        flexDirection: "row",
        padding: 10,
        alignContent: "center",
        justifyContent: "space-evenly",
    },
    button: {
        width: 100,
        marginVertical: 20
    }
});
