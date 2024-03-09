import React from "react";
import styles from "./hero.module.css";
import PrismicRichText from "@/components/prismic/prismic-rich-text";

export type HeroSliceProps = {
  slice: string;
  title: PrismicProp;
  description: PrismicProp;
  cards: {
    id: string;
    items: [
      {
        id: string;
        title: PrismicProp;
        description: PrismicProp;
        tags: {
          id: string;
          items: [
            {
              id: string;
              tag: PrismicProp;
            }
          ];
        };
      }
    ];
  };
};

const Hero: React.FC<HeroSliceProps> = (props) => {
  return (
    <div data-prismic-id={props.slice} className={styles.slice}>
      <PrismicRichText as="h1" field={props.title} />
      <PrismicRichText as="p" field={props.description} />
    </div>
  );
};

export default Hero;

/**<PrismicRepeatable
        className={styles.cards}
        as="div"
        id={props.cards.id}
        fields={props.cards.items}
        renderItem={(p) => (
          <div key={p.id} className={styles.card}>
            <PrismicRichText as="h3" key={p.title.id} field={p.title} />
            <PrismicRichText
              as="p"
              key={p.description.id}
              field={p.description}
            />
            <PrismicRepeatable
              className={styles.tags}
              as="div"
              id={p.tags.id}
              fields={p.tags.items}
              renderItem={(t) => (
                <div key={t.id} className={styles.tag}>
                  <PrismicRichText as="p" key={t.tag.id} field={t.tag} />
                </div>
              )}
            />
          </div>
        )}
      /> */
