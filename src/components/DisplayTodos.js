import React, { useState, useEffect, useCallback } from 'react';
import { connect, useDispatch } from 'react-redux';
import { addTodos, removeTodos, updateTodos, completeTodos } from '../redux/reducer';
import { fetchTodos } from '../redux/reducer';
import TodoItem from './TodoItem';
import { useHttp } from '../hooks/http.hook';
import { AnimatePresence, motion } from 'framer-motion';


const mapStateToProps = (state) => {
    return {
        todos: state,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTodo: (obj) => dispatch(addTodos(obj)),
        updateTodo: (obj) => dispatch(updateTodos(obj)),
        completeTodo: (id) => dispatch(completeTodos(id))
    }
}

const DisplayTodos = (props) => {

    const [sort, setSort] = useState("active")

    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchTodos())
        // eslint-disable-next-line
    }, []);

    const removeTodo = useCallback((id) => {
        request(`https://todolist-app-2529c-default-rtdb.europe-west1.firebasedatabase.app/todos.json/${id}`, "DELETE")
            .then(data => console.log(data, 'Deleted'))
            .then(dispatch(removeTodos(id)))
            .catch(err => console.log(err));
        // eslint-disable-next-line  
    }, [request]);
  
 return (
      <div className="displaytodos">
          <div className="buttons">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }} 
                onClick={() => setSort("active")}
              >
                  Active
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }} 
                onClick={() => setSort("completed")}
              >
                  Completed
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}  
                onClick={() => setSort("all")}
              >
                  All
              </motion.button>
          </div>
          <ul>
              <AnimatePresence>
              {props.todos.length > 0 && sort === "active" 
                  ? props.todos.map((item) => {
                      return (
                          item.completed === false && 
                          <TodoItem
                            key={item.id}
                            item={item}
                            removeTodo={removeTodo}
                            updateTodo={props.updateTodo}
                            completeTodo={props.completeTodo}
                          />
                      )
                  })
              : null}
              {props.todos.length > 0 && sort === "completed" 
                  ? props.todos.map((item) => {
                      return (
                          item.completed === true && 
                          <TodoItem
                            key={item.id}
                            item={item}
                            removeTodo={removeTodo}
                            updateTodo={props.updateTodo}
                            completeTodo={props.completeTodo}
                          />
                      )
                  })
              : null}
              {props.todos.length > 0 && sort === "all" 
                  ? props.todos.map((item) => {
                      return (
                          <TodoItem
                            key={item.id}
                            item={item}
                            removeTodo={removeTodo}
                            updateTodo={props.updateTodo}
                            completeTodo={props.completeTodo}
                          />
                      )
                  })
              : null}
              </AnimatePresence>
          </ul>
      </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodos);