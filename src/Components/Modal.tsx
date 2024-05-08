import React, { Component } from 'react';

import {
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
    TEModalFooter,
    TEInput,
} from 'tw-elements-react';

type item = {
    'title': string,
    'description': string,
  };

interface CustomModalProps {
    activeItem: item;
    active: boolean;
    toggle: any;
    onSave: any;
};
interface CustomModalState {
    activeItem: item;
};

class CustomModal extends Component<CustomModalProps, CustomModalState> {
    constructor(props: any) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem
        };
    };

    handleChange = (e: any) => {
        let {id, value} = e.target;

        const activeItem = {...this.state.activeItem, [id]: value};
        this.setState({activeItem: activeItem});
    };

    render() {
        const {active, toggle, onSave} = this.props;

        return (
            <TEModal show={active} setShow={toggle}>
                <TEModalDialog>
                    <TEModalContent>
                        <TEModalHeader>
                        <h5>Patch Item</h5>

                        {/**
                        * TODO: Add close button
                        */}
                        </TEModalHeader>
                        <TEModalBody>
                            <form>
                                <TEInput
                                    type="text"
                                    id="title"
                                    value={this.state.activeItem.title}
                                    onChange={this.handleChange}
                                    label="Title">
                                </TEInput>

                                <TEInput
                                    type="text"
                                    id="description"
                                    value={this.state.activeItem.description}
                                    onChange={this.handleChange}
                                    label="Description">
                                </TEInput>
                            </form>
                        </TEModalBody>
                        <TEModalFooter>
                            <button 
                            onClick={() => onSave(this.state.activeItem)}
                            className="inline-block rounded btn btn-primary"
                            >
                                Save
                            </button>
                        </TEModalFooter>
                    </TEModalContent>
                </TEModalDialog>
            </TEModal>
        );
    };
};

export default CustomModal;