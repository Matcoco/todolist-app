const TodoFormViewEdit = ({ todo, handleDeleteTodo, handleToggleTodo, handleEditTodo }) => {

    return (
        <>
            <input className="toggle" aria-label="toggle" type="checkbox" defaultChecked={todo.completed ? 'check' : ""} onClick={() => handleToggleTodo(todo.id)} />
            {/*   <label htmlFor="toggle" onDoubleClick={(event) => { handleEditTodo(event, todo.id) }}>{todo.title}</label> */}
            <input className="editTitle" aria-label="toggle" value={todo.title} type="text" />
            <button className="destroy" onClick={() => { handleDeleteTodo(todo.id) }}>X</button>
            <button className="edit" onClick={() => { handleEditTodo(todo.id) }}>edit</button>
        </>
    );
}

export default TodoFormViewEdit;