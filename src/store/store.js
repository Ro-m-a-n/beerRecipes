import { create } from "zustand";
import { getRecipesAPI } from "../api/api";

export const useStore = create((set, get) => ({
  recipes: [],
  selected: [],
  currentRecipe: null,
  currentPage: 1,
  intervalFrom: 0,
  intervalTo: 15,
  recipes15: [],
  setRecipes15: () => {
    let recipesSliced = get().recipes.slice(
      get().intervalFrom,
      get().intervalTo
    );
    set({
      recipes15: recipesSliced,
    });
  },
  changeInterval: (side) => {
    let n = 0;
    if (side === "up") {
      n = -5;
    } else if (side === "down") {
      n = 5;
    }
    set((state) => ({
      intervalFrom: state.intervalFrom + n,
      intervalTo: state.intervalTo + n,
    }));
  },
  getRecipes: async () => {
    let res = await getRecipesAPI(get().currentPage);
    set((state) => ({ recipes: res, currentPage: state.currentPage + 1 }));
  },
  setCurrentRecipe: (recipe) => set(() => ({ currentRecipe: recipe })),
  selectedUpdate: (newSelected) => set(() => ({ selected: newSelected })),
  selectedDelete: () =>
    set(() => {
      let filteredRecipes = [...get().recipes];
      get().selected.map((id) => {
        return (filteredRecipes = filteredRecipes.filter(
          (item) => item.id !== id
        ));
      });

      return {
        recipes: filteredRecipes,
        selected: [],
      };
    }),
}));
