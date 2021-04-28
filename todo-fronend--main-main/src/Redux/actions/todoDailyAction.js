import * as constant from '../constant'

export const fetchAllTodoDaily = (userId) => ({
    type: constant.API,
    payload: {
        methode: 'GET',
        url : `/todo-daily/${userId}`,
        success : (response) => (setAllTodoDaily(response))
    }
})


export const createTodoDaily = (data, onSuccess, onError) => ({
    type: constant.API,
    payload: {
        method: 'POST',
        url : '/todo-daily',
        data, 
        success: (todoDaily) => (AddTodoDaily(todoDaily)),
        postProcessSuccess: onSuccess,
        postProcessError: onError, 
    }
})

export const updateCheckDaily = (id, data, onSuccess, onError) => ({
    type: constant.API,
    payload:{
        method: 'PUT',
        url: `/todo-daily/check/${id}`,
        data,
        success: (id, data) => (updateCheck(id, data)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
})

export const deleteDaily = (id, onSuccess, onError) => ({
    type: constant.API,
    payload: {
        method: 'DELETE',
        url: `/todo-daily/${id}`,
        success: () => (deleteTodoDaily(id)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
})

const setAllTodoDaily = (data) => ({
    type: constant.FETCH_ALL_DAILY_TODO,
    payload: data
})

const AddTodoDaily = (todoDaily) => ({
    type: constant.CREATE_DAILY_TODO,
    payload: todoDaily
})

const updateCheck = (id, data) => ({
    type:constant.CHECK_DAILY_TODO,
    payload : {id, data}
})

const deleteTodoDaily = (id) => ({
    type: constant.DELETE_DAILY_TODO,
    payload: id
})