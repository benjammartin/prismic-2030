import AppContextProvider, {
  useCurrentAppContext,
} from "./contexts/app-provider";
import getProps from "./lib/get-props";
import * as slices from "./slices";
import useSelectable from "./hooks/use-selectable";
import "./App.css";
import "@radix-ui/themes/styles.css";
import { Box, Grid } from "@radix-ui/themes";
import useCurrentSelection from "./hooks/use-current-selection";

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
  return <div>{JSON.stringify(selection)}</div>;
};

const Page = () => {
  const { state } = useCurrentAppContext();
  const { ref, handleClick } = useSelectable();
  console.log(state);
  return (
    <div style={{ height: "100%" }} ref={ref} onClick={handleClick}>
      <span style={{ position: "absolute", background: "red" }}>
        {state.selected}
      </span>
      {state.components["root"].children.map((slice) => {
        const component = state.components[slice];
        const props = getProps(component, state);
        const Component = slices.components[component.name];
        return (
          <div key={slice}>
            <Component {...Object.assign({ ...props, slice })} />
          </div>
        );
      })}
    </div>
  );
};
