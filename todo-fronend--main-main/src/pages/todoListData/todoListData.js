import React, {useState} from 'react'
import {getCategoryById, getDeleteSubCategory, updateCheckDone} from "../../Redux/actions/subTodoAction";
import {toast} from 'react-toastify'
import { connect } from "react-redux";
import {Link} from 'react-router-dom'


const TodoListDataPage = ({
        subTodoCategory, 
        idCategory, 
        dispatchUpdateCheckBoxAction, 
        dispatchDeleteTodoSubAction, 
        dispatchGetSubTodoIdAction,
        pageIndex,
        filteredPriority,
        sortBy,
        search
    }) => {

    //checkbox
    const checkDone = (event, id, e) => {
        event.preventDefault()
        const done = !e
        const dataCheck = {id, done}
        console.log(dataCheck)
        dispatchUpdateCheckBoxAction( id,  dataCheck, () =>{
          toast.success('Success updating status');
          dispatchGetSubTodoIdAction(idCategory, search, pageIndex, sortBy, filteredPriority);
        }, (message) => toast.error(`Error : ${message}`));
    
      }

      //delete
      const [SubTodoIdSelected, setSubTodoIdSelected] = useState()
      const showModal = (event, id) => {
        event.preventDefault();
        setSubTodoIdSelected(id);
        window.$("#confirmationModal").modal("show");
        }

      const handleDelete = () => {
        const id = idCategory;
        dispatchDeleteTodoSubAction(
          SubTodoIdSelected,
          () => {
            window.$("#confirmationModal").modal("hide");
            toast.success("Udah kehapus Nih!");
            dispatchGetSubTodoIdAction(id, search, pageIndex, sortBy, filteredPriority)
          },
          (message) => {
            window.$("#confirmationModal").modal("hide");
            toast.error(`Error:${message}`);
          }
        );
      };

    return (
        <tbody>
            {subTodoCategory.map((datas, index) => (
                <tr>
                <th scope="row" id="nomorUrut">{index + 1}</th>
                <td>
                    <div className="form-check">
                    <input 
                        className="form-check-input" 
                        type="checkbox"
                        checked={datas.done}
                        id="flexCheckDefault"
                        size={30}
                        onChange={(e) => checkDone(e, datas.id, datas.done)}/>
                    </div>
                </td>
                <td>{datas.activityTitle}</td>
                <td>{datas.priority}</td>
                <td>{datas.note}</td>
                <td>
                    {datas.done ? <button
                        className="btn btn-secondary"
                        href="/"
                        onClick={(e) => showModal(e, datas.id)}
                    >
                    delete
                    </button> : <button className="btn btn-secondary" disabled>delete</button>}
                    <Link to={`/todo-category/${datas.categoryId}/todo/${datas.id}`}  className="ml-2" > 
                    <button className="btn btn-warning">edit</button>
                    </Link>
                </td>
                </tr>
            ))}
            <Modal handleDelete={handleDelete} />
        </tbody>
    )
}
const mapDispatchToProps = (dispatch) => ({
    dispatchUpdateCheckBoxAction: (id, data, onSuccess, onError) =>
    dispatch(updateCheckDone(id, data, onSuccess, onError)),
  
    dispatchDeleteTodoSubAction: (id, onSuccess, onError) =>
    dispatch(getDeleteSubCategory (id, onSuccess, onError)),

    dispatchGetSubTodoIdAction: (id, onSuccess, onError) => 
    dispatch(getCategoryById(id, onSuccess, onError)),

  });

export default connect(null, mapDispatchToProps)(TodoListDataPage);


const Modal = ({ handleDelete }) => (
    <div className="modal" id="confirmationModal">
      <div role="document" className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title"> confirmation </h5>
          </div>
          <div className="modal-body">
            <p>yakin mau hapus ?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              data-dismiss="modal"
              className="btn btn-secondary"
            >
              Enggak
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleDelete}
              data-dismiss="modal"
            >
              Iya dong
            </button>
          </div>
        </div>
      </div>
    </div>
  );