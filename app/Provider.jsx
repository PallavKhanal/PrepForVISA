"use client"
import supabase from '@/lib/supabase'
import React, { useEffect, useContext, useState}  from 'react'
import { UserDetailContext } from '@/lib/UserDetailContext';
import { ThemeProvider, useTheme } from 'next-themes';

// Syncs the user's saved theme preference from the DB into next-themes
function ThemeSync({ user }) {
  const { setTheme } = useTheme();
  useEffect(() => {
    if (user?.theme) setTheme(user.theme);
  }, [user?.theme]);
  return null;
}

const Provider = ({children}) => {

    const [user, setUser] = useState();

    useEffect(() => {
        createNewUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                createNewUser();
            } else if (event === 'SIGNED_OUT') {
                setUser(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

  const createNewUser = () => {
    supabase.auth.getUser().then(async ({data: {user}}) => {
    if (!user) { setUser(null); return; }

    let { data: Users } = await supabase
      .from('Users')
      .select("*")
      .eq('email', user.email);

    if (Users.length === 0) {
      const { data } = await supabase.from('Users').insert([
        {
          email: user.email,
          name: user.user_metadata?.name || user.email.split('@')[0],
          picture: user.user_metadata?.picture || null,
        }
      ]).select();
      setUser(data?.[0]);
      return;
    }
    setUser(Users[0]);
    });
  }

    return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <UserDetailContext.Provider value={{user, setUser}}>
        <ThemeSync user={user} />
        <div>{children}</div>
      </UserDetailContext.Provider>
    </ThemeProvider>
  )
}

export default Provider

export const useUser = () => {
    return useContext(UserDetailContext);
}