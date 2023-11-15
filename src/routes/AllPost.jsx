import Post from './Post'

const AllPost = (props) => {
  const { posts, currentNewestStyle, handleFilterByNewest, currentUpvoteStyle, handleFilterByUpvotes } = props



  return (
    <>
      <div className="sort-by-container">
        <p className="sort-by-title">Sort By</p>
        <button className="sort-by-filter-button" style={currentNewestStyle} onClick={handleFilterByNewest}>Newest</button>
        <button className="sort-by-filter-button" style={currentUpvoteStyle} onClick={handleFilterByUpvotes}>Upvotes</button>
      </div>
      {posts.map((postData) => <Post data={postData} />)}
    </>

  )
}
export default AllPost