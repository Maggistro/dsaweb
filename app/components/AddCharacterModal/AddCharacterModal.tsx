import React, { ChangeEvent, MouseEvent } from 'react';
import { ModalProps, Toast } from 'react-bootstrap';
import { Button, Form, FormControl, FormGroup, FormLabel, FormText, Modal } from 'react-bootstrap';
import { PrimaryAttributes } from '../../services/CharacterService';

type State = {
    name: string,
    attributes: PrimaryAttributes
}

class AddCharacterModal extends React.Component<ModalProps, State> {

    state = {
        name: "",
        attributes: {
            Mut: 0,
            Klugheit: 0,
            Intuition: 0,
            Charisma: 0,
            Fingerfertigkeit: 0,
            Gewandheit: 0,
            Konstitution: 0,
            Koerperkraft: 0
        }
    }

    onFieldChange = (field: string, value: string|number) => {

    }

    handleCharacterSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        const response = await fetch('/api/character', {
            method: 'PUT',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status !== 200) console.error(response);
        event.preventDefault();
    }

    render() {
        return <Modal {...this.props}>
            <Form>
                <FormGroup>
                    <FormLabel>Name</FormLabel>
                    <FormControl type="text"
                        placeholder="Jon Doe"
                        value={this.state.name}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState({name: event.currentTarget.value})}/>
                    <FormText>
                        Full Character name
                    </FormText>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Mut</FormLabel>
                    <FormControl type="number"
                        placeholder="0"
                        value={this.state.attributes.Mut}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState({ attributes: {
                            ...this.state.attributes,
                            Mut: parseInt(event.currentTarget.value, 10) }
                        })}/>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Klugheit</FormLabel>
                    <FormControl type="number"
                        placeholder="0"
                        value={this.state.attributes.Klugheit}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState({ attributes: {
                            ...this.state.attributes,
                            Klugheit: parseInt(event.currentTarget.value, 10) }
                        })}/>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Intuition</FormLabel>
                    <FormControl type="number"
                        placeholder="0"
                        value={this.state.attributes.Intuition}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState({ attributes: {
                            ...this.state.attributes,
                            Intuition: parseInt(event.currentTarget.value, 10) }
                        })}/>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Charisma</FormLabel>
                    <FormControl type="number"
                        placeholder="0"
                        value={this.state.attributes.Charisma}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState({ attributes: {
                            ...this.state.attributes,
                            Charisma: parseInt(event.currentTarget.value, 10) }
                        })}/>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Fingerfertigkeit</FormLabel>
                    <FormControl type="number"
                        placeholder="0"
                        value={this.state.attributes.Fingerfertigkeit}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState({ attributes: {
                            ...this.state.attributes,
                            Fingerfertigkeit: parseInt(event.currentTarget.value, 10) }
                        })}/>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Gewandheit</FormLabel>
                    <FormControl type="number"
                        placeholder="0"
                        value={this.state.attributes.Gewandheit}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState({ attributes: {
                            ...this.state.attributes,
                            Gewandheit: parseInt(event.currentTarget.value, 10) }
                        })}/>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Konstitution</FormLabel>
                    <FormControl type="number"
                        placeholder="0"
                        value={this.state.attributes.Konstitution}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState({ attributes: {
                            ...this.state.attributes,
                            Konstitution: parseInt(event.currentTarget.value, 10) }
                        })}/>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Koerperkraft</FormLabel>
                    <FormControl type="number"
                        placeholder="0"
                        value={this.state.attributes.Koerperkraft}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState({ attributes: {
                            ...this.state.attributes,
                            Koerperkraft: parseInt(event.currentTarget.value, 10) }
                        })}/>
                </FormGroup>
                <Button variant="primary" onClick={this.handleCharacterSubmit} >
                    Send
                </Button>
            </Form>
        </Modal>
    }
}

export default AddCharacterModal;
