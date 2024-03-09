import AppContextProvider, {
  useCurrentAppContext,
} from "./contexts/app-provider";
import getProps from "./lib/get-props";
import * as slices from "./slices";
import "./App.css";
import "@radix-ui/themes/styles.css";
import { Box, Grid } from "@radix-ui/themes";
import useCurrentSelection from "./hooks/use-current-selection";
import {
  JsonView,
  allExpanded,
  collapseAllNested,
  darkStyles,
  defaultStyles,
} from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import PrismicSelector from "./components/prismic/prismic-selector";

function App() {
  return (
    <AppContextProvider>
      <Grid columns="2" gap="4" p="2">
        <Box>
          <Page />
          <Controls />
        </Box>
        <Box>
          <Editor />
        </Box>
      </Grid>
    </AppContextProvider>
  );
}

export default App;

const Controls = () => {
  const { dispatch } = useCurrentAppContext();
  const handleSlice = () => {
    dispatch({ type: "ADD_SLICE", payload: slices.configs.hero });
  };
  return <button onClick={handleSlice}>Add slice</button>;
};

const Editor = () => {
  const selection = useCurrentSelection();
  const { state } = useCurrentAppContext();

  return (
    <div>
      <div>{JSON.stringify(selection)}</div>
      <JsonView
        data={selection}
        shouldExpandNode={allExpanded}
        style={darkStyles}
      />
      <JsonView
        data={state}
        shouldExpandNode={collapseAllNested}
        style={defaultStyles}
      />
    </div>
  );
};

const Page = () => {
  const { state } = useCurrentAppContext();
  return (
    <div>
      {state.components["root"].children.map((slice) => {
        const component = state.components[slice];
        const props = getProps(component, state);
        const Component = slices.components[component.name];
        return (
          <PrismicSelector key={slice} fieldId={slice}>
            <Component {...Object.assign({ ...props, slice })} />
          </PrismicSelector>
        );
      })}
    </div>
  );
};
