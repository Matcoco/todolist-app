
import TodoFormView from "./TodoFormView"
import styled from 'styled-components';

const TodoLi = ({ todos, handleDeleteTodo, handleToggleTodo, handleEditTodo, toggleEdit }) => {

    const DivEdit = styled.div`
    display: ${!toggleEdit ? 'block' : "none"}
    `
    const View = styled.div`
    display: ${toggleEdit ? 'block' : 'none'}
    `
    return (
        <ul>
            {
                todos.map((todo, index) => 
                    (
                        <li key={index} id={todo.id}>
                        <View>
                            <TodoFormView todos={todos} handleDeleteTodo={handleDeleteTodo} handleToggleTodo={handleToggleTodo} handleEditTodo={handleEditTodo} todo={todo} />
                        </View>
                        <DivEdit>
                            <input className="editTitle" aria-label="toggle" type="text" />
                            <button className="edit">edit</button>
                        </DivEdit>
                    </li>
                    )
                )
            }
        </ul>
    );
}

export default TodoLi;