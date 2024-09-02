import { PatchContentElements, PatchSortingOptions } from "../constants";

export type PatchContentVariantsType = keyof typeof PatchContentElements;
export type PatchStates = "Draft" | "Published" | "Hidden";

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
    content: patchContent[];
    created: string;
    updated: string;
    user: {
        id: number;
        username: string;
    };
    upvotes: number;
    state: PatchStates;
};

export type PatchSortingOptionsType = keyof typeof PatchSortingOptions;