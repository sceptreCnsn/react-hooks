import React, {useContext} from 'react';
import AuthContext from '../auth-context';

const Header = props => {
    const auth = useContext(AuthContext);
    return (
        <header>
            <button onClick={props.onLoadTodos}>ToDoList</button> | <button onClick={props.onLoadAuth}>Auth</button>
        </header>
    );
}

export default Header;