import {Link} from "react-router-dom";
import { useEffect,useContext} from 'react';
import {UserContext} from './UserContext';

export default function Header(){
  // const [username,setUsername]=useState(null);
 
  const {setUserInfo,userInfo}=useContext(UserContext);

  useEffect(()=>{
    fetch('http://localhost:4000/profile',{
      credentials:'include',
    }).then(response=>{
      response.json().then(userInfo=>{
      // setUsername(userInfo.username); 
      setUserInfo(userInfo);
      });
    })
  },[]);

   function logout(){
    fetch('http://localhost:4000/logout',{
      credentials: 'include',
      method: 'POST',
    })
    setUserInfo(null);
   }

    const username=userInfo?.username;

    return (
      <header>
      <Link to="/" className="logo">WhassUp ?</Link>
      <nav>
      {username && (
        <>
          <Link to="/create">Create new post</Link>
          <a onClick={logout}>Log Out</a>
        </>
      )}
      {!username && (
        <>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        </>
      )
    }
      </nav>
    </header>
    )
}