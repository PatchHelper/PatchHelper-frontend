import React from "react";
import axios from 'axios';
import { Post } from '../types/Post';

const PostList: React.FC = () => {
    const [posts, setPosts] = React.useState<Post[]>([]);

    React.useEffect(() => {
        axios.get<Post[]>('http://localhost:8000/api/posts/')
            .then((response) => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the posts!', error);
            });
    }, []);

    return (
        <div>
            <h2>Post List</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;