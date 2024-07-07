// src/components/SlateEditor.tsx
import React, { useMemo, useState, useCallback } from 'react';
import { createEditor, Node, Transforms } from 'slate';
import { Slate, Editable, withReact, useSlate } from 'slate-react';
import { withHistory } from 'slate-history';
import FileUpload from './FileUpload';

const SlateEditor: React.FC<{ value: Node[], onChange: (value: Node[]) => void }> = ({ value, onChange }) => {
    const editor = useMemo(() => withReact(withHistory(createEditor())), []);

    const insertImage = (editor: any, url: string) => {
        const text = { text: '' };
        const image = { type: 'image', url, children: [text] };
        Transforms.insertNodes(editor, image);
    };

    const insertVideo = (editor: any, url: string) => {
        const text = { text: '' };
        const video = { type: 'video', url, children: [text] };
        Transforms.insertNodes(editor, video);
    };

    const renderElement = useCallback((props: any) => {
        switch (props.element.type) {
            case 'image':
                return <img {...props.attributes} src={props.element.url} alt="User uploaded content" />;
            case 'video':
                return <video {...props.attributes} src={props.element.url} controls />;
            default:
                return <p {...props.attributes}>{props.children}</p>;
        }
    }, []);

    return (
        <Slate editor={editor} initialValue={value} onChange={onChange}>
            <FileUpload onUpload={(url, type) => {
                if (type === 'image') insertImage(editor, url);
                else if (type === 'video') insertVideo(editor, url);
            }} />
            <Editable
                renderElement={renderElement}
                placeholder="Enter some text..."
                spellCheck
                autoFocus
            />
        </Slate>
    );
};

export default SlateEditor;