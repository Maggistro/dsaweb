import React, { ChangeEvent, MouseEvent } from 'react';
import { CloseButton, ModalProps, Toast } from 'react-bootstrap';
import { Button, Form, FormControl, FormGroup, FormLabel, FormText, Modal } from 'react-bootstrap';
import CharacterService, { NewCharacterType, PrimaryAttributes } from '../../../services/CharacterService';
import CharacterForm from '../../Form/CharacterForm';

type State = {
    message: string
}

type Props = ModalProps & {
    id: string,
    characterService: CharacterService,
}

/**
 * Renders a update character modal
 */
class UpdateCharacterModal extends React.Component<Props, State> {

    state = {
        message: ''
    }

    /**
     * Sends the update data for an existing character
     * @param character The updated character data
     */
    handleCharacterSubmit = async (character: NewCharacterType) => {
        const result = await this.props.characterService.updateCharacter(this.props.id, character);
        this.setState({
            message: result
        });
    }

    /**
     * Renders the modal
     */
    render() {
        let modalProps = Object.assign({}, this.props) as ModalProps;
        modalProps.id = undefined;
        modalProps.characterService = undefined;
        return <Modal {...this.props}>
            <div>
                <CloseButton onClick={this.props.onHide}></CloseButton>
            </div>
            <div className='message'>{this.state.message}</div>
            <CharacterForm
                initialData={this.props.characterService.getCharacter(this.props.id)}
                onSubmit={this.handleCharacterSubmit}
            />
        </Modal>
    }
}

export default UpdateCharacterModal;
