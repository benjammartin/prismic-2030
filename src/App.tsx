import AppContextProvider, {
  useCurrentAppContext,
} from './contexts/app-provider';
import getProps from './lib/get-props';
import * as slices from './slices';
import useSelectable from './hooks/use-selectable';

function App() {
  return (
    <AppContextProvider>
      <Page />
      <Controls />
    </AppContextProvider>
  );
}

export default App;

const Controls = () => {
  const { dispatch } = useCurrentAppContext();
  const handleSlice = () => {
    dispatch({ type: 'ADD_SLICE', payload: slices.configs.hero });
  };
  return <button onClick={handleSlice}>Add slice</button>;
};

const Page = () => {
  const { state } = useCurrentAppContext();
  const { ref, handleClick } = useSelectable();
  console.log(state);
  return (
    <div ref={ref} onClick={handleClick}>
      <span>{state.selected}</span>
      {state.components['root'].children.map((slice) => {
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
