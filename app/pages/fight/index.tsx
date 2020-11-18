import React, { createRef } from 'react';
import { BsPlusCircle } from "react-icons/bs";
import { Button, Col, Container, Row } from 'react-bootstrap';
import Character, { onChangeParameter } from '../../components/Character/Character';
import CharacterService, { BlankCharacterType } from '../../services/CharacterService';
import styles from './fight.module.css';
import AddCharacterModal from '../../components/AddCharacterModal/AddCharacterModal';

type CharacterEntry = {
        order: number,
        left: number,
        ref: React.RefObject<HTMLDivElement>
        data: BlankCharacterType
};

type FightState = {
    isDragging: boolean,
    showCharacterModal: boolean,
    characters: Array<CharacterEntry>
};

type FightProps = {
    characters: Array<BlankCharacterType>
}

class Fight extends React.Component<FightProps, FightState>  {
    state = {
        isDragging: false,
        showCharacterModal: false,
        characters: new Array<CharacterEntry>(),
    }
    characterService: CharacterService;

    constructor(props: FightProps) {
        super(props);
        this.characterService = new CharacterService(props.characters);
    }

    componentDidMount() {
        this.setState({
            characters: this.props.characters
                .map((character: BlankCharacterType) => ({
                    data: character,
                    order: 20 - this.characterService.getInitiative(character.id),
                    left: 0,
                    ref: createRef<HTMLDivElement>()
                })
            )
        });
    }

    updateOrder = (data: onChangeParameter) => {
        const newCharacters = this.state.characters.map((entry) => ({
            ...entry,
            order: 20 - this.characterService.getInitiative(entry.data.id)
        }));

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
        if (this.state.isDragging) {
            this.setState({
                isDragging: false
            });
            event.currentTarget.setAttribute('style',
                `top: 0px; left: 0px;`
            );
            event.currentTarget.classList.remove(styles.dragging);
            this.updateOrderManual(event.clientX, id);
        }
    }

    toggleCharacterModal = () => {
        this.setState({
            showCharacterModal: !this.state.showCharacterModal
        });
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
                <AddCharacterModal show={this.state.showCharacterModal} onHide={this.toggleCharacterModal}/>
                <h3>Kampfreihenfolge</h3>
                <Container>
                    <Row>
                        <Col md="auto">
                            <Button onClick={this.toggleCharacterModal}>
                                <BsPlusCircle/>
                            </Button>
                        </Col>
                        { this.state.characters.map(this.renderCharacter) }
                    </Row>
                </Container>
            </div>
        );
    }
}

export async function getServerSideProps() {
    // Fetch data from external db
    const characterService = new CharacterService();
    const characters = await characterService.getCharactersFromDb();

    // Pass data to the page via props
    return {
        props: {
            characters: characters || []
        }
    }
}

export default Fight;