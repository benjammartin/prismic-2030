import { config as heroConfig, Hero as HeroComponent } from './hero';

export const configs = {
  hero: heroConfig,
};

interface Components {
  [key: string]: React.ComponentType<any>;
}

export const components: Components = {
  Hero: HeroComponent.default,
};
