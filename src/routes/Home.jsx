import { useState, useEffect} from 'react'

const Home = (props) => {
  const [posts, setPosts] = useState([])
  const supabase = props.client

  useEffect(() => {
    async function getPosts () {
      const { data, error } = await supabase.from('posts').select();
      if (error) {
        console.warn(error)
      } else {
        console.log(data)
      }
    }
    getPosts()
  }, [])


  return (
    <>
    <p>home page</p>
    </>
  )
}

export default Home;