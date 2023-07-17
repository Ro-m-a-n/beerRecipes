import { RiDeleteBin2Line } from "react-icons/ri";
import { useStore } from "../../store/store";

export const Navbar = () => {
  const selected = useStore((state) => state.selected);
  const selectedDelete = useStore((state) => state.selectedDelete);

  return (
    selected.length > 0 && (
      <RiDeleteBin2Line className="delete" onClick={selectedDelete} />
    )
  );
};
