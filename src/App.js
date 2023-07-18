import { useEffect } from "react";
import { Navbar } from "./components/navbar/navbar";
import { CurrentRecipe } from "./components/recipes/currentRecipe/currentRecipe";
import { Recipes } from "./components/recipes/recipes";
import "./scss/main/main.css";
import { useStore } from "./store/store";

const App = () => {
  const currentRecipe = useStore((state) => state.currentRecipe);
  const getRecipes = useStore((state) => state.getRecipes);
  const recipes = useStore((state) => state.recipes);

  useEffect(() => {
    if (recipes.length === 0) {
      getRecipes();
    }
  }, [recipes]);
  return (
    <div className="App">
      <Navbar />
      {(currentRecipe && <CurrentRecipe />) || <Recipes />}
    </div>
  );
};

export default App;
