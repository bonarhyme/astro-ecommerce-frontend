import { atom, map } from 'nanostores';
import axios from 'axios';

export interface AuthState {
  id: string;
  _id?: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

export const authInitialState = {
  id: '',
  name: '',
  email: '',
  isAdmin: false,
  token: '',
};

export const loadingRegister = atom<boolean>(false);
export const errorRegister = atom<string | undefined>(undefined);

export const loadingLogin = atom<boolean>(false);
export const errorLogin = atom<string | undefined>(undefined);

export const authState = map<AuthState>(authInitialState);

export const SERVER_URL = 'http://localhost:5211';

export const registerRequest = async (name: string, email: string, password: string) => {
  errorRegister.set(undefined);
  loadingRegister.set(true);
  try {
    const response = await axios.post<AuthState>(`${SERVER_URL}/api/users/register`, { name, email, password });

    authState.set({ ...authState.get(), ...response.data });
    localStorage.setItem('user', JSON.stringify(response.data));
    window.location.href = '/';
  } catch (error: any) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    errorRegister.set(message);
  } finally {
    loadingRegister.set(false);
  }
};

export const loginRequest = async (email: string, password: string) => {
  errorLogin.set(undefined);
  loadingLogin.set(true);
  try {
    const response = await axios.post<AuthState>(`${SERVER_URL}/api/users/login`, { email, password });

    authState.set({ ...authState.get(), ...response.data });
    localStorage.setItem('user', JSON.stringify(response.data));
    window.location.href = '/';
  } catch (error: any) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    errorLogin.set(message);
  } finally {
    loadingLogin.set(false);
  }
};
