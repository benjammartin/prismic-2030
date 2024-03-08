import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890abcdef', 10);

export function getNormalizedSlice(schema: Schema) {
  const id = `slice-${nanoid()}`;
  const { fieldsKeys, fields } = getNormalizedFields(schema.fields);
  const slice = {
    [id]: {
      type: schema.type,
      name: schema.name,
      children: fieldsKeys,
    },
  };
  return { slice, sliceKey: id, fields, fieldsKeys };
}

export function getNormalizedFields(schema: Fields) {
  const data = Object.keys(schema).reduce(
    (obj: NormalizedFields, field: string) => {
      const id = `field-${nanoid()}`;
      obj[id] = {
        type: schema[field].config.type,
        name: field,
        children: [],
      };
      return obj;
    },
    {},
  );
  return {
    fields: data,
    fieldsKeys: Object.keys(data),
  };
}
