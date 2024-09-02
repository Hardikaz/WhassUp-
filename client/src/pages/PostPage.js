import {useEffect, useState,useContext} from "react";
import {useParams} from "react-router-dom"
import { UserContext } from "../UserContext";

export default function PostPage()
{
    const [postInfo, setPostInfo]=useState(null);
    const {userInfo}=useContext(UserContext);
    const {id}=useParams();

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
          .then(response => {
            response.json().then(postInfo => {
              setPostInfo(postInfo);
            });
          });
      }, []);

    if(!postInfo) return '';
    return (
        <div className="post-page">
        <div className="image">
        <img src={`http://localhost:4000/${postInfo.cover}`} alt='' />
        </div>
         <h1>{postInfo.title}</h1>
         <div dangerouslySetInnerHTML={{__html:postInfo.content}}></div>
        </div>
    )
}
