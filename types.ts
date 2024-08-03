export type PokemonType = {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  stats: { base_stat: number; stat: { name: string } }[];
  height: number;
  weight: number;
};
