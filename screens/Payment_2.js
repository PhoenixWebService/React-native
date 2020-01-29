import React, { Component } from 'react';
import {
    View,
    TextInput,
    ScrollView,
    StyleSheet,
    Text,
    KeyboardAvoidingView,
    Button,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Colors from '../constants/color'

class salesOrder_2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Company_Id: '',
            Purchase_Company: '',
            Gst_No: '',
            Date: '',
            Material_List: '',
        }
    }

    componentDidMount() {
        this.setState({
            Company_Id: this.props.navigation.state.params.ID,
            Purchase_Company: this.props.navigation.state.params.PURCHASE_COMPANY,
            Gst_No: this.props.navigation.state.params.GST_NO,
            Date: this.props.navigation.state.params.DATE,
            Material_List: this.props.navigation.state.params.MATERIALlIST,
        })
    }

    ModifiyMaterialList = async () => {
        const Sales_Company = await AsyncStorage.getItem('cmpny_name');
        const Old_id = this.state.Company_Id;
        const Purchase_Date = this.state.Date;
        const Purchase_Company = this.state.From_Company;
        const Purchase_Company_Gst = this.state.Gst_No;
        const Purchase_Material_List_Old = this.state.Material_List_Old;
        const Purchase_Material_List_New = this.state.Material_List_New;

        fetch('http://3.15.239.88/php/Update_MaterialList.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Sales_Company: Sales_Company,
                Purchase_Date: Purchase_Date,
                Purchase_Company: Purchase_Company,
                Purchase_Company_Gst: Purchase_Company_Gst,
                Purchase_Material_List_Old: Purchase_Material_List_Old,
                Purchase_Material_List_New: Purchase_Material_List_New,
                Old_id: Old_id,
            })
        }).then((response) => response.text())
            .then((responseJson) => {
                console.log(responseJson);
                Alert.alert(responseJson);
            }).catch((error) => {
                console.error(error);
            }).done();
        this.props.navigation.navigate("UserScreen_1")

    }

    AcceptMaterialList = async () => {
        const Sales_Company = await AsyncStorage.getItem('cmpny_name');
        const Old_id = this.state.Company_Id;
        const Purchase_Company = this.state.From_Company;
        const Purchase_Company_Gst = this.state.Gst_No;
        const Purchase_Material_List_New = this.state.Material_List_New;

        fetch('http://3.15.239.88/php/Accept_MaterialList.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Sales_Company: Sales_Company,
                Purchase_Company: Purchase_Company,
                Purchase_Company_Gst: Purchase_Company_Gst,
                Purchase_Material_List_New: Purchase_Material_List_New,
                Old_id: Old_id,
            })
        }).then((response) => response.text())
            .then((responseJson) => {
                console.log(responseJson);
                Alert.alert(responseJson);
            }).catch((error) => {
                console.error(error);
            }).done();
        this.props.navigation.navigate("UserScreen_1")
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
                        <Text style={{
                            fontSize: 20,
                            textAlign: 'center',
                            marginBottom: 7
                        }}>
                            Order Confirmation
                        </Text>
                        <View style={styles.textContainer}>
                            <View style={styles.textStyle}>
                                <Text style={styles.Text}>ID:</Text>
                                <Text>
                                    {this.state.Company_Id}
                                </Text>
                            </View>
                            <View style={styles.textStyle}>
                                <Text style={styles.Text}>From:</Text>
                                <Text>
                                    {this.state.From_Company}
                                </Text>
                            </View>
                            <View style={styles.textStyle}>
                                <Text style={styles.Text}>GST No:</Text>
                                <Text>
                                    {this.state.Gst_No}
                                </Text>
                            </View>
                            <View style={styles.textStyle}>
                                <Text style={styles.Text}>Date:</Text>
                                <Text>
                                    {this.state.Date}
                                </Text>
                            </View>
                        </View>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>Materials List:</Text>
                        <View style={{ flex: 1, padding: 2, justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                multiline={true}
                                value={this.state.Material_List_New}
                                style={styles.itemInput}
                                onChangeText={TextInputValue => this.setState({ Material_List_New: TextInputValue })}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <View style={styles.button}>
                                <Button
                                    title="Update"
                                    color={Colors.primary}
                                    onPress={this.ModifiyMaterialList}
                                />
                            </View>
                            <View style={styles.button}>
                                <Button
                                    title="Accept"
                                    color={Colors.secondary}
                                    onPress={this.AcceptMaterialList}
                                />
                            </View>
                        </View>
                    </View >
                </ScrollView>
            </KeyboardAvoidingView >
        )
    }
}

export default salesOrder_2;

const styles = StyleSheet.create({
    screen: {
        backgroundColor: 'white',
        flex: 1,
    },
    textContainer: {
        padding: 10,
        marginVertical: 10,
        alignContent: 'center',
        alignItems: 'center',

    },
    textStyle: {
        width: '80%',
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',

    },
    itemInput: {
        textAlignVertical: 'top',
        width: '80%',
        height: 200,
        borderColor: 'black',
        borderWidth: 1,
        fontSize: 25,
    },
    Text: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    InputText: {
        fontSize: 15
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
})