import LandingPageStat from "./LandingPageStat";
import { Patch, patchContent, PatchContentElementsType, PatchContentVariantsType, PatchSortingOptionsType, PatchStatesType } from "./Patch";
import { User } from "./User";

export type {
    LandingPageStat,
    Patch,
    patchContent,
    PatchStatesType,
    PatchSortingOptionsType,
    PatchContentElementsType,
    PatchContentVariantsType,
    User
};

export interface FooterLinksInterface {
    [key: string]: {
        id: string;
        label: string;
    }[]
}