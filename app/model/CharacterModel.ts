import mongoose, { Document, mongo, Schema } from "mongoose"
import { PrimaryAttributes, SecondaryAttributes } from "../services/CharacterService";

/**
 * Type for the database character
 */
export interface ICharacter extends Document {
    name: string,
    primaryAttributes: PrimaryAttributes,
    secondaryAttributes: SecondaryAttributes
}

const schema: Schema = new Schema({
    id: String,
    name: { type: String, unique: true },
    primaryAttributes: {
        Mut: { type: Number },
        Klugheit: { type: Number },
        Intuition: { type: Number },
        Charisma: { type: Number },
        Fingerfertigkeit: { type: Number },
        Gewandheit: { type: Number },
        Konstitution: { type: Number },
        Koerperkraft: { type: Number },
    },
    secondaryAttributes: {
        Lebensenergie: { type: Number },
        Astralenergie: { type: Number },
        Karmaenergie: { type: Number },
        Seelenkraft:{ type: Number },
        Zaehigkeit: { type: Number },
        Ausweichen: { type: Number },
        Initiative: { type: Number },
        Geschwindigkeit: { type: Number },
        Wundschwelle: { type: Number }
    }
})

/**
 * Model for a character in the db
 */
const CharacterModel = mongoose.models && mongoose.models.Character
    ? mongoose.model<ICharacter>('Character')
    : mongoose.model<ICharacter>('Character', schema);

export default CharacterModel;
