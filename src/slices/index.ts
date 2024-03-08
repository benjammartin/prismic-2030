import { config as heroConfig, Hero as HeroComponent } from "./hero";

export const configs = {
  hero: heroConfig,
};

export const components: Record<
  string,
  React.ComponentType<HeroComponent.HeroSliceProps>
> = {
  Hero: HeroComponent?.default,
};
