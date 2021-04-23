import React, { useState } from 'react'
import { Auth } from 'aws-amplify'
import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'
import { setUserAuth } from './config/action'
import TextStyle from './common/TextStyle'
import FullScreenComponent from './common/FullScreenComponent'
import Input from './common/Input'
import { Button, View } from 'react-native'
import { onError } from './common/Common'

function Registration({ setUserAuth }) {
    const navigation = useNavigation()
    const [fields, handleFieldChange] = useState({
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
        confirmationCode: ''
    })
    const [newUser, setNewUser] = useState(null)

    function validateForm() {
        return fields.email.length > 0 && fields.name.length > 0 && fields.password.length > 0 && fields.password === fields.confirmPassword
    }

    function validateConfirmationForm() {
        return fields.confirmationCode.length > 0
    }

    async function handleSubmit() {
        try {
            const newUser = await Auth.signUp({
                username: fields.email,
                password: fields.password,
                attributes: {
                    name: fields.name
                }
            })
            setNewUser(newUser)
        } catch (e) {
            onError(e)
        }
    }

    async function handleConfirmationSubmit() {
        try {
            await Auth.confirmSignUp(fields.email, fields.confirmationCode)
            await Auth.signIn(fields.email, fields.password)
            setUserAuth(true)
            navigation.navigate('/')
        } catch (e) {
            onError(e)
        }
    }

    function renderConfirmationForm() {
        return (
            <View>
                <Input title='Confirmation Code' styleView={{ marginBottom: 5 }} value={fields.confirmationCode} onChange={(e) => handleChange('confirmationCode', e)} />
                <TextStyle style={{ marginBottom: 5, fontSize: 16 }}>Please check your email for the code.</TextStyle>
                <Button
                    title='Verify'
                    onPress={() => {
                        if (validateConfirmationForm()) handleConfirmationSubmit()
                    }}
                />
            </View>
        )
    }

    function renderForm() {
        return (
            <View>
                <Input autoCapitalize='none' title='Email' styleView={{ marginBottom: 5 }} value={fields.email} onChange={(e) => handleChange('email', e)} />
                <Input title='Name' styleView={{ marginBottom: 5 }} value={fields.name} onChange={(e) => handleChange('name', e)} />
                <Input autoCapitalize='none' title='Password' secureTextEntry={true} styleView={{ marginBottom: 15 }} value={fields.password} onChange={(e) => handleChange('password', e)} />
                <Input
                    autoCapitalize='none'
                    title='Confirm Password'
                    secureTextEntry={true}
                    styleView={{ marginBottom: 15 }}
                    value={fields.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e)}
                />
                <Button
                    title='Signup'
                    onPress={() => {
                        if (validateForm()) handleSubmit()
                    }}
                />
            </View>
        )
    }

    function handleChange(k, val) {
        handleFieldChange({ ...fields, [k]: val })
    }

    return (
        <FullScreenComponent>
            <TextStyle fontSize={25} style={{ marginBottom: 15 }}>
                Register
            </TextStyle>
            {newUser === null ? renderForm() : renderConfirmationForm()}
        </FullScreenComponent>
    )
}

export default connect(null, { setUserAuth })(Registration)
