import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAsyncStorage = async (name, value) => {
  try {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    await AsyncStorage.setItem(name, value);
  } catch (e) {
    console.log(e);
  }
};

export const getAsyncStorage = async (name) => {
  try {
    let value = await AsyncStorage.getItem(name);
    if (/^\{.*\}$/.test(value)) {
      value = JSON.parse(value);
    }

    return value;
  } catch (e) {
    console.log(e);
  }
};

export const removeAsyncStorage = async (name) => {
  try {
    await AsyncStorage.removeItem(name);
  } catch (e) {
    console.log(e);
  }
};

export const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log(e);
  }
};
