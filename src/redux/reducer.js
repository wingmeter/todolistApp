import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useHttp } from '../hooks/http.hook';

const initialState = {
    todos: [],
    todosLoadingStatus: 'idle'
};

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async () => {
        const {request} = useHttp();
        return await request('https://todolist-app-2529c-default-rtdb.europe-west1.firebasedatabase.app/todos.json')
    }
)

const addTodoReducer = createSlice({
    name: 'todos',
    initialState,
    reducers:{
        addTodos: (state, action) => {
            state.push(action.payload);
        },
        removeTodos: (state, action) => {
            state.todos.filter(item => item.id !== action.payload);
        },
        updateTodos: (state, action) => {
            return state.todos.map(todo => {
                if(todo.id === action.payload.id) {
                    return {
                        ...todo,
                        item: action.payload,
                    }
                }
                return todo;
            });
        },
        completeTodos: (state, action) => {
            return state.todos.map(todo => {
                if(todo.id === action.payload) {
                    return {
                        ...todo,
                        completed: true,
                    };
                }
                return todo;
            });           
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, state => {state.todosLoadingStatus = 'loading'})
            .addCase(fetchTodos.fulfilled, (state, action) => {
                                            state.todosLoadingStatus = 'idle';
                                            state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, state => {state.todosLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    } 
})

export const { 
    addTodos,
    removeTodos, 
    updateTodos, 
    completeTodos,
    todosFetching,
    todosFetched,
    todosFetchingError
} = addTodoReducer.actions;

export const reducer = addTodoReducer.reducer;