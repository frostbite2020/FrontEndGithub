import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {getCategoryId, updateCategoryId } from "../Redux/actions/todolistAction";
import {toast} from 'react-toastify'


const EditTodo = ({ dispatchGetTodoIdAction, match, dispatchUpdateTodoAction,history }) => {
  
  const [categoryTitle, setCategoryTitle] = useState("");

  useEffect(()=> {
    const id = match.params.id;
    if(id){
      dispatchGetTodoIdAction(id, ({ categoryTitle}) =>
      {
        setCategoryTitle(categoryTitle);
      });
    }
  }, [dispatchGetTodoIdAction,match.params.id])


  const handleOnSubmit = event => {
    const {id} = match.params;
    event.preventDefault();
    const data = {id, categoryTitle};
    dispatchUpdateTodoAction(id, data, () => {
         toast.success('sudah diupdate');
         history.replace('/todo-category');
    }, (message) => toast.error(`Error : ${message}`));
}

  return (
    <React.Fragment>
    <div className="container mt-5">
         <div className="row">
        <div className="col">
          <h3>Add Todo</h3>
        </div>
      </div>

      <div className="row align-items-center ">
        <div className="col-md-6" >
          <form noValidate onSubmit={handleOnSubmit}>
            <div className="form-group">
              <label htmlFor="categoryTitle">Title</label>
              <input
                noValidate
                id="categoryTitle"
                placeholder="judul"
                type="text"
                name="categoryTitle"
                value={categoryTitle}
                onChange={(e) => setCategoryTitle(e.target.value)}
                className="form-control"
              />
              <div className="mt-5">
                <button type="submit" className="btn btn-primary mr-2 btn-md">
                    save | <i className="fas fa-save"></i>
                </button>
                <button type="button" onClick={() => history.replace("/form")}  className="btn btn-secondary ml-5 btn-md">
                    cancel | <i className="fas fa-times"></i>
                </button>
            </div>
            </div>
          </form>
        </div>
      </div>
    </div>
     
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchUpdateTodoAction: (id, data, onSuccess, onError) => 
    dispatch(updateCategoryId(id, data, onSuccess, onError)),
    
  dispatchGetTodoIdAction: (id, onSuccess) => 
    dispatch(getCategoryId(id, onSuccess))
});

export default connect(null, mapDispatchToProps)(EditTodo);



