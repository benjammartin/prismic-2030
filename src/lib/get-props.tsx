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
        case "group":
          acc[component.name] = {
            id: value,
            ...getProps(component, state),
          };
          break;
        default:
          acc[component.name] = {
            id: value,
            content: component.props.children,
          };
      }
      return acc;
    },
    {}
  );
  return {
    type: normalized.type,
    name: normalized.name,
    ...props,
  };
}

export default getProps;
