import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AuthPage from './AuthPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import UserPage_1 from './UserPage_1';
import purchaseOrder from './purchaseOrder';
import salesOrder from './salesOrder';
import salesOrder_2 from './salesOrder_2';
import ViewPurchaseOrder from './ViewPurchaseOrder';
import Approvals from './Approvals';
import Approvals_2 from './Approvals_2';
import Accepted from './Accepted';
import Accepted_2 from './Accepted_2';
import ViewSalesOrder from './ViewSalesOrder';
import SalesApprovals from './SalesApprovals';
import SalesApprovals_2 from './SalesApprovals_2';
import SalesAccepted from './SalesAccepted';
import SalesAccepted_2 from './SalesAccepted_2';
import Balance from './Balance';
import Payment from './Payment';
import 'react-native-gesture-handler';


const AppStackNavigator = createStackNavigator({
    WelcomeScreen: { screen: AuthPage },
    LoginScreen: { screen: LoginPage },
    SignupScreen: { screen: SignupPage },
    UserScreen_1: { screen: UserPage_1 },
    PurchaseOrder: { screen: purchaseOrder },
    SalesOrder: { screen: salesOrder },
    SalesOrder_2: { screen: salesOrder_2 },
    ViewOrder: { screen: ViewPurchaseOrder },
    Approvals: { screen: Approvals },
    Approvals_2: { screen: Approvals_2 },
    Accepted: { screen: Accepted },
    Accepted_2: { screen: Accepted_2 },
    ViewSalesOrder: { screen: ViewSalesOrder },
    SalesApprovals: { screen: SalesApprovals },
    SalesApprovals_2: { screen: SalesApprovals_2 },
    SalesAccepted: { screen: SalesAccepted },
    SalesAccepted_2: { screen: SalesAccepted_2 },
    Balance: { screen: Balance },
    Payment: { screen: Payment },


},
    {
        headerMode: 'none',
    }
);

const Container = createAppContainer(AppStackNavigator);

export default Container;