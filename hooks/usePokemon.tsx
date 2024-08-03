import { create } from "zustand";

import { PokemonType } from "@/types";

type UsePokemonType = {
  pokemon: (PokemonType & { color: string }) | null;
  evolutionChainUrl: string;
  setPokemon: (pokemon: (PokemonType & { color: string }) | null) => void;
  setEvolutionChainUrl: (evolutionChainUrl: string) => void;
};

export const usePokemon = create<UsePokemonType>((set) => ({
  pokemon: null,
  setPokemon: (pokemon) => set({ pokemon }),
  evolutionChainUrl: "",
  setEvolutionChainUrl: (evolutionChainUrl) => set({ evolutionChainUrl }),
}));
