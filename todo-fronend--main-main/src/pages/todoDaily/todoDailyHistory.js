import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchAllTodoDailyHistories } from '../../Redux/actions/todoDailyHistoryAction'

const TodoDailyHistory = ({userData, todoDailyHistory, dispatchFetchAllHistoryAction}) => {
    
    const [pageNumber, setPageNumber] = useState(1)
    const [pageSize, setPageSize] = useState(7)
    const [array, setArray] = useState([])

    useEffect(() => {
        const id = userData.userId
        dispatchFetchAllHistoryAction(id, pageNumber, pageSize, data => {
            setPageNumber(data)
            setPageSize(data)
            setArray(data.todoDailyHistories.pageIndex)
        })
    }, [dispatchFetchAllHistoryAction, userData.userId, pageNumber, pageSize])

    const cek = () =>{
        console.log(array)
    }

    return(
        <div className="container">
            <div className="content">
                <button onClick={cek}>cek</button>
                <div className="row">
                    <h1 className="mt-4">History</h1>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Activity</th>
                            <th>Status</th>
                            <th>Date made</th>
                            <th>Completed date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todoDailyHistory.map((data, index) => (
                                <tr key={data.id}>
                                    <td>{index + 1}</td>
                                    <td>{data.todoDailyActivity}</td>
                                    <td><input className="checkbox-history" type="checkbox" checked={data.checkStatus} readOnly/></td>
                                    <td>{data.madeSince}</td>
                                    <td>{data.checkDate}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    loading : state.loading,
    todoDailyHistory : state.todoDailyHistory,
    userData : state.user
});

const mapDispatchToProps = dispatch => ({
    dispatchFetchAllHistoryAction : (userId, pageNumber, pageSize) => dispatch(fetchAllTodoDailyHistories(userId, pageNumber, pageSize))
});

export default connect(mapStateToProps,mapDispatchToProps)(TodoDailyHistory)