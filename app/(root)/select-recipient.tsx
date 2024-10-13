import { View, Text } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import BaseButton from '@/components/BaseButton'
import BaseView from '@/components/BaseView'
import { BaseHeader } from '@/components/BaseHeader'
import BaseScrollView from '@/components/BaseScrollView'
import SubHeader from '@/components/bookings/SubHeader'

const SelectRecipient = () => {
    return (
        <BaseView>
            <BaseHeader />
            <BaseScrollView>
                <SubHeader title='Saved recipients' subtitle='select from your list or add new one' />
                <Text className='p-4' onPress={() => router.navigate('/(root)/select-date-time')}>Continue</Text>
            </BaseScrollView>
            <BaseButton title='Add Recipient' onPress={() => router.navigate('/(root)/add-recipient')} />
        </BaseView>
    )
}

export default SelectRecipient