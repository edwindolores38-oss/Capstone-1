import { createContext, useContext, useEffect, useState } from 'react';

const KEY='locallens_token';
const AuthContext = createContext();

export function AuthProvider({ children }){
  const [token, setTokenState] = useState('');

  useEffect(()=>{
    const t = localStorage.getItem(KEY);
    if (t) setTokenState(t);
  },[]);

  function setToken(t){
    setTokenState(t);
    if (t) localStorage.setItem(KEY, t);
    else localStorage.removeItem(KEY);
  }
  function logout(){ setToken(''); }

  return <AuthContext.Provider value={{ token, setToken, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth(){ return useContext(AuthContext); }
