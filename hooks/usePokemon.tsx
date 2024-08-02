import { create } from "zustand";

import { PokemonType } from "@/types";

type UsePokemonType = {
  pokemon: PokemonType | null;
  setPokemon: (pokemon: PokemonType | null) => void;
};

export const usePokemon = create<UsePokemonType>((set) => ({
  pokemon: null,
  setPokemon: (pokemon) => set({ pokemon }),
}));
