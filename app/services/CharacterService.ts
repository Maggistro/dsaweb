import Character from "../components/character/Character";
import charactersFixture from "../fictures/characters";

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
    attributes: Attributes
}

export type CharacterType = BlankCharacterType & {
    secondaryAttributes: SecondaryAttributes
};

type ExtendedCharacterType = CharacterType & {
    modification: {
        primary: Attributes,
        secondary: SecondaryAttributes
    }
};


class CharacterService 
{
    static instance: CharacterService;

    private characters: Array<ExtendedCharacterType> = [];

    constructor() {
        if (!CharacterService.instance) {
            CharacterService.instance = this;
            this.initData();
        }
        return CharacterService.instance;
    }

    initData() {
        this.characters = charactersFixture.map((character: BlankCharacterType) => ({
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
                    Konstitutiokn: 0,
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

    getCharacters(): Array<BlankCharacterType> {
        return this.characters;
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
            Wundschwelle: character.attributes.Konstitutiokn / 2
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