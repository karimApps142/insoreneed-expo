import { View, Text } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import BaseView from '@/components/BaseView'
import { BaseHeader } from '@/components/BaseHeader'
import BaseScrollView from '@/components/BaseScrollView'
import SubHeader from '@/components/bookings/SubHeader'

const SelcetDateTime = () => {
    return (
        <BaseView>
            <BaseHeader />
            <BaseScrollView>
                <SubHeader title='Preferred date & time' subtitle='select a specific date & time or a range to give your provider more option the exact appointment date & start time will be confirm by your provider and you will receive  a notification' />
                <Text className='p-4' onPress={() => router.navigate('/(root)/booking-review')}>Continue</Text>
            </BaseScrollView>

        </BaseView>
    )
}

export default SelcetDateTime