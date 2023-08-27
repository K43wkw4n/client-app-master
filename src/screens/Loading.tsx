import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native'
import React from 'react'

export default function Loading() {
    return (
        <>
            <Modal>
                <View style={Styles.container}>
                    <ActivityIndicator size="large" color="black" />
                </View>
            </Modal>
        </>
    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
    },
})