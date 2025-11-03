"use client"
import supabase from '@/services/supabaseClient'
import { User } from 'lucide-react';
import React, { useEffect, useContext, useState}  from 'react'
import { UserDetailContext } from '../UserDetailContext';


const Provider = ({children}) => {

    const [user, setUser] = useState();

    useEffect(() => {
        createNewUser();
    }, []);

  const createNewUser = () => {
    supabase.auth.getUser().then(async ({data: {user}}) => {
    let { data: Users, error } = await supabase
    .from('Users')
    .select("*")
    .eq('email', user?.email);

    console.log(Users);

    if(Users.length == 0){
        const { data, error } = await supabase.from('Users').insert([
            {
                email: user?.email,
                name: user?.user_metadata.name,
                picture: user?.user_metadata.picture
            }
        ]);
         console.log("User created: ", data);
         setUser(data);
        return;
    }
    setUser(Users[0]);
    });
  }

  
    return (
    <UserDetailContext.Provider value={{user, setUser}}>
    <div>{children}</div>
    </UserDetailContext.Provider>
  )
}

export default Provider

export const useUser = () => {
    return useContext(UserDetailContext);
}