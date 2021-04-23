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

function Login({ setUserAuth }) {
    const navigation = useNavigation()
    const [passwordChallenge, setChallenge] = useState(false)
    const [fields, handleFieldChange] = useState({ email: '', password: '', name: '', newPassword: '' })
    const [user, setUser] = useState(null)

    function validateForm() {
        return fields.email.length > 0 && fields.password.length > 0
    }

    async function handleSubmit() {
        setChallenge(false)
        try {
            await Auth.signIn(fields.email, fields.password).then((user) => {
                if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                    setChallenge(true)
                    setUser(user)
                } else {
                    setUserAuth(true)
                    navigation.navigate('/')
                }
            })
        } catch (e) {
            onError(e)
        }
    }

    function validateResetForm() {
        return fields.email.length > 0 && fields.newPassword.length > 0
    }

    function handleChange(k, val) {
        handleFieldChange({ ...fields, [k]: val })
    }

    async function handleReset() {
        try {
            await Auth.completeNewPassword(user, fields.newPassword, { email: fields.email }).then((user) => {
                setUserAuth(true)
                navigation.navigate('/')
            })
        } catch (e) {
            onError(e)
        }
    }

    return (
        <FullScreenComponent>
            <TextStyle fontSize={25} style={{ marginBottom: 15 }}>
                Login
            </TextStyle>
            {!passwordChallenge ? (
                <View>
                    <Input autoCapitalize='none' title='Email' styleView={{ marginBottom: 5 }} value={fields.email} onChange={(e) => handleChange('email', e)} />
                    <Input autoCapitalize='none' title='Password' secureTextEntry={true} styleView={{ marginBottom: 15 }} value={fields.password} onChange={(e) => handleChange('password', e)} />
                    <Button
                        title='Login'
                        onPress={() => {
                            if (validateForm()) handleSubmit()
                        }}
                    />
                </View>
            ) : (
                <View>
                    <Input autoCapitalize='none' title='Email' styleView={{ marginBottom: 5 }} value={fields.email} onChange={(e) => handleChange('email', e)} />
                    <Input
                        autoCapitalize='none'
                        title='New Password'
                        secureTextEntry={true}
                        styleView={{ marginBottom: 15 }}
                        value={fields.newPassword}
                        onChange={(e) => handleChange('newPassword', e)}
                    />
                    <Button
                        title='Login'
                        onPress={() => {
                            if (validateResetForm()) handleReset()
                        }}
                    />
                    {/* <Button title='Register' onPress={() => navigation.navigate('/registration')} /> */}
                </View>
            )}
        </FullScreenComponent>
    )
}

export default connect(null, { setUserAuth })(Login)
