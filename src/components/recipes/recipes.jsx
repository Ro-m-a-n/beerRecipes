import { useEffect, useRef, useState } from "react";
import { useStore } from "./../../store/store";

export const Recipes = () => {
  const recipes = useStore((state) => state.recipes);
  const selected = useStore((state) => state.selected);
  const selectedUpdate = useStore((state) => state.selectedUpdate);
  const setCurrentRecipe = useStore((state) => state.setCurrentRecipe);
  const changeInterval = useStore((state) => state.changeInterval);
  const intervalFrom = useStore((state) => state.intervalFrom);
  const intervalTo = useStore((state) => state.intervalTo);
  const recipes15 = useStore((state) => state.recipes15);
  const setRecipes15 = useStore((state) => state.setRecipes15);
  let selectedClass = "";

  const [loadNext, setLoadNext] = useState(false);
  const [loadPrev, setLoadPrev] = useState(false);

  useEffect(() => {
    if (recipes.length > 0) {
      setRecipes15();
    }
  }, [recipes]); //on first load set 15 recipes to render
  useEffect(() => {
    if (loadNext && intervalTo < 25) {
      setLoadNext(false);
      changeInterval("down");
      setRecipes15();
    }
  }, [loadNext, intervalTo]); //on reaching bottom of the screen
  useEffect(() => {
    if (loadPrev && intervalFrom > 0) {
      setLoadPrev(false);
      changeInterval("up");
      setRecipes15();
    }
  }, [loadPrev, intervalFrom]); //on reaching top of the screen

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return () => document.removeEventListener("scroll", scrollHandler);
  }, []);

  const scrollHandler = (e) => {
    if (
      !loadNext &&
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        10
    ) {
      setLoadNext(true); //on reaching bottom of the screen
    } else if (!loadPrev && e.target.documentElement.scrollTop < 100) {
      setLoadPrev(true); //on reaching top of the screen
    }
  };

  const handleClick = (event, index) => {
    event.preventDefault();
    if (event.button === 2) {
      if (selected.includes(index)) {
        selectedUpdate(selected.filter((id) => id !== index));
      } else {
        selectedUpdate([...selected, index]);
      }
    }
  };

  const showRecipes = recipes15.map((item) => {
    if (selected.includes(item.id)) {
      selectedClass = "active";
    } else {
      selectedClass = "";
    }
    return (
      <div
        className={`recipe_wrap ${selectedClass}`}
        key={item.id}
        onClick={() => {
          setCurrentRecipe(item);
        }}
        onContextMenu={(event) => handleClick(event, item.id)}
      >
        <div className="recipe">
          <img src={item.image_url} />
          <div className="beerName">
            <header>{item.name}</header>
            <p>{item.tagline}</p>
          </div>
        </div>
      </div>
    );
  });

  return <div className="recipes_wrap">{showRecipes}</div>;
};
