
import React from 'react'
import BaseView from '@/components/BaseView'
import { BaseHeader } from '@/components/BaseHeader'
import BaseInput from '@/components/BaseInput'

const GooglePlaces = () => {
    return (
        <BaseView>
            <BaseHeader />
            <BaseInput label='Adress' placeholder='Enter address here to search' />
        </BaseView>
    )
}

export default GooglePlaces