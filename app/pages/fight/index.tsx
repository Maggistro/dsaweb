import React, { createRef } from 'react';
import { BsPlusCircle } from "react-icons/bs";
import { Button, Col, Container, Nav, Row } from 'react-bootstrap';
import CharacterCard, { onChangeParameter } from '../../components/CharacterCard/CharacterCard';
import CharacterService, { BlankCharacterType } from '../../services/CharacterService';
import styles from './fight.module.css';
import AddCharacterModal from '../../components/Modal/AddCharacterModal/AddCharacterModal';
import UpdateCharacterModal from '../../components/Modal/UpdateCharacterModal/UpdateCharacterModal';
import Navbar from '../../components/Navbar/Navbar';

type CharacterEntry = {
        order: number,
        left: number,
        ref: React.RefObject<HTMLDivElement>
        data: BlankCharacterType
};

type FightState = {
    isDragging: boolean,
    showCharacterModal: boolean,
    showCharacterUpdateModal: boolean,
    selectedCharacterId: string,
    characters: Array<CharacterEntry>
};

type FightProps = {
    characters: Array<BlankCharacterType>
}

class Fight extends React.Component<FightProps, FightState>  {
    state = {
        isDragging: false,
        showCharacterModal: false,
        showCharacterUpdateModal: false,
        selectedCharacterId: "",
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

    updateOrderManual = (left: number, id: string) => {
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

    onMouseUp = (event: React.MouseEvent, id: string) => {
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

    toggleCharacterUpdateModal = (id: string) => {
        this.setState({
            selectedCharacterId: id,
            showCharacterUpdateModal: !this.state.showCharacterUpdateModal
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
            <CharacterCard
                {...character.data}
                onDataChange={this.updateOrder}
                onUpdate={this.toggleCharacterUpdateModal}
            />
        </Col>

    render() {
        return (
            <>
                <Navbar>
                    <Button onClick={this.toggleCharacterModal}>
                        Add Character <BsPlusCircle/>
                    </Button>
                    <AddCharacterModal
                        show={this.state.showCharacterModal}
                        onSubmit={this.toggleCharacterModal}
                        characterService={this.characterService}
                        onHide={this.toggleCharacterModal}
                    />
                </Navbar>
                <div className={styles.fight}>
                    <UpdateCharacterModal
                        id={this.state.selectedCharacterId}
                        show={this.state.showCharacterUpdateModal}
                        onSubmit={this.toggleCharacterUpdateModal}
                        characterService={this.characterService}
                        onHide={this.toggleCharacterUpdateModal}
                    />
                    <h3>Kampfreihenfolge</h3>
                    <Container>
                        <Row>
                            { this.state.characters.map(this.renderCharacter) }
                        </Row>
                    </Container>
                </div>
            </>
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