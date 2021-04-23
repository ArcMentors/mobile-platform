import React from 'react'
import { View } from 'react-native'
import TextStyle from './TextStyle'
import DropDownPicker from 'react-native-dropdown-picker'

const SelectBox = ({ title, value = null, header = null, onChange, error, placeholder = '', styleView, options = [], style = {} }) => {
    return (
        <View style={styleView}>
            {title && <TextStyle>{title}</TextStyle>}
            {header}
            <DropDownPicker
                items={options.map((x) => ({ label: x, value: x }))}
                defaultValue={value}
                style={{ borderColor: 'black', ...style }}
                itemStyle={{ justifyContent: 'flex-start' }}
                placeholder={placeholder}
                onChangeItem={(e) => onChange(e.value)}
            />
            {error ? <TextStyle color='red'>{error}</TextStyle> : null}
        </View>
    )
}

export default SelectBox
