import { create } from "zustand";
import { getRecipesAPI } from "../api/api";

export const useStore = create((set, get) => ({
  recipes: [],
  selected: [],
  currentRecipe: null,
  currentPage: 1,

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

  removeAllBears: () => set({ bears: 0 }),
}));
