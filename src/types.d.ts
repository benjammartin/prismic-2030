type NormalizedFields = {
  [key: string]: NormalizedField;
};

type NormalizedField = {
  parent: string | null;
  name: string;
  parentType: string | null;
  type: string;
  children: string[];
  props: Record<string, unknown>;
  schema: Field;
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
  fields: Record<string, Field>;
  config: Config;
}

type Fields = Record<string, Field>;

/** APP */
interface AppState {
  selected: string | null;
  components: NormalizedFields;
}

/** Props */

type PrismicProp = {
  id: string;
} & ({ content: string; items?: never } | { items: string[]; content?: never });

type PrismicProps = {
  [key: string]: Prop;
};
