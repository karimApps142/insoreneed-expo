import { Text } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import BaseView from '@/components/BaseView'
import { BaseHeader } from '@/components/BaseHeader'
import BaseScrollView from '@/components/BaseScrollView'
import SubHeader from '@/components/bookings/SubHeader'

const BookingReview = () => {
    return (
        <BaseView>
            <BaseHeader />
            <BaseScrollView>
                <SubHeader title='Review and book' subtitle='no charge unitl booking request accepted by pro.' />
                <Text className='p-4' onPress={() => router.navigate('/(root)/(tabs)/(toptabs)/upcoming-bookings')}>Continue</Text>
            </BaseScrollView>

        </BaseView>
    )
}

export default BookingReview