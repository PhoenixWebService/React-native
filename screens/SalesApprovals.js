import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    Platform,
    FlatList,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'react-native-elements';


export default class Approvals extends Component {
    constructor() {
        super()
        this.state = {
            isLoading: false,
        }
    }

    async componentDidMount() {
        const UserCompnyName = await AsyncStorage.getItem('cmpny_name');

        return fetch('http://3.15.239.88/php/SalesApprovals.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                UserCompanyName: UserCompnyName,
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson === 'No records Found') {
                    this.setState({
                        isLoading: true
                    })
                    Alert.alert('No Orders Found');
                    this.props.navigation.navigate('ViewSalesOrder');
                }
                else {
                    this.setState({
                        isLoading: false,
                        dataSource: responseJson,
                    }, function () {
                        // In this block you can do something with new state.
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    GetApprovalOrderfunction = (id, purchase_date, sales_company, old_material, new_material, purchase_company_gst) => {
        this.props.navigation.navigate('SalesApprovals_2', {
            ID: id,
            PURCHASE_DATE: purchase_date,
            SALES_COMPANY: sales_company,
            OLD_MATERIAL: old_material,
            NEW_MATERIAL: new_material,
            PURCHASE_COMPANY_GST: purchase_company_gst
        });
    }

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#607D8B",
                }} />
        )
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
            <View style={styles.MainContainer}>
                <FlatList
                    data={this.state.dataSource}

                    ItemSeparatorComponent={this.FlatListItemSeparator}

                    renderItem={({ item }) =>
                        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row' }}>
                            <Text style={styles.FlatListItemStyle} >
                                ID:{item.id}
                            </Text>
                            <Icon
                                name="arrow-right"
                                type="Foundation"
                                size={30}
                                color="green"
                                iconStyle={{ padding: 10 }}
                                onPress={this.GetApprovalOrderfunction.bind(
                                    this, item.id,
                                    item.purchase_date,
                                    item.sales_company,
                                    item.old_purchase_material_list,
                                    item.new_purchase_material_list,
                                    item.purchase_company_gst
                                )}
                            />
                        </View>
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 20,
        marginLeft: 5,
        marginRight: 5
    },
    rowViewContainer: {
        fontSize: 20,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },
    FlatListItemStyle: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        margin: 10,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    },
});