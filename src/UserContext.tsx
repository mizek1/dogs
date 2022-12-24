import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './api';

interface UserData {
  id: number;
  nome: string;
  email: string;
  username: string;
}

interface ContextType {
  userLogin: (username: string, password: string) => Promise<void>;
  userLogout: () => Promise<void>;
  userData: UserData | null;
  error: string | null;
  loading: boolean;
  login: boolean | null;
}

export const UserContext = React.createContext<ContextType>({} as ContextType);

export const UserStorage = ({ children }: any) => {
  const [userData, setUserData] = React.useState<UserData | null>(null);
  const [login, setLogin] = React.useState<boolean | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const userLogout = React.useCallback(async () => {
    setUserData(null);
    setError(null);
    setLoading(false);
    setLogin(false);
    window.localStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);

  const userLogin = async (username: string, password: string) => {
    try {
      setError(null);
      setLoading(true);

      const { url, options } = TOKEN_POST({ username, password });
      const response = await fetch(url, options);

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      const { token } = await response.json();

      window.localStorage.setItem('token', token);
      await getUser(token);
      navigate('/conta');
    } catch (error: any) {
      setError(error.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  };

  const getUser = async (token: string) => {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const data = (await response.json()) as UserData;
    setUserData(data);
    setLogin(true);
  };

  React.useEffect(() => {
    const autoLogin = async () => {
      const token = window.localStorage.getItem('token');

      if (token) {
        try {
          setError(null);
          setLoading(true);

          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);

          if (!response.ok) throw new Error('Token inválido');

          await getUser(token);
        } catch (error) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    };
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, userData, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
