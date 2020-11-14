import React from 'react';
import { FormControl, FormGroup, FormLabel, InputGroup } from 'react-bootstrap';
import styles from './Character.module.css';

type Props = {
    name: string,
    attributes: Attributes
}

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

type CharacterState = {
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

class Character extends React.Component<Props, CharacterState> {

    state = {
        Lebensenergie: 0,
        Astralenergie: 0,
        Karmaenergie: 0,
        Seelenkraft: 0,
        Zaehigkeit: 0,
        Ausweichen: 0,
        Initiative: 0,
        Geschwindigkeit: 0,
        Wundschwelle: 0
    }

    componentDidMount() {
        this.setState({
            Lebensenergie: 0, // TODO 
            Astralenergie: 0, // TODO 20/Zauberer + Leiteigenschaft
            Karmaenergie: 0, // TODO 20/Geweit + Leiteigenschaft
            Seelenkraft: 0, // TODO GW spezies + (Mut + Klugheit + Intuition)/6
            Zaehigkeit: 9, // TODO GW spezies + (Konstituion + Konstitution + Koerperkraft)/6
            Ausweichen: this.props.attributes.Gewandheit / 2,
            Initiative: (this.props.attributes.Mut + this.props.attributes.Gewandheit) / 2,
            Geschwindigkeit: 0, // TODO Gw spezies ( einbeinig )
            Wundschwelle: this.props.attributes.Konstitutiokn / 2
        });
    }

    onClick = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            Initiative: parseInt(event.target.value, 10)
        });
    }

    render() {
        return <div className={styles.character}>
            <h3>{this.props.name}</h3>
            <FormGroup>
                <FormLabel>
                    Initiative
                </FormLabel>
                <FormControl
                    onChange={this.handleChange} 
                    type="number" 
                    value={this.state.Initiative}
                />
            </FormGroup>
        </div>
    }
}

export default Character;
