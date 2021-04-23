import React from 'react'
import { Text } from 'react-native'

const TextStyle = ({ color, fontSize, style, children, ...props }) => {
    return (
        <Text
            style={{
                fontSize: !fontSize ? 18 : fontSize,
                color: !color ? '#000' : color,
                ...(style || {})
            }}
            {...props}
        >
            {children}
        </Text>
    )
}

export default TextStyle
