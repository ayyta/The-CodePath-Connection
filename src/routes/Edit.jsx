import React, { useState } from 'react'

const Edit = (props) => {
  const { client, render } = props
  const { description, key, photos, title } = props.data


  const [postInputs, setPostInputs] = useState({
    inputTitle: title,
    inputDescription: description,
    inputImage: photos
  })

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setPostInputs( (prevInputValues) => ({
      ...prevInputValues,
      [name]: value
    })

    )
  }

  const editPost = () => {
    async function editNewPost () {
      const { inputTitle, inputDescription, inputImage } = postInputs
      const { data, error } = await client
      .from('posts')
      .update({ title: inputTitle, description: inputDescription, photos: inputImage })
      .eq('key', key)
      .select()
  
      if (error) {
        console.warn(error)
      } else {
        alert('Successfully Editted Post')
      }
    }
    editNewPost();
    render()
  }

  return (
    <>
    <div className="create-container">
      <p className="create-title">Edit Post</p>
      <input className="post-title-input" name="inputTitle" value={postInputs.inputTitle} onChange={handleInputChange} placeholder="Title"></input>
      <textarea rows="4" cols="50" className="post-caption-input" name="inputDescription" value={postInputs.inputDescription} onChange={handleInputChange} placeholder="Write a caption..."></textarea>
      <input className="post-image-input" name="inputImage" value={postInputs.inputImage} onChange={handleInputChange} placeholder="Image URL"></input>
      <button onClick={editPost} className="post-button">Edit</button>
    </div>
    </>
  )

}

export default Edit