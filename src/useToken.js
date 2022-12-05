import { useState } from 'react';

export default function useuser() {
  const getUser = () => {
    const userString = localStorage.getItem('user');
    console.log(userString);
    if(userString == 'undefined'){
      console.log("hello Undefined");
    }
    const useruser = JSON.parse(userString);
    //return 'user';
    console.log("?" + useruser?.user);
     return useruser?.user
  };

  const [user, setToken] = useState(getUser());

  const saveToken = useruser => {
    localStorage.setItem('user', JSON.stringify(useruser));
    setToken(useruser.user);
  };

  return {
    setToken: saveToken,
    user
  }
}