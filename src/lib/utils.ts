import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890abcdef", 10);

export function getNormalizedSlice(schema: Schema) {
  const id = `slice-${nanoid()}`;
  const { fieldsKeys, fields } = getNormalizedFields(
    schema.fields,
    id,
    schema.config.type
  );
  const slice = {
    [id]: {
      type: schema.config.type,
      schema: schema,
      parent: "root",
      name: schema.config.name,
      children: fieldsKeys,
      parentType: "page",
      props: {},
    },
  };
  return { slice, sliceKey: id, fields, fieldsKeys };
}

export function getNormalizedFields(
  schema: Fields,
  parent: string | null = null,
  parentType: string | null = null
) {
  let fields: NormalizedFields = {};
  const data = Object.keys(schema).reduce(
    (obj: NormalizedFields, field: string) => {
      let nestedFields: NormalizedFields = {};
      let fieldsKeys: string[] = [];
      const id = `field-${nanoid()}`;

      if (schema[field].fields) {
        const result = getNormalizedFields(
          schema[field].fields!,
          id,
          schema[field].config.type
        );
        nestedFields = result.fields;
        fieldsKeys = result.fieldsKeys;
      }

      obj[id] = {
        type: schema[field].config.type,
        parentType: parentType,
        name: field,
        children: fieldsKeys,
        schema: schema[field],
        parent: parent,
        props: {
          children: schema[field].config.placeholder,
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
