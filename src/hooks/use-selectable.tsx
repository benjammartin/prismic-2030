import { useCurrentAppContext } from "@/contexts/app-provider";
import { useOnClickOutside } from "usehooks-ts";

import React from "react";

const useSelectable = (ref: React.MutableRefObject<null>) => {
  useOnClickOutside(ref, () => {
    dispatch({
      type: "SELECT_ELEMENT",
      payload: null,
    });
  });

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
