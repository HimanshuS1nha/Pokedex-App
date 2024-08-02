import { create } from "zustand";

import { PokemonType } from "@/types";

type UsePokemonType = {
  pokemon: (PokemonType & { color: string }) | null;
  setPokemon: (pokemon: (PokemonType & { color: string }) | null) => void;
};

export const usePokemon = create<UsePokemonType>((set) => ({
  pokemon: null,
  setPokemon: (pokemon) => set({ pokemon }),
}));
