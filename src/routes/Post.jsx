
const Post = (props) => {
  const {created_at, description, key, photos, title, upvotes } = props.data
  
  console.log('here is the data', created_at, description, key, photos, title, upvotes)


  const pastDate = new Date('2023-11-12T21:50:19.860866+00:00');
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
    <div>
      <p>Posted {postedAt} ago</p>
      <p>{title}</p>
    </div>
    </>
  )
}

export default Post