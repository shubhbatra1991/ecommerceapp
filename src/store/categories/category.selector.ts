import { createSelector } from "reselect";

import { CategoriesState  } from "./category.reducer";
import { CategoryMap } from "./category.types";

const selectCategoryReducer = (state): CategoriesState => state.categories;

// getting the categories slice to use in reducer
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

// Till the time categories slice do not run, do not re-run the below code => this is what we have done here
// these will be memoized selectors.

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap => categories.reduce(
    (acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    },
    {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);