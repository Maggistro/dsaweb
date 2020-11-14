import React, { createRef } from 'react';
import Character, { onChangeParameter } from '../../components/character/Character';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './fight.module.css';
import characters from '../../fictures/characters';
import CharacterService, { CharacterType } from '../../services/CharacterService';

type CharacterEntry = {
        order: number,
        left: number,
        ref: React.RefObject<HTMLDivElement>
        data: CharacterType
};

type FightState = {
    isDragging: boolean,
    characters: Array<CharacterEntry>
};

class Fight extends React.Component<{}, FightState>  {
    state = {
        isDragging: false,
        characters: new Array<CharacterEntry>(),
    }

    constructor(props: {}) {
        super(props);
        const characterService = new CharacterService();
        this.state.characters = characterService.getCharacters() 
            .map((character: CharacterType) => ({
                data: character,
                order: 100 - character.secondaryAttributes.Initiative,
                left: 0,
                ref: createRef<HTMLDivElement>()
            })
        );
    }

    updateOrder = (data: onChangeParameter) => {
        const newCharacters = this.state.characters.map((character: CharacterEntry) => {
            if (data.id === character.data.id) {
                character.order = 100 - (data.Initiative ?? 0);
            }
            return character;
        })

        this.setState({
            characters: newCharacters
        });
    }

    updateOrderManual = (left: number, id: number) => {
        const newCharacters = this.state.characters
            .map((character: CharacterEntry) => {
                if (character.data.id === id) {
                    character.left = left;
                } else {
                    character.left = character.ref.current?.getBoundingClientRect().x ?? 0;
                }
                return character;
            })
            .sort((a, b) => a.left - b.left)
            .map((character: CharacterEntry, index: number) => {
                character.order = index;
                return character;
            });

            this.setState({
                characters: newCharacters
            });
    }
    
    onDrag = (event: React.MouseEvent) => {
        if (this.state.isDragging) {
            event.currentTarget.setAttribute('style', 
                `top: ${event.clientY}px; left: ${event.clientX}px;`
            );
        }
    }

    onMouseDown = (event: React.MouseEvent) => {
        this.setState({
            isDragging: true
        });
        event.currentTarget.parentElement?.setAttribute('style', 
            `top: ${event.clientY}px; left: ${event.clientX}px;`
        );
        event.currentTarget.parentElement?.classList.add(styles.dragging);
    }

    onMouseUp = (event: React.MouseEvent, id: number) => {
        this.setState({
            isDragging: false
        });
        event.currentTarget.setAttribute('style', 
            `top: 0px; left: 0px;`
        );
        event.currentTarget.classList.remove(styles.dragging);
        this.updateOrderManual(event.clientX, id);
    }

    renderCharacter = (character: CharacterEntry, key: number) => 
        <Col
            key={key} 
            xs={{ order: character.order }} 
            md="auto"
            ref={character.ref}                      
            onMouseUp={(event: React.MouseEvent) => this.onMouseUp(event, character.data.id)}
            onMouseMove={this.onDrag}
        >
            <div className={styles.dragbar}
                onMouseDown={this.onMouseDown}   
            >
            </div>
            <Character          
                {...character.data}
                onDataChange={this.updateOrder}
            />
        </Col>

    render() {
        return (
            <div className={styles.fight}>
                <h3>Kampfreihenfolge</h3>
                <Container>
                    <Row>
                        { this.state.characters.map(this.renderCharacter) }
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Fight;