import * as SecureStore from "expo-secure-store";

export const Bearer_Token = "bearer_token";

export const appTokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
  async removeToken(key: string) {
    try {
      await SecureStore.deleteItemAsync(key);
      return null;
    } catch (err) {
      return;
    }
  },
};
