import React from 'react';
import { Message, Button } from 'semantic-ui-react';

const MessageBox = (props) => {
    return (
        <div>
            <Message attached='top' size='large' floating>
                <Message.Header>{ props.header ? props.header : '' }</Message.Header>
                <Message.Content>{ props.content ? props.content : '' }</Message.Content>
                { props.isConfirm ? confirmationButtons(props) : '' }
            </Message>
        </div>
    );
}

const confirmationButtons = (props) => {
    return (
        <Message.Content>
            <Button.Group>
                <Button onClick={() => props.callbackOK()} color="blue">OK</Button>
                <Button color="grey">Cancel</Button>
            </Button.Group>
        </Message.Content> 
    )
}


export default MessageBox;