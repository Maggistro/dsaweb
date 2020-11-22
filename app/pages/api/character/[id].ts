import { NextApiRequest, NextApiResponse } from "next";
import CharacterModel from "../../../model/CharacterModel";
import CharacterService, { PrimaryAttributes } from "../../../services/CharacterService";
import mongoose from 'mongoose';

type CharacterUpdateBody = {
    name: string,
    primaryAttributes: PrimaryAttributes
};

/**
 * Handler for rout /api/character/<id>
 * @param req Incoming request
 * @param res Outgoing json response
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    return new Promise(resolve => {
        const characterService = new CharacterService();
        const id = req.query.id as string;
        try {
            switch (req.method) {
                case "PATCH": // update character
                    const data = req.body as CharacterUpdateBody;
                    mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_DATABASE}`, { useNewUrlParser: true });
                    CharacterModel.findByIdAndUpdate(
                        id,
                        {
                            $set: {
                                primaryAttributes: data.primaryAttributes,
                            }
                        },
                        {
                            useFindAndModify: false,
                        },
                        (err, doc) => {
                            if (err) return res.status(400).json({ message: `Could not update character with id ${id}` });
                            res.status(200).json(doc?.toJSON());
                            resolve();
                        });
                    break;
                case "GET": // get a single character
                    mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_DATABASE}`, { useNewUrlParser: true });
                    CharacterModel.findById(id, (err, doc) => {
                            if (err) return res.status(400).json({ message: `Could not find character with id ${id}` });
                            res.status(200).json(doc?.toJSON());
                            resolve();
                        });
                default:
                    res.status(404).json({ message: `Unsupported method ${req.method}` })
                    break;
            }
        } catch (exception) {
            res.status(500).json(exception.toString());
        }
    })
}