import { View } from 'react-native'
import React from 'react'
import BaseButton from '@/components/BaseButton'
import { appTokenCache, Bearer_Token } from '@/server/local-storage'
import { router } from 'expo-router'

const Profile = () => {
    return (
        <View className='flex-1 items-center justify-center p-4'>
            <BaseButton title='Logout' onPress={() => {
                appTokenCache.removeToken(Bearer_Token);
                router.replace('/(auth)/sign-in')
            }} />
        </View>
    )
}

export default Profile