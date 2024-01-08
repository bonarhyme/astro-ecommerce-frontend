import axios from 'axios';
import { atom, map } from 'nanostores';
import { SERVER_URL } from './auth';
import type { AuthState } from './auth';

export type IUser = Omit<AuthState, 'token'>;
export type IUsers = Array<IUser>;

export const loadingGetProfile = atom<boolean>(false);
export const errorGetProfile = atom<string | undefined>(undefined);
export const getProfileState = map<IUser>();

export const loadingUpdateProfile = atom<boolean>(false);
export const errorUpdateProfile = atom<string | undefined>(undefined);
export const updateProfileState = map<IUser>();

export const loadingUsers = atom<boolean>(false);
export const errorUsers = atom<string | undefined>(undefined);
export const usersState = atom<IUsers>([]);

export const loadingUpdateUser = atom<boolean>(false);
export const errorUpdateUser = atom<string | undefined>(undefined);

export const profileGetRequest = async () => {
  errorGetProfile.set(undefined);
  loadingGetProfile.set(true);
  try {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null;

    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };

    const response = await axios.get<IUser>(`${SERVER_URL}/api/users/profile`, config);

    console.log({ hhh: response });
    getProfileState.set(response.data);
  } catch (error: any) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    errorGetProfile.set(message);
  } finally {
    loadingGetProfile.set(false);
  }
};

export const profileUpdateRequest = async (name: string, email: string) => {
  errorUpdateProfile.set(undefined);
  loadingUpdateProfile.set(true);
  try {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null;

    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };

    const response = await axios.put<IUser>(`${SERVER_URL}/api/users/profile`, { email, name }, config);

    console.log({ hhh: response });
    getProfileState.set(response.data);
  } catch (error: any) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    errorUpdateProfile.set(message);
  } finally {
    loadingUpdateProfile.set(false);
  }
};

export const usersRequest = async () => {
  errorUsers.set(undefined);
  loadingUsers.set(true);
  try {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null;

    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };

    const response = await axios.get<IUsers>(`${SERVER_URL}/api/users/`, config);

    console.log({ hhh: response });
    usersState.set(response.data);
  } catch (error: any) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    errorUsers.set(message);
  } finally {
    loadingUsers.set(false);
  }
};

export const makeAdminRequest = async (id: string) => {
  errorUpdateUser.set(undefined);
  loadingUpdateUser.set(true);
  try {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null;

    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };

    const response = await axios.put<IUser>(`${SERVER_URL}/api/users/${id}`, { isAdmin: true }, config);

    console.log({ hhh: response });
  } catch (error: any) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    errorUpdateUser.set(message);
  } finally {
    loadingUpdateUser.set(false);
  }
};
