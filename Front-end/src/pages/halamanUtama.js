import React, {useEffect} from "react"
import ShowList from "../components/List"
import { fetchAllTodo } from "../Redux/actions/todolistAction"
import {connect} from 'react-redux'
import {Link } from 'react-router-dom'

const FormPage = ({ todoCategory, dispatchFetchAllTodoAction, userData}) => {
    
    useEffect(() => {
        const id = userData.userId
        dispatchFetchAllTodoAction(id)
    }, [dispatchFetchAllTodoAction]);    

    return(
        <React.Fragment>
            <div className="container mt-5">
                <div className="row my-5">
                    <div className="col-10">
                        <h2> TodoList </h2>
                    </div >
                    <div className="col-2">
                        <Link to={`/todo-category/${userData.userId}/add`} className="btn btn-primary" userData={userData}>
                            Create +
                        </Link>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12">
                    {
                            todoCategory.length > 0 ? <ShowList todoCategory={todoCategory}/> :
                            <div className="text-center mt-5">
                                <h2 className="text-center"> kamu gak punya to Do Thing apa apa </h2>
                            </div>
                    }
                    </div>           
                </div>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = state => ({
    loading : state.loading,
    todoCategory : state.todoCategory,
    userData : state.user
});

const mapDispatchToProps = dispatch => ({
    dispatchFetchAllTodoAction : (userId) => dispatch(fetchAllTodo(userId))
});


export default connect(mapStateToProps,mapDispatchToProps)(FormPage);