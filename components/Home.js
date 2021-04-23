import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import FullScreenComponent from './common/FullScreenComponent'
import { Text, Button, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'


const Home = ({ reducer }) => {
    const navigation = useNavigation()

    useEffect(() => {
        if (reducer.isAuth) {
        }
    }, [reducer.isAuth])


    return (
        <FullScreenComponent>
            {!reducer.isAuth && (
                <View style={styles.marginSpace}>
                    <Button title='Login' onPress={() => navigation.navigate('/login')} />
                </View>
            )}
            {!reducer.isAuth && (
                <View style={styles.marginSpace}>
                    <Button title='Register' onPress={() => navigation.navigate('/registration')} />
                </View>
            )}
            {reducer.isAuth && (
                <View>
                    <Text>Welcome...</Text>
                </View>
            )}
        </FullScreenComponent>
    )
}

export default connect((props) => {
    return props
}, null)(Home)

const styles = {
    marginSpace: {
        marginTop: 15
    },
    headFont: {
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 5
    },
    detailFont: {
        fontWeight: 'bold',
        fontSize: 20
    }
}
