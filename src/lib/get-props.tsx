function getProps(normalized: NormalizedField, state: AppState) {
  const props = normalized.children.reduce(
    (acc: PrismicProps, value: string) => {
      const component = state.components[value];
      if (!component) {
        console.error(`Component ${value} not found`);
        return acc;
      }
      switch (component.type) {
        case "array":
          acc[component.name] = {
            id: value,
            items: [getProps(component, state)],
          };
          break;
        default:
          acc[component.name] = { id: value, content: "Hello" };
      }
      return acc;
    },
    {}
  );
  return {
    ...props,
  };
}

export default getProps;
