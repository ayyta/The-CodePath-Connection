import { useState, useEffect} from 'react'
import { Route, Routes } from "react-router-dom";

import SinglePost from './SinglePost'
import Edit from './Edit'
import AllPost from './AllPost'

const Home = (props) => {
  const { showPopUp, searchTerm, setSearchTerm } = props
  const [posts, setPosts] = useState(null)
  const [render, setRender] = useState(0)

  const [upvoteIsActive, setUpvoteIsActive] = useState(false);
  const [newestIsActive, setNewestIsActive] = useState(false);

  const supabase = props.client

  const activeStyle = {
    color: 'white',
    backgroundColor: 'grey'
  }
  const currentUpvoteStyle = upvoteIsActive ? activeStyle : {};
  const currentNewestStyle = newestIsActive ? activeStyle : {};


  async function getPosts () {
    setUpvoteIsActive(false)
    setNewestIsActive(false)
    const { data, error } = await supabase.from('posts').select();
    if (error) {
      console.warn(error)
    } else {
      setPosts(data)
    }
  }

  useEffect(() => {
    getPosts()
  }, [showPopUp, render])

  useEffect(() => {
    // This useEffect will run after the component re-renders
    if (searchTerm.length === 0) {
      return
    }
    // setsearch term to something
    if (posts) {
      setPosts(posts);
      setSearchTerm(searchTerm)

    }
  }, [posts]);

  useEffect(() => {
    if (searchTerm.length === 0) {
      setUpvoteIsActive(false)
      setNewestIsActive(false)
      getPosts()
      return
    }
    if (posts && searchTerm) {
      setPosts((prevPosts) =>
        prevPosts.filter((post) =>
          post.title.toLowerCase().startsWith(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm]);
  
  const handleFilterByUpvotes = () => {
    setUpvoteIsActive(true)
    setNewestIsActive(false)
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
    setNewestIsActive(true)
    setUpvoteIsActive(false)

    setPosts(
      Object.entries(posts)
      .map(([key, value]) => ({
        key, ...value}))
      .sort((b,a) => returnDifferenceInMilli(b.created_at) - returnDifferenceInMilli(a.created_at))

    )
  }


  return (
    <>
    <div className="all-post-container">
      <Routes>
        <Route path='/' element={posts ? <AllPost posts={posts} currentNewestStyle={currentNewestStyle}
          handleFilterByNewest={handleFilterByNewest} currentUpvoteStyle={currentUpvoteStyle} 
          handleFilterByUpvotes={handleFilterByUpvotes}/> : null}/>

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