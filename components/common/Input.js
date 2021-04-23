import React from 'react'
import { View, TextInput } from 'react-native'
import TextStyle from './TextStyle'

const Input = ({ title, value, onChange, error, styleView, ...props }) => {
    return (
        <View style={styleView}>
            <TextStyle>{title}</TextStyle>
            <TextInput {...props} value={value} onChangeText={onChange} style={{ fontSize: 20, height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 5 }} />
            {error ? <TextStyle color='red'>{error}</TextStyle> : null}
        </View>
    )
}

export default Input
