import {Alert} from 'react-bootstrap';

import {IMessageProps} from './IMessage';

const Message = ({variant = 'info', children}: IMessageProps) => {
	return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
