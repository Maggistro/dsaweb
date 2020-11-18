import { NextApiRequest, NextApiResponse } from "next";
import CharacterModel, { ICharacter } from "../../model/CharacterModel";
import CharacterService, { BlankCharacterType, PrimaryAttributes } from "../../services/CharacterService";
import mongoose from 'mongoose';

type CharacterInsertBody = {
    name: string,
    attributes: PrimaryAttributes
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const characterService = new CharacterService();
    switch (req.method) {
       case "PUT":
            const data = req.body as CharacterInsertBody;
            const character = {
                name: data.name,
                primaryAttributes: data.attributes,
                secondaryAttributes: characterService.calculateSecondaryStats({
                    id: 0,
                    title: data.name,
                    attributes: data.attributes
                })
            } as ICharacter

            mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_DATABASE}`, {useNewUrlParser: true, useUnifiedTopology: true});
            const model = new CharacterModel(character);
            model.save();
            res.status(200).end();
            break;
       default:
            res.status(404).json({ message: `Unsupported method ${req.method}`})
           break;
   }
  }