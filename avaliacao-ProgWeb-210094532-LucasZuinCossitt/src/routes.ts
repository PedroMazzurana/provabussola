import {Router} from 'express'
import PokemonController from './controllers/pokemon.controller'


const router = Router()

//Exercicio 1
router.post('/getPokemon', PokemonController.getPokemon)


export default router