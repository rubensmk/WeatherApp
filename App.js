import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from './utils/index'
import Home from './src/screens/Home';
import Search from './src/screens/Search';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import store from './src/store';


const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();

const HomeStackScreen = () => (
    <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
);

const SearchStackScreen = () => (
    <SearchStack.Navigator>
        <SearchStack.Screen name="Search" component={Search} />
    </SearchStack.Navigator>
);

const TabsScreen = () => (
    <Tabs.Navigator
        initialRouteName="Home"
        tabBarOptions={{
            activeTintColor: colors.PRIMARY_COLOR,
            style: {
                borderTopColor: colors.BORDER_COLOR,
                borderTopWidth: 1,
                height: 50,
                marginTop: 20
            },
            labelStyle: {
                fontSize: 14,
                fontWeight: 'bold'
            },
            labelPosition: 'beside-icon'
        }} >
        <Tabs.Screen name="Home" component={HomeStackScreen} options={{
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
            )
        }} />
        <Tabs.Screen name="Search" component={SearchStackScreen} options={{
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="map-search-outline" color={color} size={size} />
            )
        }} />
    </Tabs.Navigator>
);

export default () => {

    return (
        <Provider store={store}>
            <NavigationContainer>
                <TabsScreen />
            </NavigationContainer>
        </Provider>

    )

}
