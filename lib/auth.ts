import * as Linking from "expo-linking";
import { fetchApi } from "./fetch";
import { AuthEndpoints } from "@/server/apis";
import { showNotification } from "@/utility/toast-service";
import { getCalendars, getLocales } from "expo-localization";


export const googleOAuth = async (
  startOAuthFlow: any,
  url: string,
  setLoading: (loading: boolean) => void,
  session: any,
  onSuccess: (data: FetchApiResponse) => void
) => {
  const { currencyCode, regionCode } = getLocales()[0];
  const { timeZone } = getCalendars()[0];
  try {
    if (session?.user) {
      setLoading(true);
      fetchApi<FetchApiResponse | AuthSignUpData>({
        method: "POST",
        url: AuthEndpoints.SOCIAL_SIGN_UP,
        data: {
          name: `${session?.user.firstName} ${session?.user.lastName}`,
          email: session?.user.emailAddresses[0].emailAddress,
          role: "customer",
          password: "password",
          password_confirmation: "password",
          clerk_id: session?.user.id,
          provider: "google",
          email_verified_at: new Date(),
          currency_code:currencyCode,
          region_code:regionCode,
          time_zone:timeZone,
        },
        displayErrors: false,
      })
        .then((data) => {
          if ("access_token" in data) {
            onSuccess(data);
          }
        })
        .catch((err: any) => {
          showNotification("error", err?.message);
        })
        .finally(() => {
          setLoading(false);
        });
      return;
    }

    const { createdSessionId, setActive, signUp } = await startOAuthFlow({
      redirectUrl: Linking.createURL(url),
    });

    if (createdSessionId) {
      if (setActive) {
        await setActive({ session: createdSessionId });
        if (signUp.createdUserId) {
          setLoading(true);

          fetchApi<FetchApiResponse | AuthSignUpData>({
            method: "POST",
            url: AuthEndpoints.SOCIAL_SIGN_UP,
            data: {
              name: `${signUp.firstName} ${signUp.lastName}`,
              email: signUp.emailAddress,
              role: "customer",
              password: "password",
              password_confirmation: "password",
              clerk_id: signUp.createdUserId,
              provider: "google",
              email_verified_at: new Date(),
              currency_code:currencyCode,
              region_code:regionCode,
              time_zone:timeZone,
            },
            displayErrors: false,
          })
            .then((data) => {
              if ("access_token" in data) {
                onSuccess(data);
              }
              showNotification(
                "success",
                "You have successfully signed in with Google"
              );
            })
            .catch((err) => {
              showNotification("error", err?.message);
            })
            .finally(() => {
              setLoading(false);
            });
        }
      }
      return;
    }

    showNotification("error", "An error occurred while signing in with Google");
  } catch (err: any) {
    if (err.errors[0]?.code !== "session_exists") {
      showNotification("error", err?.errors[0]?.longMessage);
    }
  }
};
