import { PatchContentElements, PatchSortingOptions } from "../constants";

export type PatchContentVariantsType = keyof typeof PatchContentElements;

export interface patchContent {
    type: PatchContentVariantsType;
    text?: string;
    images?: string[];
    order: number;
}

export interface PatchContentElementsType {
    [key: string]: patchContent;
}

export interface Patch {
    id: number;
    title: string;
    description: string;
    content: patchContent[];
    created: string;
    updated: string;
    user: {
        id: number;
        username: string;
    };
    upvotes: number;
};

export type PatchSortingOptionsType = keyof typeof PatchSortingOptions;