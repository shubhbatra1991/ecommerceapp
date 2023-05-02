import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

// getting the categories slice to use in reducer
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

// Till the time categories slice do not run, do not re-run the below code => this is what we have done here
// these will be memoized selectors.

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => categories.reduce(
    (acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    },
    {})
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);