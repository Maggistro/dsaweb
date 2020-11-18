import React, { ChangeEvent, MouseEvent } from 'react';
import { CloseButton, ModalProps, Toast } from 'react-bootstrap';
import { Button, Form, FormControl, FormGroup, FormLabel, FormText, Modal } from 'react-bootstrap';
import CharacterService, { PrimaryAttributes } from '../../services/CharacterService';

type State = {
    name: string,
    attributes: PrimaryAttributes,
    error: string
}

type Props = ModalProps & {
    characterService: CharacterService,
}

class AddCharacterModal extends React.Component<Props, State> {

    state = {
        name: '',
        attributes: {
            Mut: 0,
            Klugheit: 0,
            Intuition: 0,
            Charisma: 0,
            Fingerfertigkeit: 0,
            Gewandheit: 0,
            Konstitution: 0,
            Koerperkraft: 0
        },
        error: ''
    }

    handleCharacterSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        const button = event.currentTarget;
        button.classList.add('disabled');
        const result = await this.props.characterService.addCharacter({
            name: this.state.name,
            attributes: this.state.attributes
        })
        this.setState({
            error: result
        });
        button.classList.remove('disabled');
        // this.props.onSubmit();
        event.preventDefault();
    }

    render() {
        return <Modal {...this.props}>
            <div>
                <CloseButton onClick={this.props.onHide}></CloseButton>
            </div>
            <div className='error'>{this.state.error}</div>
            <Form>
                <FormGroup>
                    <FormLabel>Name</FormLabel>
                    <FormControl type="text"
                        placeholder="Jon Doe"
                        value={this.state.name}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState(Object.assign(
                            {},
                            this.state,
                            { name :event.currentTarget.value }
                        ))}/>
                    <FormText>
                        Full Character name
                    </FormText>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Mut</FormLabel>
                    <FormControl type="number"
                        placeholder="0"
                        value={this.state.attributes.Mut}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState(Object.assign(
                            {},
                            this.state,
                            { attributes: { ...this.state.attributes, Mut: parseInt(event.currentTarget.value, 10) }}
                        ))}/>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Klugheit</FormLabel>
                    <FormControl type="number"
                        placeholder="0"
                        value={this.state.attributes.Klugheit}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState(Object.assign(
                            {},
                            this.state,
                            { attributes: { ...this.state.attributes, Klugheit: parseInt(event.currentTarget.value, 10) }}
                        ))}/>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Intuition</FormLabel>
                    <FormControl type="number"
                        placeholder="0"
                        value={this.state.attributes.Intuition}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState(Object.assign(
                            {},
                            this.state,
                            { attributes: { ...this.state.attributes, Intuition: parseInt(event.currentTarget.value, 10) }}
                        ))}/>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Charisma</FormLabel>
                    <FormControl type="number"
                        placeholder="0"
                        value={this.state.attributes.Charisma}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState(Object.assign(
                            {},
                            this.state,
                            { attributes: { ...this.state.attributes, Charisma: parseInt(event.currentTarget.value, 10) }}
                        ))}/>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Fingerfertigkeit</FormLabel>
                    <FormControl type="number"
                        placeholder="0"
                        value={this.state.attributes.Fingerfertigkeit}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState(Object.assign(
                            {},
                            this.state,
                            { attributes: { ...this.state.attributes, Fingerfertigkeit: parseInt(event.currentTarget.value, 10) }}
                        ))}/>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Gewandheit</FormLabel>
                    <FormControl type="number"
                        placeholder="0"
                        value={this.state.attributes.Gewandheit}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState(Object.assign(
                            {},
                            this.state,
                            { attributes: { ...this.state.attributes, Gewandheit: parseInt(event.currentTarget.value, 10) }}
                        ))}/>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Konstitution</FormLabel>
                    <FormControl type="number"
                        placeholder="0"
                        value={this.state.attributes.Konstitution}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState(Object.assign(
                            {},
                            this.state,
                            { attributes: { ...this.state.attributes, Konstitution: parseInt(event.currentTarget.value, 10) }}
                        ))}/>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Koerperkraft</FormLabel>
                    <FormControl type="number"
                        placeholder="0"
                        value={this.state.attributes.Koerperkraft}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState(Object.assign(
                            {},
                            this.state,
                            { attributes: { ...this.state.attributes, Koerperkraft: parseInt(event.currentTarget.value, 10) }}
                        ))}/>
                </FormGroup>
                <Button variant="primary" onClick={this.handleCharacterSubmit} >
                    Send
                </Button>
            </Form>
        </Modal>
    }
}

export default AddCharacterModal;
