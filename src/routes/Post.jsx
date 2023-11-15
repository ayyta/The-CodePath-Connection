import { Link } from 'react-router-dom'
const Post = (props) => {
  const {created_at, description, key, photos, title, upvotes } = props.data
  

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

  return (
    <>
    <Link to={`/${key}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="single-post-container">
        <p className="post-time">Posted {postedAt} ago</p>
        <p className="post-title">{title}</p>
        <p className="post-upvotes">{upvotes} upvotes</p>
      </div>
    </Link>
    </>
  )
}

export default Post