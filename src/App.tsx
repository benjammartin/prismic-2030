import AppContextProvider, {
  useCurrentAppContext,
} from "./contexts/app-provider";
import getProps from "./lib/get-props";
import * as slices from "./slices";
import "./App.css";
import "@radix-ui/themes/styles.css";
import { Box, Button, Grid } from "@radix-ui/themes";
import useCurrentSelection from "./hooks/use-current-selection";
import "react-json-view-lite/dist/index.css";
import PrismicSelector from "./components/prismic/prismic-selector";
import { JsonView } from "react-json-view-lite";
function App() {
  return (
    <AppContextProvider>
      <Grid columns="70% 30%" gap="4" p="2">
        <Box className="page">
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
  const { dispatch } = useCurrentAppContext();
  const updateArray = () => {
    dispatch({
      type: "UPDATE_ARRAY",
      payload: selection.component?.schema as Field,
    });
  };
  switch (selection.component?.type) {
    case "array":
      return (
        <div>
          <h2>{selection.component?.type}</h2>
          <h3>{selection.id}</h3>
          <h3>{selection.component.children.length}</h3>
          <JsonView data={selection.component.children} />
          <Button onClick={updateArray}>Add a new item</Button>
        </div>
      );
    default:
      return (
        <div>
          <h2>{selection.component?.type}</h2>
          <h3>{selection.id}</h3>
          <pre>{JSON.stringify(selection.component, null, 2)}</pre>
        </div>
      );
  }
};

const Page = () => {
  const { state } = useCurrentAppContext();
  return (
    <div>
      {state.components["root"].children.map((slice) => {
        const component = state.components[slice];
        const props = getProps(component, state);
        console.log(props);
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
