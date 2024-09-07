import { PatchContentElementsType, PatchContentVariantsType } from "../types";

export const PatchContentElements: PatchContentElementsType = {
    "textField": {
        type: "textField",
        text: "",
        order: 0,
    },
    "imageGallery": {
        type: "imageGallery",
        images: [],
        order: 0,
    },
    "singleImage": {
        type: "singleImage",
        images: [],
        order: 0,
    },
};

export const PatchContentVariants = Object.keys(PatchContentElements) as PatchContentVariantsType[];

export const PatchSortingOptions = {
    "New": "-created",
    "Recent": "-updated",
    "Top Rated": "-upvotes",
    "Most Downloaded": "-downloads"
  }

export const PatchStates = ["published", "draft", "hidden"] as const;