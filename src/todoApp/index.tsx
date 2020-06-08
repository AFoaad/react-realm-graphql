import React from 'react';
import {updateTodoList, deleteTodoList, queryAllTodoLists} from '../databases/allSchemas';
const TodoApp = () => {

    const [state, setState] = React.useState({
        list: []
    })



    React.useEffect(
        ()=> {
            queryAllTodoLists().then(
                (res)=> {
                 setState({...state, list: res})
                }
            ).catch(err => console.log(err))
        },
        []
    )
    return (
        <>
            {state.list && state.list.length && state.list.map(
                (item)=> console.log(item)
            )}
        </>
    )
}

export default TodoApp