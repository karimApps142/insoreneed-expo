import { FlatList } from 'react-native'

import React from 'react'
import BaseView from '@/components/BaseView'
import { bookingsData } from '@/constants/dummyData'
import BookingItem from '@/components/navigation/BookingItem';

const UpcomingBookings = () => {
    return (
        <BaseView style={{ paddingTop: 5, paddingBottom: 20, paddingHorizontal: 20, backgroundColor: '#F5F5F7' }}>
            <FlatList keyExtractor={item => item.id}
                data={bookingsData}
                renderItem={({ item }) =>
                    <BookingItem item={item} />
                }
            />
        </BaseView>
    )
}

export default UpcomingBookings