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


class salesOrder extends Component {

    constructor(props) {

        super(props);

        this.state = {
            isLoading: true,
            UserCompanyName: '',
        }
    }

    async componentDidMount() {
        const UserCompnyName = await AsyncStorage.getItem('cmpny_name');

        return fetch('http://3.15.239.88/php/salesOrder.php', {
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
                    this.props.navigation.navigate('UserScreen_1');
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

    GetSalesOrderFunction = (id, from_cmpny, gst_no, date, materialList, status) => {
        this.props.navigation.navigate('SalesOrder_2', {
            ID: id,
            FROM_CMPNY: from_cmpny,
            GST_NO: gst_no,
            DATE: date,
            MATERIALlIST: materialList,
            STATUS: status
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

    /*GetFlatListItem(id) {
        Alert.alert(id);
    }*/

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
                            <Text style={[(item.status === 'Pending') ? styles.FlatListItemStyle_Pending : styles.FlatListItemStyle_Accepted]}>
                                Status:{item.status}
                            </Text>
                            <Icon
                                name="pencil"
                                type="Foundation"
                                size={30}
                                color="green"
                                iconStyle={{ padding: 10 }}
                                onPress={this.GetSalesOrderFunction.bind(
                                    this, item.id,
                                    item.from_company,
                                    item.gst_no,
                                    item.date,
                                    item.materialList,
                                    item.status)}
                            />
                        </View>
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }

}

export default salesOrder;

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
    FlatListItemStyle_Pending: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#ff0000',
        padding: 10
    },
    FlatListItemStyle_Accepted: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'green',
        padding: 10
    }
});