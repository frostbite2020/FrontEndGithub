import React from 'react'
import { connect } from 'react-redux'

const DailyPagination = () => {
    return(
        <div>

        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({

    dispatchFetchAllHistoryAction : (userId, pageNumber, pageSize) => dispatch(fetchAllTodoDailyHistories(userId, pageNumber, pageSize))
  
});

export default connect(null,mapDispatchToProps)(DailyPagination)