import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Alert,
    Keyboard,
    ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Color from '../constants/color';

class UserPage_1 extends Component {

    logoutFunction = () => {
        AsyncStorage.removeItem('userid');
        AsyncStorage.removeItem('password');
        AsyncStorage.removeItem('cmpny_name');
        AsyncStorage.removeItem('GstNo');
        Alert.alert("Sucessfully LoggedOut")
        this.props.navigation.navigate('LoginScreen');
    }

    constructor(props) {
        super(props)
        this.state = {
            UserId: '',
            Password: '',
            isLoading: true,
            CompanyName: '',
            GstNo: '',
        }
    }

    async componentDidMount() {
        Keyboard.dismiss();

        var value = await AsyncStorage.getItem('userid');
        if (value === null) {
            this.props.navigation.navigate('LoginScreen');
        }
        try {
            const UserId = await AsyncStorage.getItem('userid');
            const Password = await AsyncStorage.getItem('password');
            if (UserId !== null && Password !== null) {
                fetch('http://3.15.239.88/php/UserPage_1.php', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_id: UserId,
                        password: Password,
                    })
                }).then((response) => response.json())
                    .then((responseJson) => {

                        // If server response message same as Data Matched
                        if (responseJson !== null) {
                            //Then open Profile activity and send user email to profile activity.
                            this.setState({
                                isLoading: false,
                                CompanyName: responseJson[0]['cmpny_name'],
                                GstNo: responseJson[0]['gst_no'],
                            })
                            AsyncStorage.setItem('cmpny_name', this.state.CompanyName);
                            AsyncStorage.setItem('GstNo', this.state.GstNo);
                            console.log(responseJson);

                        }
                        else {
                            this.setState({ isLoading: false });
                            console.log(responseJson);
                        }
                    }).done();
            }
        } catch (error) {
            console.log('Error retieving data');
        }

    }


    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }

        else {
            const { goBack } = this.props.navigation;
            var date = new Date().getUTCDate();
            var month = new Date().getUTCMonth() + 1;
            var year = new Date().getFullYear();
            var fullDate = date + '/' + month + '/' + year;
            return (
                <View style={styles.screen}>
                    <View style={{ paddingBottom: 10 }}>
                        <Text style={styles.date}>
                            {fullDate}
                        </Text>
                    </View>
                    <View style={styles.title}>
                        <View>
                            <Text style={{
                                fontWeight: '100',
                                fontSize: 35,
                            }}>
                                {this.state.CompanyName}
                            </Text>
                        </View>
                        <View>
                            <Text style={{
                                fontSize: 15
                            }}>
                                GST No:{this.state.GstNo}
                            </Text>
                        </View>
                    </View>
                    <View style={{ fontWeight: 'bold' }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            paddingBottom: 30,
                            paddingTop: 30
                        }}>
                            <View style={{ width: 150 }}>
                                <Button
                                    title="Purchase Order"
                                    color={Color.primary}
                                    onPress={() => this.props.navigation.navigate('PurchaseOrder')}
                                />
                            </View>
                            <View style={{ width: 150 }}>
                                <Button
                                    title="Purchases"
                                    color={Color.secondary}
                                    onPress={() => this.props.navigation.navigate('ViewOrder')}
                                />
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            paddingBottom: 30,
                            paddingTop: 30
                        }}>
                            <View style={{ width: 150 }}>
                                <Button
                                    title="Sales Order"
                                    color={Color.secondary}
                                    onPress={() => this.props.navigation.navigate('SalesOrder')}
                                />
                            </View>
                            <View style={{ width: 150 }}>
                                <Button
                                    title="Sales"
                                    color={Color.primary}
                                    onPress={() => this.props.navigation.navigate('ViewSalesOrder')}
                                />
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            paddingBottom: 30,
                            paddingTop: 30,
                        }}>

                            <View style={{ width: 150 }}>
                                <Button
                                    title="Payment"
                                    color={Color.primary}
                                    onPress={() => this.props.navigation.navigate('Balance')}
                                />
                            </View>
                            <View style={{ width: 150 }}>
                                <Button
                                    title="Signout"
                                    color={Color.secondary}
                                    onPress={this.logoutFunction}
                                />
                            </View>
                        </View>
                    </View>
                    <View>

                    </View>
                </View>

            );
        }
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
    },
    date: {
        textAlign: 'right',
        fontSize: 15,
        fontWeight: 'bold',
    },
    title: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default UserPage_1;