import React, { useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/FontAwesome'
import Home from '../Home'
import { setUserAuth, setMembership } from './action'
import { connect } from 'react-redux'
import Login from '../Login'
import SideMenu from './SideMenu'
import Registration from '../Registration'
import Alert from '../Alert'
import List from '../List'

const Stack = createStackNavigator()

const HeaderOptions = ({ navigation }) => {
    return {
        title: 'ArcPlatform',
        animationEnabled: false,
        headerLeft: () => <Icon name='home' size={30} style={{ paddingLeft: 15 }} onPress={() => navigation.navigate('/')} />,
        headerRight: () => <Icon name='bars' size={30} style={{ paddingRight: 15 }} onPress={() => navigation.navigate('/side-menu')} />
    }
}

const SideMenuOptions = ({ navigation }) => {
    return {
        title: 'ArcPlatform',
        animationEnabled: false,
        headerLeft: () => <Icon name='home' size={30} style={{ paddingLeft: 15 }} onPress={() => navigation.navigate('/')} />,
        headerRight: () => <Icon name='bars' size={30} style={{ paddingRight: 15 }} onPress={() => navigation.pop()} />
    }
}

const Route = ({ setUserAuth, reducer, setMembership }) => {
    const checkIfLoggedIn = async () => {
        try {
            await Auth.currentSession()
            setUserAuth(true)
        } catch (e) {
            setUserAuth(false)
        }
    }

    useEffect(() => {
        checkIfLoggedIn()
    }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='/'>
                <Stack.Screen name='/' component={Home} options={HeaderOptions} />
                <Stack.Screen name='/login' component={Login} options={HeaderOptions} />
                <Stack.Screen name='/side-menu' component={SideMenu} options={SideMenuOptions} />
                <Stack.Screen name='/registration' component={reducer.isAuth ? Home : Registration} options={HeaderOptions} />
                <Stack.Screen name='/list' component={List} options={HeaderOptions} />
                <Stack.Screen name='/alert' component={Alert} options={HeaderOptions} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default connect(
    (props) => {
        return props
    },
    { setUserAuth, setMembership }
)(Route)
