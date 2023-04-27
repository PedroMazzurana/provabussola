import {Request, Response} from 'express'
import PokemonService from '../services/pokemon.service'
import { readFile, writeFile } from "fs/promises";

class PokemonController {

    //Exercicio 1
    
  static async getPokemon(req: Request, res: Response) {
    try {
      const data = await PokemonService.fetchPokemonData();

      await PokemonService.writeFile(data, 'pokemons.json');
      const result = await PokemonService.savePokemonDataToDB(data);

      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}



export default new PokemonController()