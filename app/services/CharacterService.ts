import mongoose, { Document } from 'mongoose';
import charactersFixture from "../fixtures/characters";
import CharacterModel, { ICharacter } from '../model/CharacterModel';
import ApiService from './ApiService';
import SocketClientService from './SocketClientService';

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

export type NewCharacterType = {
    name: string,
    primaryAttributes: PrimaryAttributes
}

export type BlankCharacterType = NewCharacterType & {
    id: string
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

    private apiService: ApiService = new ApiService();

    private socketService: SocketClientService = new SocketClientService();

    constructor(characters: Array<BlankCharacterType> = []) {
        if (!CharacterService.instance) {
            CharacterService.instance = this;
            this.initData(characters);
        }
        return CharacterService.instance;
    }

    initData(characters: Array<BlankCharacterType>) {
        this.characters = (characters.length > 0 ? characters : charactersFixture).map(this.extendBlankCharacter);;
    }

    async addCharacter(character: NewCharacterType): Promise<string> {
        return this.apiService.addCharacter(character)
        .then((newCharacter: CharacterType) => {
            this.characters.push(this.extendCharacter(newCharacter));
            this.socketService.update();
            return "Character added";
        })
        .catch((reason) => reason.toString())
    }

    async updateCharacter(id: string, character: NewCharacterType): Promise<string> {
        return this.apiService.updateCharacter(id, character)
        .then((updatedCharacter: CharacterType) => {
            this.characters = this.characters.filter((entry: CharacterType) => entry.id !== id);
            this.characters.push(this.extendCharacter(updatedCharacter));
            this.socketService.update();
            return "Character updated";
        })
        .catch((reason) => reason.toString())
    }

    extendCharacter = (character: CharacterType): ExtendedCharacterType => {
        return {
            ...character,
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
        }
    }

    extendBlankCharacter = (blankCharacter: BlankCharacterType): ExtendedCharacterType => {
        return {
            ...blankCharacter,
            secondaryAttributes: this.calculateSecondaryStats(blankCharacter),
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
        }
    }

    getCharacters(): Array<CharacterType> {
        return this.characters;
    }

    getCharacter(id: string): CharacterType | undefined {
        return this.characters.find(entry => entry.id === id);
    }

    async getCharactersFromDb(): Promise<Array<BlankCharacterType>> {
        return new Promise<Array<BlankCharacterType>>((resolve, reject) => {
            const client = mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_DATABASE}`, {useNewUrlParser: true})
            .then((db) => {
                CharacterModel.find()
                .then((entries) => {
                    resolve(entries.map((entry: ICharacter): BlankCharacterType => ({
                        id: entry._id.toString(),
                        name: entry.name,
                        primaryAttributes: (entry.primaryAttributes as any as Document).toObject(),
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
            Ausweichen: character.primaryAttributes.Gewandheit / 2,
            Initiative: (character.primaryAttributes.Mut + character.primaryAttributes.Gewandheit) / 2,
            Geschwindigkeit: 0, // TODO Gw spezies ( einbeinig )
            Wundschwelle: character.primaryAttributes.Konstitution / 2
        }
    }

    getInitiative(id: string): number {
        const character = this.characters.find((entry) => entry.id === id );
        if (!character) return 0;
        return character.secondaryAttributes.Initiative + character.modification.secondary.Initiative;
    }

    modifySecondary = (id: string, modification: ModifyParameter) => {
        const character = this.characters.find((entry) => entry.id === id );
        if (!character) return 0;
        character.modification.secondary = {
            ...character?.modification.secondary,
            ...modification
        };
    }
}

export default CharacterService;