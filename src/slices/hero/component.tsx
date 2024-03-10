import React from "react";
import styles from "./hero.module.css";
import PrismicRichText from "@/components/prismic/prismic-rich-text";
import PrismicRepeatable from "@/components/prismic/prismic-repeatable";
import PrismicSelector from "@/components/prismic/prismic-selector";

interface Content {
  id: string;
  content: string;
}

interface Card {
  id: string;
  type: string;
  name: string;
  title: Content;
  description: Content;
}

interface Item {
  type: string;
  name: string;
  card: Card;
}

interface Cards {
  id: string;
  items: Item[];
}

export interface HeroSliceProps {
  type: string;
  name: string;
  title: Content;
  description: Content;
  cards: Cards;
  slice: string;
}

const Hero: React.FC<HeroSliceProps> = (props) => {
  return (
    <div data-prismic-id={props.slice} className={styles.slice}>
      <PrismicRichText as="h1" field={props.title} />
      <PrismicRichText
        as="p"
        field={props.description}
        className={styles.description}
      />
      <PrismicRepeatable
        className={styles.cards}
        as="div"
        id={props.cards.id}
        fields={props.cards.items}
        renderItem={(p) => (
          <PrismicSelector
            key={p.card.id}
            fieldId={p.card.id}
            className={styles.title}
          >
            <div className={styles.card}>
              <PrismicRichText as="h2" field={p.card.title} />
              <PrismicRichText
                as="p"
                key={p.card.id}
                field={p.card.description}
              />
            </div>
          </PrismicSelector>
        )}
      />
    </div>
  );
};

export default Hero;
