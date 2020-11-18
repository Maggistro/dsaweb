import { NextApiRequest, NextApiResponse } from "next";
import CharacterModel from "../../../model/CharacterModel";
import CharacterService, { PrimaryAttributes } from "../../../services/CharacterService";
import mongoose from 'mongoose';

type CharacterUpdateBody = {
    name: string,
    primaryAttributes: PrimaryAttributes
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const characterService = new CharacterService();
    try {
        switch (req.method) {
            case "POST":
                const data = req.body as CharacterUpdateBody;
                const id = req.query.id as string;
                mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_DATABASE}`, { useNewUrlParser: true });
                CharacterModel.findByIdAndUpdate(
                    id,
                    {
                        $set: {
                            primaryAttributes: data.primaryAttributes,
                        }
                    }, (err, doc) => {
                        if (err) return res.status(400).json({ message: `Character with name ${data.name} already exists` });
                        res.status(200).json(doc?.toJSON());
                    });
                break;
            default:
                res.status(404).json({ message: `Unsupported method ${req.method}` })
                break;
        }
    } catch (exception) {
        res.status(500).json(exception.toString());
    }
}