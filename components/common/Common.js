import React from 'react'
import TextStyle from './TextStyle'
import { Alert } from 'react-native'

export const formatNumber = (num) => {
    return num ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : 0
}

export const displayFormatter = (num) => {
    if (!num || isNaN(parseFloat(num))) num = 0
    return formatNumber(parseFloat(num).toFixed(2))
}

export const displayPercent = (num) => {
    return num ? parseFloat(num).toFixed(2) + '%' : ''
}

export const highlightedComponent = (text, display, style, preContent) => {
    return (
        <TextStyle style={{ color: parseFloat(text) > 0 ? 'green' : 'red', fontWeight: 'bold', ...style }}>
            {preContent ? preContent : null} {display === 'percent' ? displayPercent(text) : display ? display : displayFormatter(text)}
        </TextStyle>
    )
}

export function onError(error) {
    let message = error.toString()
    if (!(error instanceof Error) && error.message) {
        message = error.message
    }
    Alert.alert('Error', message, [{ text: 'OK' }])
}

export function onDelete(name, cb) {
    let message = `Are you sure you want to delete ${name}?`
    Alert.alert('Delete Confirmation', message, [
        { text: 'Delete', onPress: () => cb(true) },
        { text: 'Cancel', onPress: () => cb(false) }
    ])
}

export function capitalize(line) {
    return line ? line.charAt(0).toUpperCase() + line.slice(1).toLowerCase() : ''
}

export function testPositiveNumber(value) {
    if (!/^\d+((\.)(\d+)?)?$/.test(value) && value) {
        return false
    } else return true
}
