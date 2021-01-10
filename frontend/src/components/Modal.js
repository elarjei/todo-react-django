import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label,
} from 'reactstrap'

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem
        }
    }
    handleChange = e => {
        let { name, value } = e.target;
        if (e.target.type === 'checkbox') {
            value = e.target.checked;
        }
        const activeItem = { ...this.state.activeItem, [name]: value }
        this.setState({ activeItem });
    }
    render() {
        const { toggle, onSave } = this.props;
        return(
            <Modal isOpen={ true } toggle={ toggle }>
                <ModalHeader toggle={ toggle }>Agenda Baru</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for='title'>Judul Agenda</Label>
                            <Input
                                type="text"
                                name="title"
                                value={this.state.activeItem.title}
                                onChange={this.handleChange}
                                placeholder='Ayang, judul agenda kamu apa?'
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for='description'>Deskripsi</Label>
                            <Input
                                type='text'
                                name='description'
                                value={ this.state.activeItem.description }
                                onChange={ this.handleChange }
                                placeholder='Tuliskan detail agenda kamu bebb'
                            />
                        </FormGroup>
                        <FormGroup check>
                            <Label for='completed'>
                                <Input
                                    type='checkbox'
                                    name='completed'
                                    value={ this.state.activeItem.completed }
                                    onChange={ this.handleChange }
                                />
                                Tandai Selesai
                            </Label>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={() => onSave(this.state.activeItem)}>
                        Simpan
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}