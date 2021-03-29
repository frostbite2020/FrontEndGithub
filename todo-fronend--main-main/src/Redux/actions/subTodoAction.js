import * as constans from '../constant'

export const getCategoryById = (categoryId, pageNumber, sorting, filterByPriority, onSuccess, onError) => ({
    type: constans.API,
    payload: {
        method : 'GET',
        url : `/item?CategoryId=${categoryId}&PageNumber=${pageNumber}&PageSize=5`
        + (sorting != 0 ? `&Sorting=${sorting}` : ``)
        + (filterByPriority != 0 ? `&FilterByPriority=${filterByPriority}` : ``),
        postProcessSuccess: onSuccess,
        postProcessError: onError,
        success: (response) => (SetAllSubTodo(response))
    }
}) 

export const createSubTodo = (data, onSuccess, onError) => ({
    type: constans.API,
    payload: {
        method: 'POST',
        url : '/item',
        data, 
        success: (subTodo) => (AddSubTodo(subTodo)),
        postProcessError: onError, 
        postProcessSuccess: onSuccess,
    }
})

export const getDetailSubCategory = (id, onSuccess) => ({
    type: constans.API,
    payload: {
        method: `GET`,
        url : `/item/${id}`,
        postProcessSuccess: onSuccess
    }
})

export const updateSubCategory = (id, data, onSuccess, onError) => ({
    type: constans.API,
    payload: {
        method: 'PUT',
        url:`/item/update-item-details/${id}`,
        data,
        success: (id, data) => (updateDetail(id, data)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
})

export const updateCheckDone = (id, data, onSuccess, onError) => ({
    type: constans.API,
    payload:{
        method: 'PUT',
        url: `/item/${id}`,
        data,
        success: (id, data) => (updateCheck(id, data)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
})

export const getDeleteSubCategory = (id, onSuccess, onError) => ({
    type: constans.API,
    payload: {
        method: 'DELETE',
        url : `/item/${id}`,
        success: () => (deleteSubCategory(id)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
})

const SetAllSubTodo = (data) => ({
    type: constans.FETCH_ALL_SUB_TODO,
    payload: data.todoItems.lists,
})

const AddSubTodo = (subTodo) => ({
    type: constans.CREATE_SUB_TODO,
    payload : subTodo
})

const updateDetail = (id, data) => ({
    type : constans.UPDATE_SUB_TODO,
    payload : {id, data}
})

const updateCheck = (id, data) => ({
    type : constans.UPDATE_CHECK_SUB_TODO,
    payload : {id, data}
})

const deleteSubCategory = (id) => ({
    type: constans.DELETE_SUB_TODO,
    payload: id
})