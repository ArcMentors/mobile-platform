import React from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'

const SIZE = 30

const Footer = () => {
    const navigation = useNavigation()

    return (
        <View style={styles.footer}>
            <Icon name='list' size={SIZE} onPress={() => navigation.navigate('/list')} />
            <Icon name='home' size={SIZE} onPress={() => navigation.navigate('/')} />
            <Icon name='bell' size={SIZE} onPress={() => navigation.navigate('/alert')} />
        </View>
    )
}

export default Footer

const styles = {
    footer: {
        height: 70,
        borderWidth: 1,
        borderTopColor: 'gray',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}
