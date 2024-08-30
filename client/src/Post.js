import {format} from 'date-fns'
export default function Post({title,summary,cover,content,createdAt}){
    return (
    <div className="post">
    <div className='image'>
    <img src='https://media.istockphoto.com/id/843408508/photo/photography-camera-lens-concept.jpg?s=612x612&w=0&k=20&c=-tm5TKrPDMakrT1vcOE-4Rlyj-iBVdzKuX4viFkd7Vo=' alt=''/>
    </div>
    
    <div className="text">
    <h2>{title}</h2>
    <p className='info'>
     <a className='author'>Vladimir Hardik</a>
     <time>{format(new Date(createdAt),'MMM d, yyyy')}</time>
    </p>
    <p className='summary'>{summary}</p>
    </div>
    </div>

    )
}