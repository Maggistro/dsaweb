import mongoose, { Document, Schema } from "mongoose"
import { SecondaryAttributes } from "../services/CharacterService";

export type Attributes = {
    Mut: number,
    Klugheit: number,
    Intuition: number,
    Charisma: number,
    Fingerfertigkeit: number,
    Gewandheit: number,
    Konstitutiokn: number,
    Koerperkraft: number    
}

export interface ICharacter extends Document {
    name: string,
    primaryAttributes: Attributes,    
    secondaryAttributes: SecondaryAttributes
}

const schema: Schema = new Schema({
    id: String,
    name: String,
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

export default mongoose.model<ICharacter>('Character', schema);