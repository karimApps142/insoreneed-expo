import { COLORS, SIZES } from '@/constants/Theme';
import React, { ReactNode } from 'react';
import { createNotifications, FadeInFadeOut, MoveDown, SlideInLeftSlideOutRight } from 'react-native-notificated';

interface NotificationWrapperProps {
    children: ReactNode;
}

const NotificationWrapper: React.FC<NotificationWrapperProps> = ({ children }) => {
    const { NotificationsProvider } = createNotifications({
        isNotch: true,
        duration: 1500,
        defaultStylesSettings: {
            darkMode: false,
            globalConfig: {
                borderType: 'accent',
                defaultIconType: 'no-icon'
            },
        },
    });

    return (
        <NotificationsProvider>
            {children}
        </NotificationsProvider>
    );
};

export default NotificationWrapper;