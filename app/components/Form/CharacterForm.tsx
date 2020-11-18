import React, { ChangeEvent, MouseEvent } from 'react';
import { Button, Form, FormControl, FormGroup, FormLabel, FormText } from 'react-bootstrap';
import { CharacterType, PrimaryAttributes } from '../../services/CharacterService';

type Props = {
    onSubmit: Function,
    initialData?: CharacterType
}

type State = {
    name: string,
    primaryAttributes: PrimaryAttributes,
    loading: boolean
}

class CharacterForm extends React.Component<Props, State>{
    state = {
        name: '',
        primaryAttributes: {
            Mut: 0,
            Klugheit: 0,
            Intuition: 0,
            Charisma: 0,
            Fingerfertigkeit: 0,
            Gewandheit: 0,
            Konstitution: 0,
            Koerperkraft: 0
        },
        loading: false,
    }

    componentDidMount() {
        if (this.props.initialData) {
            this.setState({
                name: this.props.initialData.name,
                primaryAttributes: this.props.initialData.primaryAttributes
            });
        }
    }

    handleSubmit = async (event: MouseEvent) => {
        this.setState({
            loading: true
        });
        await this.props.onSubmit({
            name: this.state.name,
            primaryAttributes: this.state.primaryAttributes
        });
        this.setState({
            loading: false
        });
        event.preventDefault();
    }

    render() {
        return <Form>
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
                    value={this.state.primaryAttributes.Mut}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState(Object.assign(
                        {},
                        this.state,
                        { primaryAttributes: { ...this.state.primaryAttributes, Mut: parseInt(event.currentTarget.value, 10) }}
                    ))}/>
            </FormGroup>
            <FormGroup>
                <FormLabel>Klugheit</FormLabel>
                <FormControl type="number"
                    placeholder="0"
                    value={this.state.primaryAttributes.Klugheit}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState(Object.assign(
                        {},
                        this.state,
                        { primaryAttributes: { ...this.state.primaryAttributes, Klugheit: parseInt(event.currentTarget.value, 10) }}
                    ))}/>
            </FormGroup>
            <FormGroup>
                <FormLabel>Intuition</FormLabel>
                <FormControl type="number"
                    placeholder="0"
                    value={this.state.primaryAttributes.Intuition}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState(Object.assign(
                        {},
                        this.state,
                        { primaryAttributes: { ...this.state.primaryAttributes, Intuition: parseInt(event.currentTarget.value, 10) }}
                    ))}/>
            </FormGroup>
            <FormGroup>
                <FormLabel>Charisma</FormLabel>
                <FormControl type="number"
                    placeholder="0"
                    value={this.state.primaryAttributes.Charisma}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState(Object.assign(
                        {},
                        this.state,
                        { primaryAttributes: { ...this.state.primaryAttributes, Charisma: parseInt(event.currentTarget.value, 10) }}
                    ))}/>
            </FormGroup>
            <FormGroup>
                <FormLabel>Fingerfertigkeit</FormLabel>
                <FormControl type="number"
                    placeholder="0"
                    value={this.state.primaryAttributes.Fingerfertigkeit}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState(Object.assign(
                        {},
                        this.state,
                        { primaryAttributes: { ...this.state.primaryAttributes, Fingerfertigkeit: parseInt(event.currentTarget.value, 10) }}
                    ))}/>
            </FormGroup>
            <FormGroup>
                <FormLabel>Gewandheit</FormLabel>
                <FormControl type="number"
                    placeholder="0"
                    value={this.state.primaryAttributes.Gewandheit}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState(Object.assign(
                        {},
                        this.state,
                        { primaryAttributes: { ...this.state.primaryAttributes, Gewandheit: parseInt(event.currentTarget.value, 10) }}
                    ))}/>
            </FormGroup>
            <FormGroup>
                <FormLabel>Konstitution</FormLabel>
                <FormControl type="number"
                    placeholder="0"
                    value={this.state.primaryAttributes.Konstitution}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState(Object.assign(
                        {},
                        this.state,
                        { primaryAttributes: { ...this.state.primaryAttributes, Konstitution: parseInt(event.currentTarget.value, 10) }}
                    ))}/>
            </FormGroup>
            <FormGroup>
                <FormLabel>Koerperkraft</FormLabel>
                <FormControl type="number"
                    placeholder="0"
                    value={this.state.primaryAttributes.Koerperkraft}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState(Object.assign(
                        {},
                        this.state,
                        { primaryAttributes: { ...this.state.primaryAttributes, Koerperkraft: parseInt(event.currentTarget.value, 10) }}
                    ))}/>
            </FormGroup>
            <Button variant="primary" className={`${this.state.loading ? 'disabled' : ''}`} onClick={this.handleSubmit} >
                Send
            </Button>
        </Form>
    }
}

export default CharacterForm;