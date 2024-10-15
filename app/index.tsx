import 'react-native-get-random-values';
import { Redirect } from "expo-router";

const Page = () => {
  const isSignedIn = true;

  if (isSignedIn) return <Redirect href="/(root)/(tabs)/(toptabs)/upcoming-bookings" />;

  return <Redirect href="/(auth)/welcome" />;
};

export default Page;