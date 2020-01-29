import React, { Component } from 'react';
import {
    View,
    TextInput,
    ScrollView,
    StyleSheet,
    Text,
    KeyboardAvoidingView,
    Alert,
    ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
export default class Approvals_2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Id: '',
            Purchase_Date: '',
            Sales_Company: '',
            Old_Material: '',
            New_Material: '',
            isLoading: true,
        }
    }

    componentDidMount() {
        this.setState({
            Old_Id: this.props.navigation.state.params.ID,
            Purchase_Date: this.props.navigation.state.params.PURCHASE_DATE,
            Sales_Company: this.props.navigation.state.params.SALES_COMPANY,
            Old_Material: this.props.navigation.state.params.OLD_MATERIAL,
            New_Material: this.props.navigation.state.params.NEW_MATERIAL,
            Purchase_Company_Gst: this.props.navigation.state.params.PURCHASE_COMPANY_GST,
            isLoading: false
        })
    }

    ConformMaterialList = async () => {
        const PurchaseCompany = await AsyncStorage.getItem('cmpny_name');
        const SalesCompany = this.state.Sales_Company;
        const PurchaseCompanyGst = this.state.Purchase_Company_Gst;
        const MaterialList = this.state.New_Material;
        const Old_Id = this.state.Old_Id

        fetch('http://3.15.239.88/php/Approvals_2.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Sales_Company: SalesCompany,
                Purchase_Company: PurchaseCompany,
                Purchase_Company_Gst: PurchaseCompanyGst,
                Purchase_Material_List_New: MaterialList,
                Old_Id: Old_Id,
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

    RejectMaterialList = async () => {
        const Old_Id = this.state.Old_Id

        fetch('http://3.15.239.88/php/Approvals_2_reject.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Old_Id: Old_Id,
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

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }

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
                            Approval
                            </Text>
                        <View style={styles.textContainer}>
                            <View style={styles.textStyle}>
                                <Text style={styles.Text}>ID:</Text>
                                <Text>
                                    {this.state.Old_Id}
                                </Text>
                            </View>
                            <View style={styles.textStyle}>
                                <Text style={styles.Text}>Purchased From:</Text>
                                <Text>
                                    {this.state.Sales_Company}
                                </Text>
                            </View>
                            <View style={styles.textStyle}>
                                <Text style={styles.Text}>Purchase Date:</Text>
                                <Text>
                                    {this.state.Purchase_Date}
                                </Text>
                            </View>
                        </View>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>Old Materials List:</Text>
                        <View style={{ flex: 1, padding: 2, justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                multiline={true}
                                value={this.state.Old_Material}
                                style={styles.itemInput}
                            />
                        </View>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>New Materials List:</Text>
                        <View style={{ flex: 1, padding: 2, justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                multiline={true}
                                value={this.state.New_Material}
                                style={styles.itemInput}
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

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
});