// src/components/FileUpload.tsx
import React, { useState } from 'react';
import api from '../api';

interface FileUploadProps {
    onUpload: (url: string, type: 'image' | 'video') => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            const response = await api.post('/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            onUpload(response.data.url, file.type.startsWith('image') ? 'image' : 'video');
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default FileUpload;