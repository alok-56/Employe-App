import AsyncStorage from '@react-native-async-storage/async-storage';
import {BaseUrl} from './Utilitis/BaseUrl';

export const SignUP = async da => {
  try {
    let data = await fetch(`${BaseUrl}/Users/Signup`, {
      method: 'POST',
      body: JSON.stringify(da),
      headers: {
        'content-type': 'application/json',
      },
    });

    data = await data.json();

    return data;
  } catch (error) {
    return error.message;
  }
};

export const Signin = async da => {
  try {
    let data = await fetch(`${BaseUrl}/Users/Signin`, {
      method: 'POST',
      body: JSON.stringify(da),
      headers: {
        'content-type': 'application/json',
      },
    });

    data = await data.json();

    return data;
  } catch (error) {
    return error.message;
  }
};

export const saveCheck = async da=> {
  try {
    let data = await fetch(`${BaseUrl}/Check/create`, {
      method: 'POST',
      body: JSON.stringify(da),
      headers: {
        'content-type': 'application/json',
      },
    });

    data = await data.json();

    return data;
  } catch (error) {
    return error.message;
  }
};

export const GetAllCheck = async () => {
  let id = await AsyncStorage.getItem('id');
  try {
    let data = await fetch(`${BaseUrl}/Check/getcheck/${id}`);
    data = await data.json();
    return data;
  } catch (error) {
    return error.message;
  }
};
