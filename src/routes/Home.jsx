import { useState, useEffect} from 'react'
import { Route, Routes } from "react-router-dom";

import Post from './Post'
import SinglePost from './SinglePost'
import Edit from './Edit'
import NavBar from '../components/NavBar'

const Home = (props) => {
  const { showPopUp, searchTerm } = props
  const [posts, setPosts] = useState(null)
  const [render, setRender] = useState(0)

  const supabase = props.client

  useEffect(() => {
    async function getPosts () {
      const { data, error } = await supabase.from('posts').select();
      if (error) {
        console.warn(error)
      } else {
        setPosts(data)
      }
    }
    getPosts()
  }, [showPopUp, render])


  useEffect(() => {
    // This useEffect will run after the component re-renders
    if (posts) {
      // Reset posts to the original data before filtering
      setPosts(posts);
    }

    // Run setRender first
    setRender((prevRender) => prevRender + 1);
  }, [posts]);

  useEffect(() => {
    // This useEffect will run after the component re-renders
    // Filter posts only when the initial data is available
    if (posts && searchTerm) {
      setPosts((prevPosts) =>
        prevPosts.filter((post) =>
          post.title.toLowerCase().startsWith(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, posts]);

  const handleFilterByUpvotes = () => {
    setPosts(
      Object.entries(posts)
      .map(([key, value]) => ({ 
        key, ...value}))
      .sort((a, b) => b.upvotes - a.upvotes)
    )
  }

  const handleFilterByNewest = () => {
    const returnDifferenceInMilli = (created_at) => {
      const pastDate = new Date(created_at);
      const currentDate = new Date();
      return currentDate - pastDate;
    }

    setPosts(
      Object.entries(posts)
      .map(([key, value]) => ({
        key, ...value}))
      .sort((a,b) => returnDifferenceInMilli(b.created_at) - returnDifferenceInMilli(a.created_at))

    )

  }

  return (
    <>
    <p>Sort By</p>
    <button onClick={handleFilterByNewest}>newest</button>
    <button onClick={handleFilterByUpvotes}>upvotes</button>
    <div className="all-post-container">
      <Routes>
        <Route path='/' element={posts ? posts.map((postData) => <Post data={postData} />) : null}/>

        {posts && posts.map( (postData) => (
          <>
          <Route path={`/${postData.key}`} element={<SinglePost client={supabase} data={postData} render={() => setRender(render+1)}/>}></Route>
          <Route path={`/edit/${postData.key}`} element={<Edit client={supabase} data={postData} render={() => setRender(render+1)}/>}></Route>
          </>
        ))}
      </Routes>
      
    </div>
    </>
  )
}

export default Home;