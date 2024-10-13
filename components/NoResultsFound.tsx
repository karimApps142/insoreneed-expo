import { COLORS } from '@/constants/Theme';
import React from 'react';
import { Text, View } from 'react-native';


interface NoResultsFoundProps {
    title?: string;
}

export const NoResultsFound: React.FC<NoResultsFoundProps> = ({ title = 'No Data Found...' }) => {


    return (
        <View >
            <Text className='font-JakartaBold'
                style={{
                    textAlign: 'center',
                    color: COLORS.black,
                    marginTop: 10,
                }}
            >
                {title}
            </Text>
        </View>
    );
};