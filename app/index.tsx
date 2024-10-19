import "react-native-get-random-values";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useAuthenticateUser } from "@/hooks/useAuth";

const Page = () => {

  const { data, isLoading } = useAuthenticateUser();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator animating={isLoading} size="large" />
      </View>
    );
  }

  if (!!data)
    return <Redirect href="/(root)/(tabs)/(toptabs)/upcoming-bookings" />;

  return <Redirect href="/(auth)/welcome" />;
};

export default Page;
