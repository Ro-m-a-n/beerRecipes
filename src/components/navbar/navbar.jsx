import { RiDeleteBin2Line } from "react-icons/ri";
import { useStore } from "../../store/store";

export const Navbar = () => {
  const selected = useStore((state) => state.selected);
  const selectedDelete = useStore((state) => state.selectedDelete);
  const currentRecipe = useStore((state) => state.currentRecipe);
  return (
    selected.length > 0 &&
    !currentRecipe && (
      <RiDeleteBin2Line className="delete" onClick={selectedDelete} />
    )
  );
};
