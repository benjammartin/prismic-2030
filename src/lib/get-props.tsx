function getProps(normalized: NormalizedField, state: AppState) {
  const props = normalized.children.reduce(
    (acc: PrismicProps, value: string) => {
      const component = state.components[value];
      if (!component) {
        return acc;
      }
      switch (component.type) {
        case "array":
          acc[component.name] = {
            id: value,
            items: [],
          };
          break;
        default:
          acc[component.name] = { id: value, content: "Demo value" };
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
