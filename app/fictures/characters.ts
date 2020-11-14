import { createRef } from "react";
import { Attributes } from "../components/Character/Character";

export type CharacterType = {
    id: number,
    title: string
    attributes: Attributes,
    order: number,
    left: number,
    ref: React.RefObject<HTMLDivElement>,
};


export default [
    {
        id: 1,
        title: "Title1",
        attributes: {
            Mut: 10,
            Klugheit: 10,
            Intuition: 10,
            Charisma: 10,
            Fingerfertigkeit: 10,
            Gewandheit: 10,
            Konstitutiokn: 10,
            Koerperkraft: 10        
        },
        order: 1,
        left: 0,
        ref: createRef<HTMLDivElement>()
    },
    {
        id: 2,
        title: "Title2",
        attributes: {
            Mut: 10,
            Klugheit: 10,
            Intuition: 10,
            Charisma: 10,
            Fingerfertigkeit: 10,
            Gewandheit: 10,
            Konstitutiokn: 10,
            Koerperkraft: 10        
        },
        order: 2,
        left: 0,
        ref: createRef<HTMLDivElement>()
    },
    {
        id: 3,
        title: "Title3",
        attributes: {
            Mut: 10,
            Klugheit: 10,
            Intuition: 10,
            Charisma: 10,
            Fingerfertigkeit: 10,
            Gewandheit: 10,
            Konstitutiokn: 10,
            Koerperkraft: 10        
        },
        order: 3,
        left: 0,
        ref: createRef<HTMLDivElement>()
    },
] as Array<CharacterType>