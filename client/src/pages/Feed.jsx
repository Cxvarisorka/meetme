import { usePosts } from '../context/PostMethods.jsx';
import Posts from '../components/profile/Posts.jsx';

const Feed = () => {
  const { feedPosts, loading, error, user, addPost, editPost, deletePost } = usePosts();

  return (
    <div className="mt-10 px-4 sm:px-8">
      {/* Header */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Community Feed</h1>
          <p className="text-sm text-gray-500 mt-1">See what others are sharing and join the conversation</p>
        </div>
        {user && (
          <div className="text-right">
            <p className="text-gray-600 text-sm">Welcome,</p>
            <p className="font-semibold text-gray-800">{user.username}</p>
          </div>
        )}
      </div>

      {/* Posts List */}
      <Posts
        posts={feedPosts}
        loading={loading}
        error={error}
        user={user}
        addPost={addPost}
        isFeedView={true}
      />
    </div>
  );
};

export default Feed;
