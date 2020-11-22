import React, { createRef } from 'react';
import { BsPlusCircle } from "react-icons/bs";
import { Button, Col, Container, Nav, Row } from 'react-bootstrap';
import CharacterCard, { onChangeParameter } from '../../components/CharacterCard/CharacterCard';
import CharacterService, { BlankCharacterType } from '../../services/CharacterService';
import styles from './fight.module.css';
import AddCharacterModal from '../../components/Modal/AddCharacterModal/AddCharacterModal';
import UpdateCharacterModal from '../../components/Modal/UpdateCharacterModal/UpdateCharacterModal';
import Navbar from '../../components/Navbar/Navbar';
import { NextPageContext } from 'next';
import { IncomingMessage, Server } from 'http';
import SocketServerService, { ExtendedHttpServer } from '../../services/SocketServerService';

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

/**
 * Page containing the fight order
 */
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

    /**
     * Initialise the characters in fight on load
     */
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

    /**
     * Handle changes to a characters initiative
     * @param data Add new/updated character and reorder
     */
    updateOrder = (data: onChangeParameter) => {
        const newCharacters = this.state.characters.map((entry) => ({
            ...entry,
            order: 20 - this.characterService.getInitiative(entry.data.id)
        }));

        this.setState({
            characters: newCharacters
        });
    }

    /**
     * Handles reordering by drag/drop of a character card
     * @param left position in pixel from the left of the screen
     * @param id The moved characters id
     */
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

    /**
     * Update card position ( stick to mouse )
     * @param event Mouse move event
     */
    onDrag = (event: React.MouseEvent) => {
        if (this.state.isDragging) {
            event.currentTarget.setAttribute('style',
                `top: ${event.clientY}px; left: ${event.clientX}px;`
            );
        }
    }

    /**
     * Initiate dragging behaviour
     * @param event Mouse down event
     */
    onMouseDown = (event: React.MouseEvent) => {
        this.setState({
            isDragging: true
        });
        event.currentTarget.parentElement?.setAttribute('style',
            `top: ${event.clientY}px; left: ${event.clientX}px;`
        );
        event.currentTarget.parentElement?.classList.add(styles.dragging);
    }

    /**
     * Handles end of a drag operation
     * @param event Mouse up event
     * @param id The character beeing dragged
     */
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

    /**
     * Show/hide character add modal
     */
    toggleCharacterModal = () => {
        this.setState({
            showCharacterModal: !this.state.showCharacterModal
        });
    }

    /**
     * Show/hide character update modal
     * @param id The target characters id
     */
    toggleCharacterUpdateModal = (id: string) => {
        this.setState({
            selectedCharacterId: id,
            showCharacterUpdateModal: !this.state.showCharacterUpdateModal
        });
    }

    /**
     * Renders a single character card in order
     * @param character The character data for fight order
     * @param key The render key/index
     */
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

    /**
     * Renders the fight page with navbar and fight order
     */
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

/**
 * Fetches initial data on the server side.
 * Initialise Server side socket server.
 *
 * @param context Context for page load
 */
export async function getServerSideProps(context: NextPageContext) {
    // Fetch data from external db
    const characterService = new CharacterService();
    const characters = await characterService.getCharactersFromDb();
    const request = context.req as IncomingMessage & {
        server: ExtendedHttpServer
    };

    new SocketServerService(request.server);

    // Pass data to the page via props
    return {
        props: {
            characters: characters || []
        }
    }
}

export default Fight;