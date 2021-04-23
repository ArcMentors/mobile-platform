import React from 'react'
import { Auth } from 'aws-amplify'
import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'
import { setUserAuth } from './action'
import TextStyle from '../common/TextStyle'
import FullScreenComponent from '../common/FullScreenComponent'
import { FlatList } from 'react-native'

function SideMenu({ setUserAuth, reducer }) {
    const navigation = useNavigation()

    async function handleLogout() {
        await Auth.signOut()
        setUserAuth(false)
        navigation.navigate('/')
    }

    return (
        <FullScreenComponent>
            <FlatList
                data={
                    reducer.isAuth
                        ? [{ key: 'Logout', onClick: handleLogout }]
                        : [
                              { key: 'Login', onClick: () => navigation.navigate('/login') },
                              { key: 'Register', onClick: () => navigation.navigate('/registration') }
                          ]
                }
                renderItem={({ item }) => (
                    <TextStyle style={styles.item} onPress={item.onClick}>
                        {item.key}
                    </TextStyle>
                )}
            />
        </FullScreenComponent>
    )
}

export default connect(
    (props) => {
        return props
    },
    { setUserAuth }
)(SideMenu)

const styles = {
    item: {
        fontSize: 20,
        paddingVertical: 15,
        borderBottomColor: 'gray',
        borderBottomWidth: 1
    }
}
