
const TodoLi = ({ todos, handleDeleteTodo, handleToggleTodo }) => {

    return (
        <ul>
            {
                todos.map((todo, index) => (
                    <li key={index} id={todo.id}>
                        <div className="view">
                            <input className="toggle" aria-label="toggle" type="checkbox" defaultChecked={todo.completed ? 'check' : ""} onClick={() => handleToggleTodo(todo.id)} />
                            <label htmlFor="toggle">{todo.title}</label>
                            <button className="destroy" onClick={() => { handleDeleteTodo(todo.id) }}>X</button>
                        </div>
                    </li>
                ))
            }
        </ul>
    );
}

export default TodoLi;