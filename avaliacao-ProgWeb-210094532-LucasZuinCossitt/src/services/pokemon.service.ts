import fetch from "node-fetch";
import { readFile, writeFile } from "fs/promises";
import PokemonSchema from "./PokemonSchema";

interface Pokemon {
  name: string;
  type: string[];
  stats: { name: string; value: number }[];
  dex: number;
  height: number;
  weight: number;
  moves: string[];
}

class PokemonService {
  private apiUrl = "http://localhost:3000/pokemons-data";

  private async fetchPokemonData(): Promise<any> {
    const response = await fetch(this.apiUrl);
    return response.json();
  }

  private randomMoves(moves: string[]): string[] {
    const result: string[] = [];
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * moves.length);
      result.push(moves[randomIndex]);
    }
    return result;
  }

  private transformPokemonData(data: any): Pokemon[] {
    return data.map((item: any) => {
      const stats = item.stats.map((stat: any) => ({
        name: stat.stat.name,
        value: stat.base_stat,
      }));
      const moves = this.randomMoves(item.moves.map((move: any) => move.move.name));
      return {
        name: item.forms[0].name,
        type: item.types.map((type: any) => type.type.name),
        stats: stats,
        dex: item.game_indices[9].game_index,
        height: item.height,
        weight: item.weight,
        moves: moves,
      };
    });
  }

  public async savePokemonDataToFile(filename: string): Promise<void> {
    const pokemonData = await this.transformPokemonData(await this.fetchPokemonData());
    await writeFile(filename, JSON.stringify(pokemonData, null, 2));
  }

  public async savePokemonDataToDB(): Promise<void> {
    const pokemonData = await this.transformPokemonData(await this.readFile());
    await PokemonSchema.insertMany(pokemonData);
  }

  private async readFile(): Promise<any> {
    const content = await readFile("pokemons.json");
    return JSON.parse(content.toString());
  }
}


  //Exercicio 2
  async function organizeDataByPokemonType() {
    const data = await readFile();
  
    const pokemonByType = {};

    data.forEach((pokemon) => {
      const type = pokemon.type[0];

      if (!pokemonByType[type]) {
        pokemonByType[type] = [];
      }

      pokemonByType[type].push(pokemon);
    });

    const list = Object.entries(pokemonByType).map(([type, pokemons]) => {
      return {
        type: type,
        pokemons: pokemons.sort((a, b) => a.number - b.number),
      };
    });

    await writeFile(list, "pokemonByType.json");
  }


export default new PokemonService();
