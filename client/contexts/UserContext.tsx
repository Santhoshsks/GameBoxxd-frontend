import React, { createContext, useEffect, useState, Dispatch, SetStateAction } from 'react';
import { account } from "@/appwriteClient";

interface UserContextType {
  user: any; 
  loading: boolean;
  setUser: Dispatch<SetStateAction<any>>; 
}

export const UserContext  = createContext<UserContextType>({
  user: null,
  loading: true, 
  setUser: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    account.get()
      .then((userData) => {
        setUser(userData);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false); 
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}
