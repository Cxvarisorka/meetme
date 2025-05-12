import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { PostContext } from "../../context/PostMethods";

const Post = ({ post, user, isFeedView }) => {
    // const {user: logedInUser} = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const {toggleLike, deletePost, editPost} = useContext(PostContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const description = form.description.value;
        const title = form.title.value;
        const file = form.postImg.files[0];

        const formData = new FormData();
        formData.append('description', description);
        formData.append('title', title);
        formData.append('postImg', file);

        editPost(post._id, formData);
        setIsEditing(false);
    };

    return (
        <div className="bg-white rounded-lg shadow-md mb-4 p-4 max-w-2xl mx-auto flex flex-col gap-3">
            {/* Post Header */}
            <div>
                <div className="flex items-center gap-3">
                    <img 
                        src={user.profileImgUrl || "https://via.placeholder.com/40"} 
                        alt={user.username}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                        <h4 className="font-semibold text-gray-800">{user.username}</h4>
                        <p className="text-xs text-gray-500">
                            {new Date(post.createdAt).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric'
                            })}
                        </p>
                    </div>
                </div>

                {/* Post Content */}
                {isEditing ? (
                    <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-3">
                        <input 
                            type="text"
                            name="title"
                            defaultValue={post.title}
                            className="w-full border rounded p-2"
                            required
                        />
                        <textarea 
                            name="description"
                            defaultValue={post.description}
                            className="w-full border rounded p-2"
                            required
                        />
                        <input 
                            type="file"
                            name="postImg"
                            accept="image/*"
                            className="w-full"
                            required
                        />
                        <div className="flex gap-2">
                            <button 
                                type="submit"
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                                Save
                            </button>
                            <button 
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        <p className="mt-3 text-lg text-gray-800 font-bold">{post.title}</p>
                        <p className="text-gray-800 mb-3">{post.description}</p>
                        {post.postImgUrl && (
                            <img 
                                src={post.postImgUrl} 
                                alt="Post content" 
                                className="w-full shadow-md border-1 border-gray-300"
                            />
                        )}
                    </>
                )}
            </div>

            {/* Post Footer */}
            {!isEditing && (
                <div className="p-3 border-t border-gray-50">
                    <div className="flex justify-between text-gray-500 text-sm">
                        {/* <span onClick={() => toggleLike(post._id, isFeedView)}>👍 Like ({post.likeCount})</span> */}
                        <span>👍 Like</span>
                        <span>💬 Comment</span>
                        <span>↗️ Share</span>
                    </div>

                    {  isFeedView ? null : (
                        <div className="flex justify-end gap-4 mt-3">
                            <button 
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deletePost(post._id)} 
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    )}

                </div>
            )}
        </div>
    );
};

export default Post;