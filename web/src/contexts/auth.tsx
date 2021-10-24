import { useEffect, useState } from 'react';
import { createContext, ReactNode } from 'react';

import { GITHUB_CLIENT_ID } from '../../data.json';
import { api } from '../services/api';

type User = {
  id: string;
  name: string;
  avatar_url: string;
  login: string;
};

type AuthContextData = {
  user: User | null;
  signInUrl: string;
  singOut: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

type AuthResponse = {
  token: string;
  user: User;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${GITHUB_CLIENT_ID}`;
  const [user, setUser] = useState<User | null>(null);

  async function singIn(githubCode: string) {
    const response = await api.post<AuthResponse>('authenticate', {
      code: githubCode,
    });

    const { token, user: userResponse } = response.data;

    localStorage.setItem('@NlwHeat:token', token);

    api.defaults.headers.common.authorization = `Bearer ${token}`;

    setUser(userResponse);
  }

  function singOut() {
    setUser(null);
    localStorage.clear();
  }

  useEffect(() => {
    const token = localStorage.getItem('@NlwHeat:token');

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<User>('profile').then((response) => {
        setUser(response.data);
      });
    }
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes('?code=');

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=');

      window.history.pushState({}, '', urlWithoutCode);

      singIn(githubCode);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signInUrl, user, singOut }}>
      {children}
    </AuthContext.Provider>
  );
}
