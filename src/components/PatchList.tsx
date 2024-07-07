// src/components/PostList.tsx
import React, { useEffect, useState } from 'react';
import { Patch } from '../types';
import api from '../api';
import { Node } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor } from 'slate';

const PatchList: React.FC = () => {
    const [posts, setPosts] = useState<Patch[]>([]);
    const editor = withReact(createEditor());

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await api.get('/patches/');
            setPosts(response.data);
        };

        fetchPosts();
    }, []);

    return (
        <div>
            {posts.map(patch => (
                <div key={patch.id}>
                    <h2>{patch.title}</h2>
                    <Slate editor={editor} initialValue={patch.content as Node[]} onChange={() => {}}>
                        <Editable readOnly />
                    </Slate>
                </div>
            ))}
        </div>
    );
};

export default PatchList;