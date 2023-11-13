import { useState, useEffect} from 'react'

import Post from './Post'

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
    <p>home page</p>
    <div>
      {posts ? posts.map((postData) => <Post data={postData} />) : null}

    </div>
    <div>
      <p>title</p>
      <p>image</p>

    </div>
    </>
  )
}

export default Home;