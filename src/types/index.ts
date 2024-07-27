import LandingPageStat from "./LandingPageStat";
import {Patch, patchContent, PatchContentElementsType, PatchContentVariantsType} from "./Patch";
import { User } from "./User";

export type {
    LandingPageStat,
    Patch,
    patchContent,
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