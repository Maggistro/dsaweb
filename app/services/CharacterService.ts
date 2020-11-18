import mongoose, { Document } from 'mongoose';
import charactersFixture from "../fixtures/characters";
import CharacterModel, { ICharacter } from '../model/CharacterModel';

export type ModifyParameter = {
    Lebensenergie?: number,
    Astralenergie?: number,
    Karmaenergie?: number,
    Seelenkraft?: number,
    Zaehigkeit?: number,
    Ausweichen?: number,
    Initiative?: number,
    Geschwindigkeit?: number,
    Wundschwelle?: number
}

export type PrimaryAttributes = {
    Mut: number,
    Klugheit: number,
    Intuition: number,
    Charisma: number,
    Fingerfertigkeit: number,
    Gewandheit: number,
    Konstitution: number,
    Koerperkraft: number
}

export type SecondaryAttributes = {
    Lebensenergie: number,
    Astralenergie: number,
    Karmaenergie: number,
    Seelenkraft:number,
    Zaehigkeit: number,
    Ausweichen: number,
    Initiative: number,
    Geschwindigkeit: number,
    Wundschwelle: number
}

export type BlankCharacterType = {
    id: number,
    title: string,
    attributes: PrimaryAttributes
}

export type CharacterType = BlankCharacterType & {
    secondaryAttributes: SecondaryAttributes
};

type ExtendedCharacterType = CharacterType & {
    modification: {
        primary: PrimaryAttributes,
        secondary: SecondaryAttributes
    }
};


class CharacterService
{
    static instance: CharacterService;

    private characters: Array<ExtendedCharacterType> = [];

    constructor(characters: Array<BlankCharacterType> = []) {
        if (!CharacterService.instance) {
            CharacterService.instance = this;
            this.initData(characters);
        }
        return CharacterService.instance;
    }

    initData(characters: Array<BlankCharacterType>) {
        this.characters = (characters.length > 0 ? characters : charactersFixture).map((character: BlankCharacterType) => ({
            ...character,
            secondaryAttributes: this.calculateSecondaryStats(character),
            modification: {
                primary: {
                    Mut: 0,
                    Klugheit: 0,
                    Intuition: 0,
                    Charisma: 0,
                    Fingerfertigkeit: 0,
                    Gewandheit: 0,
                    Konstitution: 0,
                    Koerperkraft: 0
                },
                secondary: {
                    Lebensenergie: 0,
                    Astralenergie: 0,
                    Karmaenergie: 0,
                    Seelenkraft:0,
                    Zaehigkeit: 0,
                    Ausweichen: 0,
                    Initiative: 0,
                    Geschwindigkeit: 0,
                    Wundschwelle: 0
                }
            }
        }));;
    }

    async addCharacter(character: {}) {
        const response = await fetch('/api/character', {
            method: 'PUT',
            body: JSON.stringify(character),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status !== 200) console.error(response);
    }

    getCharacters(): Array<BlankCharacterType> {
        return this.characters;
    }

    async getCharactersFromDb(): Promise<Array<BlankCharacterType>> {
        return new Promise<Array<BlankCharacterType>>((resolve, reject) => {
            const client = mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_DATABASE}`, {useNewUrlParser: true})
            .then((db) => {
                CharacterModel.find()
                .then((entries) => {
                    resolve(entries.map((entry: ICharacter): BlankCharacterType => ({
                        id: entry._id.toString(),
                        title: entry.name,
                        attributes: (entry.primaryAttributes as any as Document).toObject(),
                    })))
                })
                .catch(err => reject(err))
            })
            .catch(err => reject(err));
        })
    }

    calculateSecondaryStats(character: BlankCharacterType) {
        return {
            Lebensenergie: 0, // TODO
            Astralenergie: 0, // TODO 20/Zauberer + Leiteigenschaft
            Karmaenergie: 0, // TODO 20/Geweit + Leiteigenschaft
            Seelenkraft: 0, // TODO GW spezies + (Mut + Klugheit + Intuition)/6
            Zaehigkeit: 9, // TODO GW spezies + (Konstituion + Konstitution + Koerperkraft)/6
            Ausweichen: character.attributes.Gewandheit / 2,
            Initiative: (character.attributes.Mut + character.attributes.Gewandheit) / 2,
            Geschwindigkeit: 0, // TODO Gw spezies ( einbeinig )
            Wundschwelle: character.attributes.Konstitution / 2
        }
    }

    getInitiative(id: number): number {
        const character = this.characters.find((entry) => entry.id === id );
        if (!character) return 0;
        return character.secondaryAttributes.Initiative + character.modification.secondary.Initiative;
    }

    modifySecondary = (id: number, modification: ModifyParameter) => {
        const character = this.characters.find((entry) => entry.id === id );
        if (!character) return 0;
        character.modification.secondary = {
            ...character?.modification.secondary,
            ...modification
        };
    }
}

export default CharacterService;