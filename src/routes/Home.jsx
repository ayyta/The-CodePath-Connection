import { useState, useEffect} from 'react'
import { Route, Routes } from "react-router-dom";

import Post from './Post'
import SinglePost from './SinglePost'

const Home = (props) => {
  const { showPopUp } = props
  const [posts, setPosts] = useState(null)
  const supabase = props.client

  useEffect(() => {
    async function getPosts () {
      const { data, error } = await supabase.from('posts').select();
      if (error) {
        console.warn(error)
      } else {
        console.log(data)

        setPosts(data)
      }
    }
    getPosts()
  }, [showPopUp])

  return (
    <>
    <p>Sort By</p>
    
    <div className="all-post-container">
      <Routes>
        <Route path='/' element={posts ? posts.map((postData) => <Post data={postData} />) : null}/>

        {posts && posts.map( (postData) => (
          <Route path={`/${postData.key}`} element={<SinglePost client={supabase} data={postData}/>}></Route>
        ))}
      </Routes>
      
    </div>
    </>
  )
}

export default Home;