import React, { createContext, useState, useContext, useCallback, useMemo, useEffect } from 'react';
import { AuthContext } from './AuthContext';

export const PostContext = createContext();

const API_URL = "https://meetme-77tz.onrender.com";

export const PostProvider = ({ children }) => {
    const {user} = useContext(AuthContext);
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    // For feeds
    const [feedPosts, setFeedPosts] = useState([]);
    // const [feedOffset, setFeedOffset] = useState(0);
    // const [feedHasMore, setFeedHasMore] = useState(true);

    useEffect(() => {
        fetchFeedPosts();
    }, [])

    const fetchFeedPosts = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/post/all`);
            if (!response.ok) {
                throw new Error('Failed to fetch feed posts');
            }
            const data = await response.json();
    
            setFeedPosts(data); // Replace instead of append
        } catch (err) {
            setError(err.message);
        }
    }, []);
    

    // Optimized fetchuserPosts with useCallback
    const fetchUserPosts = useCallback(async (userId) => {
        try {
            const response = await fetch(`${API_URL}/post/user/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch userPosts');
            }
            const data = await response.json();
            console.log(data)
            setUserPosts(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (user) {
            fetchUserPosts(user.id);
        }
    }, [user]);

    // Optimized addPost with useCallback
    const addPost = useCallback(async (formData) => {
        try {
            const response = await fetch(`${API_URL}/post`, {
                method: 'POST',
                body: formData,
                credentials: "include",
            });
           
            if (!response.ok) {
                throw new Error('Failed to add post');
            }
            const data = await response.json();
            setUserPosts(prevUserPosts => [...prevUserPosts, data]);
            fetchFeedPosts()
        } catch (err) {
            setError(err.message);
        }
    }, []);

    // Optimized deletePost with useCallback
    const deletePost = useCallback(async (postId) => {
        try {
            const response = await fetch(`${API_URL}/post/${postId}`, {
                method: 'DELETE',
                credentials: "include",
            });
            if (!response.ok) {
                throw new Error('Failed to delete post');
            }
            setUserPosts(prevuserPosts => prevuserPosts.filter(post => post._id !== postId));
            fetchFeedPosts()
        } catch (err) {
            setError(err.message);
        }
    }, []);

    const editPost = useCallback(async (postId, formData) => {
        try {
            const response = await fetch(`${API_URL}/post/${postId}`, {
                method: 'PUT',
                body: formData,
                credentials: "include",
            });
    
            if (!response.ok) {
                throw new Error('Failed to edit post');
            }
    
            const updatedPost = await response.json(); // get back edited post
    
            setUserPosts(prevUserPosts =>
                prevUserPosts.map(post =>
                    post._id === postId ? updatedPost : post
                )
            );

            fetchFeedPosts();
        } catch (err) {
            setError(err.message);
        }
    }, []);

    const toggleLike = useCallback(async (postId, isFeedView) => {
        try {
            const res = await fetch(`${API_URL}/like/${postId}`, {
                method: "POST",
                credentials: "include"
            });

            const updatedPost = await res.json();

            console.log(updatedPost)

            if (!res.ok) {
                throw new Error('Failed to like post');
            }

            if (isFeedView) {
                setFeedPosts(prev =>
                    prev.map(post => post._id === postId ? updatedPost : post)
                );
            } else {
                setUserPosts(prev =>
                    prev.map(post => post._id === postId ? updatedPost : post)
                );
            } 

        } catch (err) {
            setError(err.message);
        }
    }, [feedPosts, userPosts]);


    

    // Memoize context value to prevent unnecessary re-renders
    const value = useMemo(() => ({
        userPosts,
        loading,
        error,
        fetchUserPosts,
        addPost,
        deletePost,
        editPost,
        feedPosts,
        fetchFeedPosts,
        toggleLike
        // feedHasMore
    }), [userPosts, loading, error, fetchUserPosts, addPost, deletePost, feedPosts, fetchFeedPosts]);

    return (
        <PostContext.Provider value={value}>
            {children}
        </PostContext.Provider>
    );
};

export const usePosts = () => useContext(PostContext);
