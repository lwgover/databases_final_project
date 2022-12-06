import { useState } from 'react';

export default function useuser() {
  const getUser = () => {
    const userString = localStorage.getItem('user');
    const useruser = JSON.parse(userString);
    //return 'user';
    console.log("?" + useruser?.user);
     return useruser?.user
  };

  const [user, setToken] = useState(getUser());

  const saveToken = userLocal => {
    localStorage.setItem('user', JSON.stringify(userLocal));
    setToken(userLocal.user);
  };

  return {
    setToken: saveToken,
    user
  }
}