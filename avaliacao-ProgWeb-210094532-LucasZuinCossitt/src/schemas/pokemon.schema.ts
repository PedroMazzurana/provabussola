import {Schema, model} from 'mongoose'

const PokemonSchema = new Schema({
    name: {
        type: String
    },
    type: {
        type: Array
    },
    stats: {
        type: Array
    },
    dex: {
        type: Number
    },
    height: {
        type: Number
    },
    weight: {
        type: Number
    },
    moves: {
        type: Array
    }
}, {timestamps: true})

export default model('Pokemons', PokemonSchema)