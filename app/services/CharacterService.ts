import Character from "../components/character/Character";
import characters from "../fictures/characters";

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


class CharacterService 
{
    getCharacters(): Array<CharacterType> {
        return characters.map((character: BlankCharacterType) => ({
            ...character,
            secondaryAttributes: this.getSecondaryStats(character),
        }));
    }

    getSecondaryStats(character: BlankCharacterType) {
        return {
            Lebensenergie: 0, // TODO 
            Astralenergie: 0, // TODO 20/Zauberer + Leiteigenschaft
            Karmaenergie: 0, // TODO 20/Geweit + Leiteigenschaft
            Seelenkraft: 0, // TODO GW spezies + (Mut + Klugheit + Intuition)/6
            Zaehigkeit: 9, // TODO GW spezies + (Konstituion + Konstitution + Koerperkraft)/6
            Ausweichen: character.attributes.Gewandheit / 2,
            Initiative: this.getInitiative(character),
            Geschwindigkeit: 0, // TODO Gw spezies ( einbeinig )
            Wundschwelle: character.attributes.Konstitutiokn / 2
        }
    }

    getInitiative(character: BlankCharacterType): number {
        return (character.attributes.Mut + character.attributes.Gewandheit) / 2
    }
}

export default CharacterService;