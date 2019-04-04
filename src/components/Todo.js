import React, { useState, useEffect, useReducer, useRef, useMemo } from 'react';
import axios from 'axios';

const Todo = props => {
    //const [todo, setTodo] = useState('Hello');
    // const [todoList, setTodoList] = useState([]);
    const todoInputRef = useRef({ value: 'HELLO' });

    const todoListReducer = (state, action) => {
        switch (action.type) {
            case 'ADD':
                return state.concat(action.payload);
            case 'SET':
                return action.payload;
            case 'REMOVE':
                return state.filter(x => x.id !== action.payload);
            default:
                return state;
        }
    };

    const [todoList, dispatch] = useReducer(todoListReducer, []);
    //Only at the first render
    useEffect(() => {
        axios.get('https://hooks-17e76.firebaseio.com/todos.json').then(res => {
            console.log(res);
            const dt = Object.keys(res.data).map(t => { return { id: t, name: res.data[t].todo } });
            console.log(dt);
            dispatch({ type: 'SET', payload: dt });
        }).catch(err => {
            console.log(err);
        })
    }, []);

    //Every State Change
    // useEffect(()=>{
    //     axios.get('https://hooks-17e76.firebaseio.com/todos.json').then(res => {
    //         console.log(res);
    //     }).catch(err=> {
    //         console.log(err);
    //     })
    // });

    // Every Change
    // useEffect(()=>{
    //     axios.get('https://hooks-17e76.firebaseio.com/todos.json').then(res => {
    //         console.log(res);
    //     }).catch(err=> {
    //         console.log(err);
    //     })
    // },null);

    //ComponentH
    // useEffect(() => {
    //     console.log('Input Changed: ', todoInputRef.current.value);
    //     return () => {
    //         console.log('Cleanup');
    //     }
    // }, [todoInputRef.current.value]);

    const mouseMoveHandler = (event) => {
        console.log(event.clientX, event.clientY, event.target);
    };

    // ComponentWillUnmount adds at the beginning end at destroy
    useEffect(() => {
        document.addEventListener('mousemove', mouseMoveHandler);
        return () => {
            document.removeEventListener('mousemove', mouseMoveHandler);
            console.log('Cleanup Event');
        };
    }, []);

    //Removes at every event
    // useEffect(() => {
    //     document.addEventListener('mousemove', mouseMoveHandler);
    //     return () => {
    //         document.removeEventListener('mousemove', mouseMoveHandler);
    //     };
    // });

    // const onInputChange = (e) => {
    //     setTodo(e.target.value);
    // };

    const onTodoAdded = () => {
        const todo = todoInputRef.current.value;

        axios.post('https://hooks-17e76.firebaseio.com/todos.json', { todo })
            .then((res) => {
                dispatch({ type: 'ADD', payload: { id: res.data.name, name: todo } });
            }).catch((err) => {
                console.log(err);
            });
    };

    const onTodoClear = () => {
        dispatch({ type: 'SET', payload: [] });
    };

    //Render list only todoList changes
    return (
        <>
            <h4>{todoInputRef.current.value}</h4>
            <input type="text" placeholder="Todo" ref={todoInputRef}></input>
            <button onClick={onTodoAdded}>Add</button>
            <button onClick={onTodoClear}>Clear</button>
            {
                useMemo(() =>
                    <ul>
                        {todoList.map(x => { return <li key={x.id}>{x.name}</li> })}
                    </ul>
                ,[todoList])
            }
        </>
    );
}

export default Todo;