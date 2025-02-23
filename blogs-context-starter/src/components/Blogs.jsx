import React, { useContext } from 'react'
import { AppContext } from '../Context/AppContext';
import Spinner from './Spinner';

const Blogs = () => {

  //consume
  const {posts, loading} = useContext(AppContext);
  console.log("Printing inside blogs component")
  console.log(posts);

  return (
    <div>
        {
          loading ? 
          (<Spinner/>) 
          : 
          (
            posts.length === 0 ? (<div>
              <p>No Post Found</p>
            </div>) : (posts.map( (post) => (
              <div key={post.id}>
                <p className='font-bold'>{post.title}</p>
                <p>
                  By <span>{post.author}</span> On <span>{post.category}</span>
                </p>
                <p>
                  Posted on {post.date}
                </p>
                <p>{post.content}</p>
                <div>
                  {post.tag.map( (tag, index) => {
                    return <span key={index}>{'#${tag}'}</span>
                  })}
                </div>
              </div>
            )))
          )
        }
    </div>
  )
}

export default Blogs;