

const Create = (props) => {

  useEffect( () => {
    
  }, [])
  const createPost = () => {
    const titleInput = document.getElementsByClassName('post-title-input')
    const descriptionInput = document.getElementsByClassName('post-caption-input')
    const imageInput = document.getElementsByClassName('post-image-input')


  }

  return (
    <>
    <div className="create-container">
      <p className="create-title">Create a New Post</p>
      <input className="post-title-input" placeholder="Title"></input>
      <textarea rows="4" cols="50" className="post-caption-input"  placeholder="Write a caption..."></textarea>
      <input className="post-image-input" placeholder="Image URL"></input>
      <button onCLick={createPost} className="post-button">Post</button>
    </div>
    </>
  )

}

export default Create