import { create } from 'zustand'

// 1. This interface must match the store exactly
interface PokedexState {
  caughtPokemon: number[]; // The Data
  catchPokemon: (id: number) => void; // Action 1
  releasePokemon: (id: number) => void; // Action 2
}

export const usePokemonStore = create<PokedexState>((set) => ({
  // Initial State
  caughtPokemon: [], 

  // Action to add an ID
  catchPokemon: (id) => 
    set((state) => ({ 
      caughtPokemon: [...state.caughtPokemon, id] 
    })),

  // Action to remove an ID
  releasePokemon: (id) => 
    set((state) => ({
      caughtPokemon: state.caughtPokemon.filter(pId => pId !== id)
    }))
}));
