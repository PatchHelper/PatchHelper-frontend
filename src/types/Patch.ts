import { PatchContentElements, PatchSortingOptions, PatchStates } from "../constants";

export type PatchContentVariantsType = keyof typeof PatchContentElements;
export type PatchStatesType = typeof PatchStates[number];

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
    uuid: string;
    title: string;
    thumbnail: string;
    description: string;
    version: string;
    content: patchContent[];
    created: string;
    updated: string;
    user: {
        id: number;
        username: string;
    };
    upvotes: number;
    state: PatchStatesType;
};

export type PatchSortingOptionsType = keyof typeof PatchSortingOptions;