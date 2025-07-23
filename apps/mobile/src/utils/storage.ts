import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// This module provides a simple interface for storing key-value pairs securely.
export const storage = {
  /**
   * @description Gets an item from storage.
   * @author Killian Brisset
   * @date 23/07/2025
   * @param {string} key
   * @returns {*}  {(Promise<string | null>)}
   */
  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === 'web') {
      return Promise.resolve(localStorage.getItem(key));
    }
    return await SecureStore.getItemAsync(key);
  },

  /**
   * @description Sets an item in storage.
   * @author Killian Brisset
   * @date 23/07/2025
   * @param {string} key
   * @param {string} value
   * @returns {*}  {Promise<void>}
   */
  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
      return Promise.resolve();
    }
    await SecureStore.setItemAsync(key, value);
  },

  /**
   * @description Deletes an item from storage.
   * @author Killian Brisset
   * @date 23/07/2025
   * @param {string} key
   * @returns {*}  {Promise<void>}
   */
  async deleteItem(key: string): Promise<void> {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
      return Promise.resolve();
    }
    await SecureStore.deleteItemAsync(key);
  },
};
