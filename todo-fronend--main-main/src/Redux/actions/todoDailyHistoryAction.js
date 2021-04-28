import * as constants from '../constant'

export const fetchAllTodoDailyHistories = (userId , pageNumber, pageSize, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        methode: 'GET',
        url: `/todo-daily/history?UserPropertyId=${userId}`
            + (pageNumber !== 0 ? `&PageNumber=${pageNumber}` : ``)
            + (pageSize !== 0  ? `&PageSize=${pageSize}`: ``),
        postProcessSuccess: onSuccess,
        postProcessError: onError,
        success: (response) => (setAllTodoDailyHistories(response))
    }
})

const setAllTodoDailyHistories = (data) => ({
    type: constants.FETCH_ALL_DAILY_TODO_HISTORY,
    payload: data.todoDailyHistories.lists
})