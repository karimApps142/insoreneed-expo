import { View, Text } from 'react-native'
import React from 'react'
import BaseButton from '@/components/BaseButton'
import { router } from 'expo-router'

const AddRecipient = () => {
    return (
        <View>
            <BaseButton title='Save' onPress={() => router.back()} />
        </View>
    )
}

export default AddRecipient