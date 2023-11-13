import React from 'react';
import { useState, useEffect } from 'react'

const timeFrom = (created_at) => {
  const pastDate = new Date(created_at);
  const currentDate = new Date();

  const differenceInMilliseconds = currentDate - pastDate;
  const differenceInSeconds = differenceInMilliseconds / 1000;
  const differenceInMinutes = differenceInSeconds / 60;
  const differenceInHours = differenceInMinutes / 60;
  const differenceInDays = differenceInHours / 24;

  let postedAt;
  if (differenceInDays >= 1) {
    postedAt = `${Math.round(differenceInDays)} days`;
  } else if (differenceInHours >= 1) {
    postedAt = `${Math.round(differenceInHours)} hours`;
  } else if (differenceInMinutes >= 1) {
    postedAt = `${Math.round(differenceInMinutes)} minutes`;
  } else {
    postedAt = `${Math.round(differenceInSeconds)} seconds`;
  }
  return postedAt
}

const SinglePost = (props) => {
  const { client, render } = props
  const { created_at, description, key, photos, title, upvotes, comments } = props.data

  const [upvotesUS, setUpvotesUS] = useState(upvotes)
  const [comment, setComment] = useState(comments)
  const [commentInput, setCommentInput] = useState('')
  const handleUpvote = () => {

    async function IncUpvote () {
      const { data, error } = await client
      .from('posts')
      .update({upvotes: upvotesUS+1})
      .eq('key', key)
      .select()
    }
    IncUpvote()
    setUpvotesUS(upvotesUS+1)
    render(0)
  }
  const handleRedirect = () => {
    window.location.href = (`http://localhost:5173/edit/${key}`)
  }

  const handleDelete = () => {
    async function deletePost () { 
      const { data, error } = await client
      .from('posts')
      .delete()
      .eq('key', key)
    }
    deletePost()
    alert('Deleted Post, click to redirect...')
    window.location.href = (`http://localhost:5173/`)
    render(0)
  }

  const handleKeyPress = (e) => {

    if (e.key !== 'Enter') {
      return
    }

    const newComments = [...comment, e.target.value]
    async function addComment () { 
      const { data, error } = await client
      .from('posts')
      .update({ comments: newComments })
      .eq('key', key)
      .select()
      
    }
    addComment()
    setComment(newComments)
    setCommentInput('')
    render(0)
  }

  const handleInputChange = (e) => {
    const { value } = e.target
    setCommentInput(value)

  }

  return (
    <>
    <div className="single-post-container">
      <p className="post-time">{`${timeFrom(created_at)} ago`}</p>
      <p className="post-title">{title}</p>
      <p className="post-description">{description}</p>
      <img src={photos}></img>

      <div>
        {comment.slice().reverse().map((c) => (
          <p>{c}</p>
        ))}
        <input value={commentInput} onChange={handleInputChange} onKeyDown={handleKeyPress} placeholder='Comment...'></input>
      </div>
      <div>
        <img src="https://icons8.com/icon/24816/facebook-like" 
        className="post-upvotes-icon" onClick={handleUpvote}></img>
        <p>{upvotesUS}</p>
        <div>
          <button onClick={handleRedirect}>edit</button>
          <button onClick={handleDelete}>trash</button>
        </div>

      </div>
      <div className="comment-container">
        {comments.map((comment) => {
          <p>{comment}</p>
        })}
      </div>
    </div>
    </>
  )
}


export default SinglePost