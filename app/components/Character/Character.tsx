import React from 'react';
import { FormControl, FormGroup, FormLabel, InputGroup } from 'react-bootstrap';
import CharacterService, { Attributes, CharacterType, SecondaryAttributes } from '../../services/CharacterService';
import styles from './Character.module.css';

type State = {
    initiativeModifier: number
}

type Props = CharacterType & {
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

        this.props.onDataChange({
            id: this.props.id,
            Initiative: this.props.secondaryAttributes.Initiative + newValue,
        });    
    }

    render() {
        return <div className={styles.character}>
            <h3>{this.props.title}</h3>
            <div>
                Initiative {this.state.initiativeModifier + this.props.secondaryAttributes?.Initiative}
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
