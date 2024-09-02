import './App.css';
import Header from './Header'
import Layout from './Layout'
import IndexPage from './pages/IndexPage'
import CreatePost from './pages/CreatePost'
import {Route,Routes} from "react-router-dom"
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PostPage from './pages/PostPage'
import {UserContextProvider} from "./UserContext"

function App() {
  return (

    <UserContextProvider>
     
     <Routes>
     <Route path="/" element={<Layout/>}>
     <Route index element={<IndexPage/>}/>
     <Route path="/login" element={<LoginPage/>}/>
     <Route path="/register" element={<RegisterPage/>}/>
     <Route path="/create" element={<CreatePost/>}></Route>
     <Route path="/post/:id" element={<PostPage />}/>
     </Route>
    </Routes>
   
    </UserContextProvider>
    
   
  );
}

export default App;
