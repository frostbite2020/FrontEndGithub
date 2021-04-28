import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import { fetchAllTodoDaily, createTodoDaily, updateCheckDaily, deleteDaily } from "../../Redux/actions/todoDailyAction"
import { fetchAllTodoDailyHistories } from '../../Redux/actions/todoDailyHistoryAction'
import '../../css/styleDaily.scss'
import '../../css/style.css'
import picture from '../../picture/cancel.png'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'

const TodoDailyMain = ({
        userData, 
        todoDaily, 
        todoDailyHistory, 
        dispatchFetchAllTodoDaily, 
        dispatchFetchAllHistoryAction, 
        dispatchCreateTodoDaily,
        dispatchCheckTodoDaily,
        dispatchDeleteTodoDaily,
        history}) => {

    const [todoDailyActivity, setTodoDailyActivity] = useState('')

    useEffect(() =>{
        const id = userData.userId
        dispatchFetchAllTodoDaily(id)
        dispatchFetchAllHistoryAction(id, 1, 3)
    }, [dispatchFetchAllTodoDaily, dispatchFetchAllHistoryAction, userData.userId]); 

    const handleSubmit = (e) => {
        e.preventDefault()
        const userPropertyId = userData.userId
        const data = {userPropertyId, todoDailyActivity}
        console.log(data)
        dispatchCreateTodoDaily(data, () => {
            toast.success('Daily Activities Added');     
            history.replace(`/todo-daily/${userPropertyId}`);
        }, (message) => toast.error(`Error: ${message}`));   
    }

    const checkDone = (event, todoDailyId, e) => {
        event.preventDefault()
        const checkStatus = !e
        const dataCheck = { todoDailyId, checkStatus }
        const userId = userData.userId
        console.log(dataCheck)
        dispatchCheckTodoDaily( todoDailyId,  dataCheck, () =>{
            toast.success('Success updating status');
            dispatchFetchAllTodoDaily(userId)
            dispatchFetchAllHistoryAction(userId, 1, 3)
        }, (message) => toast.error(`Error : ${message}`));
      
    }
    
    const deleteDaily =(e, dailyId) => {
        e.preventDefault()
        const id = dailyId;
        const userId = userData.userId
        console.log(id)
        dispatchDeleteTodoDaily(id, () => {
            toast.success("Udah kehapus Nih!");
            dispatchFetchAllTodoDaily(userId)
            dispatchFetchAllHistoryAction(userId, 1, 3)
        },
        (message) => {
            window.$("#confirmationModal").modal("hide");
            toast.error(`Error:${message}`);
        }
        );
    }
    return (
        <div className="container">
            <div className="bagian-1">
                <h1>Today Activity</h1>
                <div className="bagian-check">
                    {todoDaily.map((data) => (
                        <div className="check-data" key={data.id}>
                            <input 
                                type="checkbox" 
                                id={`${data.id}`} 
                                name="todo" 
                                checked={data.check}
                                onChange={(e) => checkDone(e, data.id, data.check)}/>
                            <label htmlFor={`${data.id}`}  data-content={`${data.todoDailyActivity}`}>{data.todoDailyActivity}</label>
                            {data.check ? 
                            <img src={picture} alt="cancel" onClick={(e) => deleteDaily(e, data.id)}/>
                            : ""}
                    
                        </div>
                    ))}
                </div>
                <div className="add-new-daily">
                    <input className="c-checkbox" type="checkbox" id="checkbox"/>
                    <div className="c-formContainer">
                        <form className="c-form" onSubmit={handleSubmit}>
                            <input 
                                className="c-form__input" 
                                placeholder="What do u want to do today?" 
                                type="text"
                                onChange= {(e) => setTodoDailyActivity(e.target.value)}
                                required/>
                            <label 
                                className="c-form__buttonLabel">
                                <button 
                                    className="c-form__button"
                                    type="submit">
                                        Add
                                </button>
                                </label>
                                <label className="c-form__toggle" htmlFor="checkbox" data-title="Add New"></label>
                        </form>
                    </div>
                </div>
            </div>
            <div className="bagian-2">
                <h3>Daily Recent</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Finished on</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todoDailyHistory.map((data, index) => (
                            <tr key={data.id}>
                                <td>{index + 1}</td>
                                <td>{data.todoDailyActivity}</td>
                                <td>{data.checkDate}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={3}>
                                <Link to={`/todo-daily-history`}>
                                    <button className="btn-show-more">Show More</button>
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="bagian-3">
                <p>Organize activities more detail?</p>
                <Link to={`/todo-category`} >
                    <h6 className="btn-migrate effect04" data-sm-link-text="CLICK" target="_blank"><span>Todo Plus</span></h6>
                </Link>
            </div>
        </div>
        
    )
}

const mapStateToProps = state => ({
    loading : state.loading,
    todoDaily : state.todoDaily,
    todoDailyHistory : state.todoDailyHistory,
    userData : state.user
});

const mapDispatchToProps = dispatch => ({
    dispatchFetchAllTodoDaily : (userId) => dispatch(fetchAllTodoDaily(userId)),
    dispatchFetchAllHistoryAction : (userId, pageNumber, pageSize) => dispatch(fetchAllTodoDailyHistories(userId, pageNumber, pageSize)),
    dispatchCreateTodoDaily : (data, onSuccess, onError) => dispatch(createTodoDaily(data, onSuccess, onError)),
    dispatchCheckTodoDaily : (data, id, onSuccess, onError) => dispatch(updateCheckDaily(data, id, onSuccess, onError)),
    dispatchDeleteTodoDaily : (id, onSuccess, onError) => dispatch(deleteDaily(id, onSuccess, onError))
});


export default connect(mapStateToProps,mapDispatchToProps)(TodoDailyMain);