import { View, Text } from "react-native";
import React from "react";

interface SubHeaderProps {
  title?: string;
  subtitle?: string;
}

const SubHeader: React.FC<SubHeaderProps> = ({ title, subtitle }) => {
  return (
    <View className="mb-2">
      {title ? <Text className='text-[30px] font-JakartaBold text-black'>{title}</Text> : null}
      {subtitle ? <Text className='pr-8 text-gray-500 mt-2 leading-5'>{subtitle}</Text> : null}
    </View>
  );
};

export default SubHeader;