
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { isLoggin_in } from '../../utils/isLoggin_in';
import TodoForm from "./TodoForm";
import TodoLi from "./TodoLi";
import { getDate } from '../../utils/getDate';
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar';
import TodoFormViewEdit from './TodoFormViewEdit';

//const REACT_APP_TODOS = process.env.REACT_APP_TODOS;
//const REACT_APP_BASEURL = process.env.REACT_APP_BASEURL;

const TodoList = () => {

    let history = useHistory();
    const [todos, setTodos] = useState([]);
    const [infoUser, setInfoUser] = useState({});
    const [toggle, setToggle] = useState(false);
    const [pourcent, setPourcent] = useState(0);
    const [toggleEdit, setToggleEdit] = useState(true);

    /**
     * (1) permet de récupérer les informations de l'utilisateur actuel depuis la BDD
     */
    useEffect(() => {
        let unmount = true;
        if (!!window.localStorage['data']) {
            axios.get(`http://localhost:5000/api/users/${JSON.parse(window.localStorage['data']).email}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Access-Control-Allow-Origin': true,
                    'Authorization': `Bearer ${JSON.parse(window.localStorage['data']).token}`
                },
            })
                .then(response => {
                    let user = {
                        id_user: response.data[0].id,
                        username: response.data[0].username,
                        email: response.data[0].email,
                        date_inscription: response.data[0].date_inscription,
                    }
                    if (unmount) {
                        setInfoUser(user);
                    }
                })
                .catch(err => console.log('err', err));


            return () => {
                unmount = false;
            }
        }

    }, [setInfoUser])

    /**
     * (2) permet de revenir sur /signin si on est pas authentifié

     */
    useEffect(() => {

        if (isLoggin_in()) {
            history.push('/signin');
        }

    }, [history]);

    /**
     *(3) permet de récupérer les todos depuis la BDD
     */
    useEffect(() => {
        let isShow = true;
        if (!!window.localStorage['data']) {
            axios.get(`http://localhost:5000/api/todos/${JSON.parse(window.localStorage['data']).email}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Access-Control-Allow-Origin': true,
                    'Authorization': `Bearer ${JSON.parse(window.localStorage['data']).token}`
                }
            })
                .then(response => {
                    if (isShow) {
                        setTodos(response.data);
                    }

                })
                .catch(err => console.log(err))

            return () => isShow = false;
        }
    }, [setTodos]);

    useEffect(() => {
        const calculProgressBar = () => {
            const resultat = todos.filter(todo => todo.completed);
            setPourcent((resultat.length / todos.length) * 100);
        }
        calculProgressBar();
    })

    /**
     * permet d'ajouter un todo dans le state puis dans la BDD
     * @param {Object} todo 
     */
    const handleAddTodo = (todo) => {

        const data = {
            title: todo,
            completed: 0,
            date_debut: getDate(),
            date_fin: '',
            id_user: infoUser.id_user,
            ref_todo: new Date().getTime()
        };



        axios.post('http://localhost:5000/api/todos', data, {
            method: 'POST',
            mode: 'cors',
            headers: {

                'Access-Control-Allow-Origin': true,
                'Authorization': `Bearer ${JSON.parse(window.localStorage['data']).token}`
            }
        })
            .then(response => {
                data.id = response.data.id;
                setTodos([...todos, data]);
            })
            .catch(err => { console.log(err) })
    }

    /**
   * permet de supprimer un todo depuis le state puis dans la BDD
   * @param {Object} todo 
   */
    const handleDeleteTodo = (id) => {

        setTodos(todos.filter(todo => todo.id !== id));

        axios.delete(`http://localhost:5000/api/todos/${id} `, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': true,
                'Authorization': `Bearer ${JSON.parse(window.localStorage['data']).token}`
            }
        })
            .then(response => { })
            .catch(err => { console.log(err) })
    }

    /**
    * permet de toggle un todo depuis le state puis dans la BDD
    * @param {Object} todo 
    */
    const handleToggleTodo = (id) => {
        let array = todos;
        let currentTodoCompleted = null;
        array.forEach(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
                currentTodoCompleted = todo.completed;
            }
        });

        setTodos([array][0]);
        setToggle(!toggle);

        axios.put(`http://localhost:5000/api/todos/${id} `, { currentTodoCompleted }, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': true,
                'Authorization': `Bearer ${JSON.parse(window.localStorage['data']).token}`
            }
        })
            .then(response => console.log(response))
            .catch(err => { console.log(err) })


    }

    const handleEditTodo = (event, id) => {
        const element = document.getElementById(`${id}`);
        const currentClass = element.firstElementChild.className;
        console.log(currentClass);
        element.firstElementChild.className = `${currentClass} editing`;
    }


    return (
        <div>
            TOODLIST PAGE {infoUser.username}
            <ProgressBar animated now={pourcent} />
            <TodoForm handleAddTodo={handleAddTodo} />
            <TodoLi todos={todos} handleDeleteTodo={handleDeleteTodo} handleToggleTodo={handleToggleTodo} handleEditTodo={handleEditTodo} toggleEdit={toggleEdit}/>
        </div>
    );
}

export default TodoList;