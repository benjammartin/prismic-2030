import React from 'react';
import styles from './hero.module.css';

export type HeroSliceProps = {
  slice: string;
  title: {
    id: string;
    content: string;
  };
  description: {
    id: string;
    content: string;
  };
  cards: {
    id: string;
    items: string[];
  };
};

const Hero: React.FC<HeroSliceProps> = (props) => {
  return (
    <div data-prismic-id={props.slice} className={styles.slice}>
      <h1 data-prismic-id={props.title.id} className={styles.title}>
        {props.title.content}
      </h1>
      <p data-prismic-id={props.description.id} className={styles.description}>
        {props.description.content}
      </p>
      <div data-prismic-id={props.cards.id}>
        {props.cards.items.map(() => {
          return <div>Card</div>;
        })}
      </div>
    </div>
  );
};

export default Hero;
