import React from 'react';
import { Button, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import CharacterService, { ExtendedCharacterType } from '../../services/CharacterService';
import styles from './CharacterCard.module.css';

type State = {
    initiativeModifier: number
}

type Props = ExtendedCharacterType & {
    onDataChange: Function,
    onUpdate: Function
}

/**
 * Type for the character change event parameter
 */
export type onChangeParameter = {
    id: number,
    Initiative?: number
}

/**
 * Renders a card for a given character
 */
class CharacterCard extends React.Component<Props, State> {

    characterService: CharacterService;
    
    constructor(props: Props) {
        super(props);
        this.characterService = new CharacterService();
    }

    /**
     * Suppress click event for drag
     * @param event
     */
    onClick = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
    }

    /**
     * Handle changes to the modifiers
     * @param event The form change event
     */
    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value, 10);

        this.characterService.modifySecondary(
            this.props.id,
            {
                Initiative: newValue,
            }
        );
        this.props.onDataChange();
    }

    /**
     * Renders the card
     */
    render() {
        return <div className={styles.character}>
            <h3>{this.props.name}</h3>
            <div>
                Initiative {this.characterService.getInitiative(this.props.id)}
            </div>
            <FormGroup>
                <FormLabel>
                    Initiative Modifier
                </FormLabel>
                <FormControl
                    onChange={this.handleChange}
                    type="number"
                    value={this.characterService.getCharacter(this.props.id)?.modification.secondary.Initiative}
                />
            </FormGroup>
            <Button onClick={() => this.props.onUpdate(this.props.id)}>
                Update
            </Button>
        </div>
    }
}

export default CharacterCard;
