import { useState, useEffect } from "react";

// 1. Define the shape of a single Evolution stage
export interface EvolutionStage {
  name: string;
  id: string;
  image: string;
}

interface EvolutionHook {
  evoChain: EvolutionStage[];
  loadingEvo: boolean;
  errorEvo: string | null;
}

const useEvolutionChain = (speciesUrl: string | undefined): EvolutionHook => {
  const [evoChain, setEvoChain] = useState<EvolutionStage[]>([]);
  const [loadingEvo, setLoadingEvo] = useState(false);
  const [errorEvo, setErrorEvo] = useState<string | null>(null);

  useEffect(() => {
    // Only run if we actually have a species URL from the main Pokemon data
    if (!speciesUrl) return;

    const fetchEvolutionData = async () => {
      setLoadingEvo(true);
      setErrorEvo(null);

      try {
        // STEP 1: Get the Species Data to find the evolution chain link
        const speciesRes = await fetch(speciesUrl);
        if (!speciesRes.ok) throw new Error("Failed to fetch species info");
        const speciesData = await speciesRes.json();

        // STEP 2: Get the actual Evolution Chain
        const chainRes = await fetch(speciesData.evolution_chain.url);
        if (!chainRes.ok) throw new Error("Failed to fetch evolution chain");
        const chainData = await chainRes.json();

        // STEP 3: Recursive "Crawler" function to flatten the nested tree
        const traverse = (node: any): EvolutionStage[] => {
          const results: EvolutionStage[] = [];

          // Extract ID from the URL (e.g., ".../pokemon-species/1/")
          const urlParts = node.species.url.split("/").filter(Boolean);
          const pokeId = urlParts[urlParts.length - 1];

          // Push current node data
          results.push({
            name: node.species.name,
            id: pokeId,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png`,
          });

          // If this Pokemon evolves, call traverse on every branch
          node.evolves_to.forEach((evolutionBranch: any) => {
            results.push(...traverse(evolutionBranch));
          });

          return results;
        };

        // Start the crawl from the root node
        const flattenedChain = traverse(chainData.chain);
        
        // Remove duplicates (just in case the API has circular references)
        const uniqueChain = flattenedChain.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
        
        setEvoChain(uniqueChain);
      } catch (err) {
        setErrorEvo(err instanceof Error ? err.message : "Evolution error");
      } finally {
        setLoadingEvo(false);
      }
    };

    fetchEvolutionData();
  }, [speciesUrl]);

  return { evoChain, loadingEvo, errorEvo };
};

export default useEvolutionChain;
