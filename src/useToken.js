import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    console.log(tokenString);
    if(tokenString == 'undefined'){
      console.log("hello Undefined");
    }
    const userToken = JSON.parse(tokenString);
    //return 'token';
    console.log("?" + userToken?.token);
     return userToken?.token
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}