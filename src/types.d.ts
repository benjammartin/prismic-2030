type NormalizedFields = {
  [key: string]: NormalizedField;
};

type NormalizedField = {
  name: string;
  type: string;
  children: string[];
  props: Record<string, unknown>;
};

/** SCHEMA */
interface Config {
  type: string;
  name: string;
  placeholder: string;
}

interface Field {
  config: Config;
  fields?: Record<string, Field>;
}

interface Schema {
  id: string;
  name: string;
  type: string;
  fields: Record<string, Field>;
}

type Fields = Record<string, Field>;

/** APP */
interface AppState {
  selected: string | null;
  components: NormalizedFields;
}
