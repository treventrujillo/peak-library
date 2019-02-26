import React from 'react';
import { Message, Button } from 'semantic-ui-react';

const MessageBox = (props) => {
    return (
        <div id="message-box">
            <Message attached='top' size='large' floating>
                <Message.Header>{ props.header ? props.header : '' }</Message.Header>
                <Message.Content>{ props.content ? props.content : '' }</Message.Content>
                { props.isConfirm ? confirmationButton(props) : '' }
            </Message>
        </div>
    );
}

const confirmationButton = (props) => {
    return (
        <Message.Content>
            <Button.Group>
                <Button onClick={() => props.callbackOK()} color="blue">OK</Button>
            </Button.Group>
        </Message.Content> 
    )
}


export default MessageBox;