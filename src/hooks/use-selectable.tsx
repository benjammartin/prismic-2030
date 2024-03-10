import { useCurrentAppContext } from "@/contexts/app-provider";

const useSelectable = () => {
  /**useOnClickOutside(ref, () => {
    dispatch({
      type: "SELECT_ELEMENT",
      payload: null,
    });
  }); */

  const { dispatch } = useCurrentAppContext();
  const handleClick = (id: string) => {
    dispatch({
      type: "SELECT_ELEMENT",
      payload: id,
    });
  };

  return { handleClick };
};

export default useSelectable;
