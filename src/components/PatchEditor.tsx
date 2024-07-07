// src/components/PostEditor.tsx
import React, { useState } from 'react';
import { Node } from 'slate';
import SlateEditor from './SlateEditor';
import api from '../api';
import { Patch } from '../types';

const initialValue: Node[] = [
    {
        type: 'paragraph',
        children: [{ text: 'Start typing your post...' }],
    } as Node
];

const PatchEditor: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState<Node[]>(initialValue);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newPatch: Omit<Patch, 'id' | 'created' | 'updated'> = { title, description, content };
        await api.post('/patches/', newPatch);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
            />
            <SlateEditor value={content} onChange={setContent} />
            <button type="submit">Save</button>
        </form>
    );
};

export default PatchEditor;