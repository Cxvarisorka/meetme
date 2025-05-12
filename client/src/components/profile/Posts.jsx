import AddPost from "./AddPost";
import Post from "./Post";

const Posts = ({ posts, loading, error, user, addPost, isFeedView}) => {
    if (loading) {
        return (
            <div className="text-center text-gray-600 py-6">
                <p>Loading posts...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-600 py-6">
                <p>{error}</p>
            </div>
        );
    }
    

    return (
        <div className="space-y-4 w-full">
            {
                isFeedView ? null : (
                    <AddPost addPost={addPost} user={user} />
                )
            }
            
            {!posts ? (
                <p className="text-center text-gray-600">No posts yet. Start sharing!</p>
            ) : (
                <>
                {posts?.map((post) => (
                    <Post key={post._id} post={post} isFeedView={isFeedView} user={typeof post.userId === "string" ? user : post.userId} />
                ))}
                </>
            )}
        </div>
    );
};

export default Posts;