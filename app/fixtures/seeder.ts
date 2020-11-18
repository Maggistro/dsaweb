import mongoose from "mongoose";
import CharacterModel from "../model/CharacterModel";
import CharacterService from "../services/CharacterService";
import characters from "./characters";

function seedCharacters() {
    const characterService = new CharacterService();
    const models = characters.map((character) => {
        const model = new CharacterModel({
            name: character.title,
            primaryAttributes: character.primaryAttributes,
        });
        model.secondaryAttributes = characterService.calculateSecondaryStats(character);
        return model;
    })

    CharacterModel.insertMany(models, (err, docs) => {
        if (err) console.log(err);
    })
}

async function seeder(){
    const client = await mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_DATABASE}` , { useNewUrlParser: true });
    seedCharacters();
}

// seed all
seeder();