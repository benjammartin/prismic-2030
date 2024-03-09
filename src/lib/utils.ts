import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890abcdef", 10);

export function getNormalizedSlice(schema: Schema) {
  const id = `slice-${nanoid()}`;
  const { fieldsKeys, fields } = getNormalizedFields(schema.fields);
  const slice = {
    [id]: {
      type: schema.type,
      name: schema.name,
      children: fieldsKeys,
      props: {},
    },
  };
  return { slice, sliceKey: id, fields, fieldsKeys };
}

export function getNormalizedFields(schema: Fields) {
  let fields: NormalizedFields = {};
  const data = Object.keys(schema).reduce(
    (obj: NormalizedFields, field: string) => {
      let nestedFields: NormalizedFields = {};
      let fieldsKeys: string[] = [];

      if (schema[field].fields) {
        const result = getNormalizedFields(schema[field].fields!);
        nestedFields = result.fields;
        fieldsKeys = result.fieldsKeys;
      }

      const id = `field-${nanoid()}`;
      obj[id] = {
        type: schema[field].config.type,
        name: field,
        children: fieldsKeys,
        props: {
          children: "value",
        },
      };
      fields = { ...fields, ...nestedFields };
      return obj;
    },
    {}
  );

  return {
    fields: { ...fields, ...data },
    fieldsKeys: Object.keys(data),
  };
}
