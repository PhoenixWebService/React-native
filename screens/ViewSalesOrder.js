import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Button,
    TouchableOpacity
} from 'react-native';
import Colors from '../constants/color';
import Card from '../components/card';


class ViewPurchaseOrder extends Component {

    render() {

        return (
            <View style={styles.screen}>
                <Card style={styles.inputContainer}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity>
                            <View style={styles.button}>
                                <Button
                                    title="Approvals"
                                    color={Colors.primary}
                                    onPress={() => this.props.navigation.navigate('SalesApprovals')}
                                />
                            </View>
                            <View style={styles.button}
                            ><Button
                                    title="Accepted"
                                    color={Colors.secondary}
                                    onPress={() => this.props.navigation.navigate('SalesAccepted')}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </Card>
            </View>
        )
    }
}

export default ViewPurchaseOrder;

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

})