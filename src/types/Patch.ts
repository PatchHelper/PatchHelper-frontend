import { Node } from 'slate';

export default interface Patch {
    id: number;
    title: string;
    description: string;
    content: Node[];
    created: string;
    updated: string;
    user: {
        id: number;
        username: string;
    };
};