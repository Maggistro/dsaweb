import React, { createRef } from 'react';
import Character from '../../components/Character/Character';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './fight.module.css';

type FightState = {
    isDragging: boolean,
    characters: Array<CharacterType>
};

type CharacterType = {
    id: number,
    order: number,
    left: number,
    ref: React.RefObject<HTMLDivElement>,
    title: string
};

class Fight extends React.Component<{}, FightState>  {

    state = {
        isDragging: false,
        characters: [
            {
                id: 1,
                title: "Title1",
                order: 1,
                left: 0,
                ref: createRef<HTMLDivElement>()
            },
            {
                id: 2,
                title: "Title2",
                order: 2,
                left: 0,
                ref: createRef<HTMLDivElement>()
            },
            {
                id: 3,
                title: "Title3",
                order: 3,
                left: 0,
                ref: createRef<HTMLDivElement>()
            },
        ],
    }

    updateOrder = (left: number, id: number) => {
        const newCharacters = this.state.characters
            .map((character: CharacterType) => {
                if (character.id === id) {
                    character.left = left;
                } else {
                    character.left = character.ref.current?.getBoundingClientRect().x ?? 0;
                }
                return character;
            })
            .sort((a, b) => a.left - b.left)
            .map((character: CharacterType, index: number) => {
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
        event.currentTarget.setAttribute('style', 
            `top: ${event.clientY}px; left: ${event.clientX}px;`
        );
        event.currentTarget.classList.add(styles.dragging);
    }

    onMouseUp = (event: React.MouseEvent, id: number) => {
        this.setState({
            isDragging: false
        });
        event.currentTarget.setAttribute('style', 
            `top: 0px; left: 0px;`
        );
        event.currentTarget.classList.remove(styles.dragging);
        this.updateOrder(event.clientX, id);
        
    }

    renderCharacter = (character: CharacterType, key: number) => 
        <Col
            key={key} 
            xs={{ order: character.order }} 
            md="auto"
            ref={character.ref}
            onMouseDown={this.onMouseDown} 
            onMouseUp={(event: React.MouseEvent) => this.onMouseUp(event, character.id)}
            onMouseMove={this.onDrag}                        
        >
            <Character          
                name={character.title}
                initiative={10}
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