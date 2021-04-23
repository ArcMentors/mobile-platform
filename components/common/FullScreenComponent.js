import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import Footer from './Footer'

const FullScreenComponent = ({ children }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView keyboardShouldPersistTaps='always' contentContainerStyle={{ padding: 15 }}>
                {children}
            </ScrollView>
            <Footer />
        </SafeAreaView>
    )
}

export default FullScreenComponent
