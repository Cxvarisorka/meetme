import { memo, useContext, useEffect, useState } from "react";
import { UserMethodsContext } from "../context/UserMethods";
import { usePosts } from "../context/PostMethods";
import Posts from "../components/profile/Posts";


const MyPosts = ({ user }) => {
    const { userPosts, addPost, loading, error, deletePost, editPost } = usePosts();


    return (
        <section className="mt-6 flex flex-col justify-center items-center w-full">
            <Posts posts={userPosts} addPost={addPost} loading={loading} error={error} user={user} isFeedView={false} />
        </section>
    );
};

const Profile = ({ user }) => {
    const { uploadProfileImg } = useContext(UserMethodsContext);


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(e.target.profile.files[0]);

        const formData = new FormData();
        formData.append("profile", e.target.profile.files[0]);

        await uploadProfileImg(formData);
    };

    return (
        <section className="mt-10 p-6 bg-white rounded-xl">
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg text-center w-full shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Profile</h2>

                <div>
                    {user.profileImgUrl ? (
                        <img
                            src={user.profileImgUrl}
                            alt={user.username}
                            className="w-36 h-36 object-cover rounded-full mx-auto mb-4 border-4 border-gray-200"
                        />
                    ) : (
                        <p className="text-gray-500 mb-4">There is no profile image</p>
                    )}

                    <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
                        <input
                            type="file"
                            name="profile"
                            required
                            className="text-gray-600 file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-indigo-50 file:text-indigo-700
                                hover:file:bg-indigo-100"
                        />
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700 transition-colors"
                        >
                            Add or Change Profile Image
                        </button>
                    </form>
                </div>

                <div className="mt-6 text-gray-700 space-y-2">
                    <p><span className="font-semibold">Email:</span> {user.email}</p>
                    <p><span className="font-semibold">Username:</span> {user.username}</p>
                </div>
            </div>

            <div>
                <MyPosts user={user}/>
            </div>  
        </section>
    );
};

export default memo(Profile);
