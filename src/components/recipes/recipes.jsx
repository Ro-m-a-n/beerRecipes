import { useStore } from "./../../store/store";
export const Recipes = () => {
  const recipes = useStore((state) => state.recipes);
  const selected = useStore((state) => state.selected);
  const selectedUpdate = useStore((state) => state.selectedUpdate);
  const setCurrentRecipe = useStore((state) => state.setCurrentRecipe);
  const first15recipes = recipes.slice(0, 15);
  let selectedClass = "";

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

  const showRecipes = first15recipes.map((item) => {
    if (selected.includes(item.id)) {
      selectedClass = "active";
    } else {
      selectedClass = "";
    }
    return (
      <div
        className={`recipe_wrap ${selectedClass}`}
        onClick={() => {
          setCurrentRecipe(item);
        }}
        onContextMenu={(event) => handleClick(event, item.id)}
        key={item.id}
      >
        <div className="recipe">
          <img src={item.image_url} />
          <header>{item.name}</header>
          <p>{item.tagline}</p>
        </div>
      </div>
    );
  });

  return <div className="recipes_wrap">{showRecipes}</div>;
};
