import { getNormalizedFields, getNormalizedSlice } from "@/lib/utils";
import { produce } from "immer";
import React from "react";

// Represents the payloads for each action type
type ActionPayloads = {
  ADD_SLICE: Schema;
  SELECT_ELEMENT: string | null;
  UPDATE_ARRAY: Field;
};

// Represents the available actions
type AvailableAction = {
  [K in keyof ActionPayloads]: { type: K; payload: ActionPayloads[K] };
}[keyof ActionPayloads];

// Represents the context type
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AvailableAction>;
}

const INITIAL_STATE: AppState = {
  selected: null,
  components: {
    root: {
      schema: {
        config: {
          type: "page",
          name: "root",
          placeholder: "Root",
        },
        fields: {},
      },
      props: {},
      parent: "root",
      parentType: "page",
      type: "page",
      name: "root",
      children: [],
    },
  },
};

const AppContext = React.createContext<AppContextType>({
  state: INITIAL_STATE,
  dispatch: () => {},
});

// Hook to use the app context
export const useCurrentAppContext = (): AppContextType => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error(
      "useCurrentAppContext must be used within a component that is wrapped with AppContextProvider"
    );
  }
  return context;
};

export type AppContextProviderProps = {
  children: React.ReactNode;
};

// Reducer function to handle state changes
const reducer = produce((draft: AppState, action: AvailableAction) => {
  switch (action.type) {
    case "ADD_SLICE": {
      const { slice, fields, sliceKey } = getNormalizedSlice(action.payload);
      draft.components["root"].children.push(sliceKey);
      draft.components = {
        ...draft.components,
        ...slice,
        ...fields,
      };
      draft.selected = sliceKey;
      return draft;
    }
    case "SELECT_ELEMENT": {
      draft.selected = action.payload;
      break;
    }
    case "UPDATE_ARRAY": {
      const { fieldsKeys, fields } = getNormalizedFields(
        action.payload.fields as Fields,
        draft.selected,
        "array"
      );
      draft.components = {
        ...draft.components,
        ...fields,
      };
      draft.components[draft.selected!].children = [
        ...draft.components[draft.selected!].children,
        ...fieldsKeys,
      ];
      break;
    }
  }
});

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
