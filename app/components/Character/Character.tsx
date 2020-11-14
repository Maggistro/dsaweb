import React from 'react';
import { FormControl, FormGroup, FormLabel, InputGroup } from 'react-bootstrap';
import CharacterService, { Attributes, BlankCharacterType, CharacterType, SecondaryAttributes } from '../../services/CharacterService';
import styles from './Character.module.css';

type State = {
    initiativeModifier: number
}

type Props = BlankCharacterType & {
    onDataChange: Function
}

export type onChangeParameter = {
    id: number,
    Initiative?: number
}

class Character extends React.Component<Props, State> {

    characterService: CharacterService;

    state = {
        initiativeModifier: 0
    }

    constructor(props: Props) {
        super(props);
        this.characterService = new CharacterService();
    }

    onClick = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value, 10); 
        this.setState({
            initiativeModifier: newValue
        });

        this.characterService.modifySecondary(
            this.props.id,
            {
                Initiative: newValue,
            }
        );
        this.props.onDataChange();
    }

    render() {
        return <div className={styles.character}>
            <h3>{this.props.title}</h3>
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
                    value={this.state.initiativeModifier}
                />
            </FormGroup>
        </div>
    }
}

export default Character;
