import { CharacterType, NewCharacterType } from "./CharacterService";


export type DocumentResponse<T> = Response & {
    body: T
}

type ErrorResponse = {
    message: string
}

class ApiService {
    async addCharacter(character: NewCharacterType): Promise<CharacterType> {
        const response = await fetch('/api/character', {
            method: 'PUT',
            body: JSON.stringify(character),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.status === 200) {
            const character = await response.json() as CharacterType;
            return Promise.resolve(character);
        }

        const error = await response.json() as ErrorResponse;
        return Promise.reject(error.message);
    }
}

export default ApiService;
