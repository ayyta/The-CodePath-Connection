import { useState, useEffect} from 'react'
import { Route, Routes } from "react-router-dom";

import Post from './Post'
import SinglePost from './SinglePost'
import Edit from './Edit'

const Home = (props) => {
  const { showPopUp } = props
  const [posts, setPosts] = useState(null)
  const [render, setRender] = useState(0)

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
  }, [showPopUp, render])

  return (
    <>
    <p>Sort By</p>
    
    <div className="all-post-container">
      <Routes>
        <Route path='/' element={posts ? posts.map((postData) => <Post data={postData} />) : null}/>

        {posts && posts.map( (postData) => (
          <>
          <Route path={`/${postData.key}`} element={<SinglePost client={supabase} data={postData} render={setRender}/>}></Route>
          <Route path={`/edit/${postData.key}`} element={<Edit client={supabase} data={postData} render={setRender}/>}></Route>
          </>
        ))}
      </Routes>
      
    </div>
    </>
  )
}

export default Home;