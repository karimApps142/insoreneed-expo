import { ScrollView, ScrollViewProps, StyleProp, ViewStyle } from 'react-native';
import React, { ReactNode } from 'react';

interface BaseScrollViewProps extends ScrollViewProps {
    children: ReactNode;
    contentContainerStyle?: StyleProp<ViewStyle>;
}

const BaseScrollView: React.FC<BaseScrollViewProps> = ({ children, contentContainerStyle, ...props }) => {
    return (
        <ScrollView
            contentContainerStyle={[
                {
                    flexGrow: 1,
                    paddingHorizontal: 20,
                    marginTop: 20,
                    paddingBottom: 30,
                },
                contentContainerStyle, // Merge additional styles
            ]}
            {...props}
        >
            {children}
        </ScrollView>
    );
}

export default BaseScrollView;