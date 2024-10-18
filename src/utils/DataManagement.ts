import axios from "axios";

export const PublicFetch = async (url: string) => {
  try {
    const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL_USER + url);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
export const PublicPost = async (url: string, data: any) => {
  try {
    console.log('data in public post is', data);
    
    const response = await axios.post(process.env.NEXT_PUBLIC_SERVER_URL_USER + url, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export const PrivateGet = async (url: string) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL_USER + url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('error on private get', error);
    throw error;
  }
}
export const PrivatePost = async (url: string, data: any) => {
  try {
    console.log('data in private post is', data);
    
    const token = localStorage.getItem('token');
    console.log('token in private post is', token);
    
    if (!token) {
      throw new Error('Token not found');
    }
    const response = await axios.post(process.env.NEXT_PUBLIC_SERVER_URL_USER + url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('error in the axios request is ....',error);
    throw error;
  }
}