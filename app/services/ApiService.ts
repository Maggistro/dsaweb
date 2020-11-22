import { CharacterType, NewCharacterType } from "./CharacterService";

type ErrorResponse = {
    message: string
}

/**
 * Api service handling request to the api
 */
class ApiService {

    /**
     * Sends a character add request to the backend
     * @param character Character data to be added
     */
    async addCharacter(character: NewCharacterType): Promise<CharacterType> {
        const response = await fetch('/api/character', {
            method: 'PUT',
            body: JSON.stringify(character),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.status === 200) {
            const character = await response.json();
            character.id = character._id;
            return Promise.resolve(character);
        }

        const error = await response.json() as ErrorResponse;
        return Promise.reject(error.message);
    }

    /**
     * Sends an update character request to the server
     * @param id The characters id
     * @param character The updatea character data
     */
    async updateCharacter(id: string, character: NewCharacterType): Promise<CharacterType> {
        const response = await fetch(`/api/character/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(character),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.status === 200) {
            const character = await response.json();
            character.id = character._id;
            return Promise.resolve(character);
        }

        const error = await response.json() as ErrorResponse;
        return Promise.reject(error.message);
    }
}

export default ApiService;
