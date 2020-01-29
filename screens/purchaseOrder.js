import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Picker,
    ScrollView,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'react-native-elements';

class purchaseOrder extends Component {

    constructor() {
        super();
        this.state = {
            toCompany: '',
            materialList: '',
            isLoading: true,
            UserCompnyName: '',
            GstNo: '',
        }
    }

    async componentDidMount() {
        const UserCompnyName = await AsyncStorage.getItem('cmpny_name');
        const GstNo = await AsyncStorage.getItem('GstNo');

        this.setState({
            UserCompnyName: UserCompnyName,
            GstNo: GstNo,
        })

        return fetch('http://3.15.239.88/php/CompanyNameList.php')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson
                }, function () {
                    // In this block you can do something with new state.
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    materialListFunction = () => {
        if (this.state.materialList.length > 0) {
            if (this.state.toCompany.length <= 0 || this.state.toCompany === "Select the Company Name" || this.state.toCompany === this.state.UserCompnyName) {
                Alert.alert("Select the Company Name");
            }
            else {

                const { toCompany } = this.state;
                const { materialList } = this.state;

                fetch('http://3.15.239.88/php/purchaseOrder.php', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        toCompany: toCompany,
                        materialList: materialList,
                        fromCompany: this.state.UserCompnyName,
                        GstNo: this.state.GstNo,
                    })
                }).then((response) => response.json())
                    .then((responseJson) => {
                        console.log(responseJson);
                        Alert.alert(responseJson);
                    }).catch((error) => {
                        console.error(error);
                    }).done();
                this.props.navigation.navigate("UserScreen_1")
            }
        }
        else {
            Alert.alert("Enter the List");
        }
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
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
                <View style={styles.screen}>
                    <View>
                        <Text style={styles.textStyle}>
                            Purchase Order
                </Text>
                    </View>
                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                                paddingBottom: 20,
                                alignItems: 'center'
                            }}>
                            <Text style={styles.textTo}>
                                To:
                    </Text>
                            <Picker
                                style={styles.picker}
                                selectedValue={this.state.toCompany}
                                onValueChange={(itemValue, itemIndex) => this.setState({ toCompany: itemValue })}
                            >
                                <Picker.Item label="Select the Company Name" />
                                {this.state.dataSource.map((item, key) => (
                                    <Picker.Item label={item.cmpny_name} value={item.cmpny_name} key={key} />)
                                )}
                            </Picker>
                        </View>
                    </View>
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around'
                        }}>
                            <Text style={styles.material} >
                                Material List:
                            </Text>
                            <TouchableOpacity onPress={this.materialListFunction}>
                                <Icon
                                    name="check"
                                    type="Foundation"
                                    size={30}
                                    color="green"
                                    iconStyle={{ padding: 10 }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
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
                        <ScrollView >
                            <View style={{ flex: 1, padding: 2, justifyContent: 'center' }}>
                                {
                                    <TextInput
                                        placeholder="List your Items with Name and Quantity"
                                        autoCorrect={false}
                                        multiline={true}
                                        style={styles.itemInput}
                                        onChangeText={materialList => this.setState({ materialList })}
                                    />
                                }
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View >
            </TouchableWithoutFeedback >
        );
    }
}

export default purchaseOrder

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white'
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '500',
        paddingTop: 20,
        paddingBottom: 20
    },
    textTo: {
        paddingLeft: 15,
        fontSize: 25,
        fontWeight: 'bold'
    },
    picker: {
        paddingLeft: 10,
        width: '80%',
        paddingRight: 10,
        alignContent: "center",
        alignItems: 'center'
    },
    material: {
        fontWeight: 'bold',
        fontSize: 25
    },
    itemInput: {
        textAlignVertical: 'top',
        width: '100%',
        height: 300,
        borderColor: 'black',
        borderWidth: 2,
        fontSize: 25
    },
});

