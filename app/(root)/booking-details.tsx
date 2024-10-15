import { View } from 'react-native'
import React, { useState } from 'react'
import BaseView from '@/components/BaseView'
import { BaseHeader } from '@/components/BaseHeader'
import BaseScrollView from '@/components/BaseScrollView'
import SubHeader from '@/components/bookings/SubHeader'
import BasePicker from '@/components/BasePicker'
import { locationTypes } from '@/constants/location-picker-data'

const BookingDetails = () => {
    const [selectItem, setSelectedItem] = useState(null);

    return (
        <BaseView>
            <BaseHeader />
            <BaseScrollView>
                <SubHeader title='Booking details' subtitle='You won’t be charged until your booking request is confirmed by the professional' />

                <View className="mt-3">
                    <BasePicker
                        label="Service type"
                        items={locationTypes}
                        pickerLabel="Service type"
                        selectedItem={selectItem}
                        setSelected={(value) => {
                            setSelectedItem(value);
                        }}
                    />
                </View>

                <View className="mt-3">
                    <BasePicker
                        label="Session type"
                        items={locationTypes}
                        pickerLabel="Session types"
                        selectedItem={selectItem}
                        setSelected={(value) => {
                            setSelectedItem(value);
                        }}
                    />
                </View>

                <View className="mt-3">
                    <BasePicker
                        label="Duration"
                        items={locationTypes}
                        pickerLabel="Length"
                        selectedItem={selectItem}
                        setSelected={(value) => {
                            setSelectedItem(value);
                        }}
                    />
                </View>

                <View className="mt-3">
                    <BasePicker
                        label="Type"
                        items={locationTypes}
                        pickerLabel="Treatment Type"
                        selectedItem={selectItem}
                        setSelected={(value) => {
                            setSelectedItem(value);
                        }}
                    />
                </View>

                <View className="mt-3">
                    <BasePicker
                        label="Add-ons"
                        items={locationTypes}
                        pickerLabel="Treatment add-ons"
                        selectedItem={selectItem}
                        setSelected={(value) => {
                            setSelectedItem(value);
                        }}
                    />
                </View>
            </BaseScrollView>
        </BaseView>
    )
}

export default BookingDetails