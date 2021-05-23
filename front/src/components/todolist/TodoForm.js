import { Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const TodoForm = ({ handleAddTodo }) => {
    const [string, setValue] = useState("");

    useEffect(() => {
        let isMounted = true;
        if(isMounted){
            setValue("");
        }
        return () => isMounted = false;
    },[handleAddTodo, setValue])

    return (
        <Form.Group>
            <Form.Control size="lg" type="text" placeholder="Large text" value={string} onChange={(event) => setValue(event.target.value)} />
            <Button variant="primary" onClick={() => handleAddTodo(string)}>Add</Button>
        </Form.Group>
    );
}

export default TodoForm;
