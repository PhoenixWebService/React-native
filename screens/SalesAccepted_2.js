import React, { Component } from 'react';
import {
    View,
    TextInput,
    ScrollView,
    StyleSheet,
    Text,
    KeyboardAvoidingView,
    ActivityIndicator
} from 'react-native';

export default class Accepted_2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Id: '',
            Purchase_Date: '',
            Sales_Company: '',
            Purchase_Company: '',
            Purchase_Material_List: '',
            Purchase_Company_Gst: '',
            isLoading: true,
        }
    }

    componentDidMount() {
        this.setState({
            Id: this.props.navigation.state.params.ID,
            Purchase_Date: this.props.navigation.state.params.PURCHASE_DATE,
            Sales_Company: this.props.navigation.state.params.SALES_COMPANY,
            Purchase_Material_List: this.props.navigation.state.params.PURCHASE_MATERIAL_LIST,
            Purchase_Company_Gst: this.props.navigation.state.params.PURCHASE_COMPANY_GST,
            isLoading: false
        })
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
                        <View style={styles.textContainer}>
                            <View style={styles.textStyle}>
                                <Text style={styles.Text}>ID:</Text>
                                <Text>
                                    {this.state.Id}
                                </Text>
                            </View>
                            <View style={styles.textStyle}>
                                <Text style={styles.Text}>Sold To:</Text>
                                <Text>
                                    {this.state.Sales_Company}
                                </Text>
                            </View>
                            <View style={styles.textStyle}>
                                <Text style={styles.Text}>Sold Date:</Text>
                                <Text>
                                    {this.state.Purchase_Date}
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
                                value={this.state.Purchase_Material_List}
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