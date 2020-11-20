import { NextApiRequest, NextApiResponse } from "next";
import CharacterModel, { ICharacter } from "../../model/CharacterModel";
import CharacterService, { BlankCharacterType, PrimaryAttributes } from "../../services/CharacterService";
import mongoose, { mongo } from 'mongoose';

type CharacterInsertBody = {
    name: string,
    primaryAttributes: PrimaryAttributes
};

export default async function handler(req: NextApiRequest, res: NextApiResponse, next: Function) {
    return new Promise(resolve => {
        try {
            const characterService = new CharacterService();
            switch (req.method) {
                case "PUT":
                    const data = req.body as CharacterInsertBody;
                    const character = {
                        name: data.name,
                        primaryAttributes: data.primaryAttributes,
                        secondaryAttributes: characterService.calculateSecondaryStats({
                            id: "0",
                            name: data.name,
                            primaryAttributes: data.primaryAttributes
                        })
                    } as ICharacter

                    mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_DATABASE}`, { useNewUrlParser: true });
                    const model = new CharacterModel(character);
                    model.save((err, doc) => {
                        if (err) return res.status(400).json({ message: `Character with name ${model.name} already exists` });
                        res.status(200).json(doc.toJSON());
                        resolve();
                    });
                    break;
                case 'GET':
                    mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_DATABASE}`, { useNewUrlParser: true });
                    CharacterModel.find((err, docs) => {
                        if (err) return res.status(400).json({ message: `Could not fetch characters` });
                        res.status(200).json(JSON.stringify(docs.map((doc) => doc.toObject())));
                        resolve();
                    });
                    break;
                default:
                    res.status(404).json({ message: `Unsupported method ${req.method}` })
                    break;
            }
        } catch (exception) {
            res.status(500).json(exception.toString());
        }
    });
}