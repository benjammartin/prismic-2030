import React from "react";
import styles from "./hero.module.css";
import PrismicRichText from "@/components/prismic/prismic-rich-text";

export type HeroSliceProps = {
  slice: string;
  title: PrismicProp;
  description: PrismicProp;
  cards: {
    id: string;
    items: string[];
  };
};

const Hero: React.FC<HeroSliceProps> = (props) => {
  return (
    <div data-prismic-id={props.slice} className={styles.slice}>
      <PrismicRichText as="h1" field={props.title} />
      <PrismicRichText as="p" field={props.description} />
      <div data-prismic-id={props.cards.id}>
        {props.cards.items.map(() => {
          return <div>Card</div>;
        })}
      </div>
    </div>
  );
};

export default Hero;
