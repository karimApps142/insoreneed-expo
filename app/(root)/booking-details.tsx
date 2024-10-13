import { View, Text } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import BaseView from '@/components/BaseView'
import { BaseHeader } from '@/components/BaseHeader'
import BaseScrollView from '@/components/BaseScrollView'
import SubHeader from '@/components/bookings/SubHeader'
import BaseButton from '@/components/BaseButton'

const BookingDetails = () => {
    return (
        <BaseView>
            <BaseHeader />
            <BaseScrollView>
                <SubHeader title='Booking details' subtitle='no charge until booking request accepted by pro.' />
                <Text className='p-4' onPress={() => router.navigate('/(root)/select-recipient')}>Continue</Text>
            </BaseScrollView>
        </BaseView>
    )
}

export default BookingDetails