import styled from 'styled-components';

const TodoFormView = ({ todo, handleDeleteTodo, handleToggleTodo, handleEditTodo }) => {

    const Span = styled.span `
    color: ${todo.completed && '#949494'};
	text-decoration: ${todo.completed && 'line-through'}
    `

    return (
        <>
            <input className="toogle" aria-label="toggle" type="checkbox" defaultChecked={todo.completed ? 'check' : ""} onClick={() => handleToggleTodo(todo.id)} />
            <label htmlFor="toggle" onDoubleClick={(event) => { handleEditTodo(event, todo.id) }}><Span>{todo.title}</Span></label>
            <button className="destroy" onClick={() => { handleDeleteTodo(todo.id) }}>X</button>
        </>
    );
}

export default TodoFormView;
