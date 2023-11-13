import React, { useState } from 'react'

const Create = (props) => {
  const { client, showPopUp } = props

  const [postInputs, setPostInputs] = useState({
    inputTitle: '',
    inputDescription: '',
    inputImage: ''
  })

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setPostInputs( (prevInputValues) => ({
      ...prevInputValues,
      [name]: value
    })

    )
  }

  const createPost = () => {
    async function createNewPost () {
      const { inputTitle, inputDescription, inputImage } = postInputs
      const { data, error } = await client
      .from('posts')
      .insert([{ title: inputTitle, description: inputDescription, photos: inputImage }])
      .select()

      if (error) {
        console.warn(error)
      } else {
        //console.log(data)
        alert('Successfully Created New Post')
        showPopUp(false)
      }
    }
    createNewPost();
  }

  const resetInputs = () => {
    setPostInputs( { 
      inputTitle: '',
      inputDescription: '',
      inputImage: ''
    })
  }


  return (
    <>
    <div className="create-container">
      <p className="create-title">Create a New Post</p>
      <input className="post-title-input" name="inputTitle" value={postInputs.inputTitle} onChange={handleInputChange} placeholder="Title"></input>
      <textarea rows="4" cols="50" className="post-caption-input" name="inputDescription" value={postInputs.inputDescription} onChange={handleInputChange} placeholder="Write a caption..."></textarea>
      <input className="post-image-input" name="inputImage" value={postInputs.inputImage} onChange={handleInputChange} placeholder="Image URL"></input>
      <button onClick={() => {createPost(); resetInputs()}} className="post-button">Post</button>
    </div>
    </>
  )

}

export default Create