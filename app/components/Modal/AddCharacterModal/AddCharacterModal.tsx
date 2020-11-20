import React, { ChangeEvent, MouseEvent } from 'react';
import { CloseButton, ModalProps, Toast } from 'react-bootstrap';
import { Button, Form, FormControl, FormGroup, FormLabel, FormText, Modal } from 'react-bootstrap';
import CharacterService, { NewCharacterType, PrimaryAttributes } from '../../../services/CharacterService';
import CharacterForm from '../../Form/CharacterForm';

type State = {
    message: string
}

type Props = ModalProps & {
    characterService: CharacterService,
}

class AddCharacterModal extends React.Component<Props, State> {

    state = {
        message: ''
    }

    handleCharacterSubmit = async (character: NewCharacterType) => {
        const result = await this.props.characterService.addCharacter(character);
        this.setState({
            message: result
        });
    }

    render() {
        return <Modal {...this.props}>
            <div>
                <CloseButton onClick={this.props.onHide}></CloseButton>
            </div>
            <div className='message'>{this.state.message}</div>
            <CharacterForm
                onSubmit={this.handleCharacterSubmit}
            />
        </Modal>
    }
}

export default AddCharacterModal;
