import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import FullScreenComponent from './common/FullScreenComponent'
import { Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'


const Alert = ({ reducer }) => {
    const navigation = useNavigation()

    return (
        <FullScreenComponent>
            <View>
                <Text>Alerts</Text>
            </View>
        </FullScreenComponent>
    )
}

export default connect((props) => {
    return props
}, null)(Alert)

