import { useState, useEffect} from 'react'
import { Route, Routes } from "react-router-dom";

import Post from './Post'
import SinglePost from './SinglePost'
import Edit from './Edit'

const Home = (props) => {
  const { showPopUp, searchTerm, setSearchTerm } = props
  const [posts, setPosts] = useState(null)
  const [searchPost, setSearchPost] = useState(posts)
  const [render, setRender] = useState(0)

  const supabase = props.client

  async function getPosts () {
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