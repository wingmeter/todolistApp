import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHttp } from '../hooks/http.hook';
import { addTodos } from '../redux/reducer';
import { GoPlus } from 'react-icons/go';
import { motion } from 'framer-motion';
import { v4 as uuidv4} from 'uuid';


// const mapStateToProps = (state) => {
//     return {
//         todos: state,
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         addTodo: (obj) => dispatch(addTodos(obj)),
//     }
// }


const Todos = () => {

    const [todo, setTodo] = useState("");

    const {request} = useHttp();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTodo = {
            id: uuidv4(),
            item: todo,
            completed: false
        }

        request('https://todolist-app-2529c-default-rtdb.europe-west1.firebasedatabase.app/todos.json', 'POST', JSON.stringify(newTodo))
        .then(data => console.log(data, 'Submitted'))
        .then(dispatch(addTodos(newTodo)))
        .catch(err => console.log(err));

        setTodo(" ")
    }

    // const handleChange = (e) => {      
    //     setTodo(e.target.value);
    // }

    // const add = () => {
    //     if (todo === ""){
    //         alert("Input is Empty");
    //     } else {
    //         props.addTodo({
    //             id: Math.floor(Math.random() * 1000),
    //             item: todo,
    //             completed: false,
    //            })
    //         setTodo(" ");
    //     }
    // }

    // console.log("Hello world", props);
  return <div className='addTodos'>
      <form className='d-flex'
      onSubmit={handleSubmit}>
            <input 
                type="text"
                onChange={(e) => setTodo(e.target.value)}
                className="todo-input"
                value={todo}
            />
            <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }} 
            className='add-btn'
            type="submit" 
            >
              <GoPlus/>
            </motion.button>
      </form>
            <br />
        </div>
}

export default Todos;