import { useCurrentAppContext } from "@/contexts/app-provider";

function useCurrentSelection() {
  const { state } = useCurrentAppContext();

  if (!state) {
    throw new Error(
      "useCurrentSelection must be used within a CurrentAppContext provider"
    );
  }

  const selectedComponent = state.selected
    ? state.components[state.selected]
    : null;

  return {
    id: state.selected,
    component: selectedComponent,
  };
}

export default useCurrentSelection;
