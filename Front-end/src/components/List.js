import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCategoryId, deleteCategoryById } from "../Redux/actions/todolistAction";
import { toast } from "react-toastify";


const List = ({ todoCategory, dispatchDeleteAction}) => {
  const [selectTodoCategory, setSelectTodoCategory] = useState("");

  const showModal = (event, id) => {
    event.preventDefault();
    setSelectTodoCategory(id);
    window.$("#confirmationModal").modal("show");
  };

  const handleDelete = () => {
    dispatchDeleteAction(
      selectTodoCategory,
      () => {
        window.$("#confirmationModal").modal("hide");
        toast.success("Udah kehapus Nih!");
      },
      (message) => {
        window.$("#confirmationModal").modal("hide");
        toast.error(`Error:${message}`);
      }
    );
  };
  
  return (
    <div>
      <React.Fragment>
        <table className="table table-hover">
          <tbody>
            {todoCategory.map((item) => (
              <tr key={item.id}>
                <td colSpan="2" >
                  {item.categoryTitle}
                </td>
                <td>
                  <div className="button-grup">
                    <Link to={`/todo-category/${item.id}/edit`}>
                      <button className="btn btn-primary">edit</button>
                    </Link>
                  </div>
                </td>
                <td>
                  <a href="/" onClick={(e) => showModal(e, item.id)}>
                    <button className="btn btn-danger">remove</button>
                  </a>
                </td>
                <td>
                  <Link to={`/todo-category/${item.id}/todos`}>
                    <button className="btn btn-warning">detail</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal handleDelete={handleDelete} />
      </React.Fragment>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchDeleteAction: (id, onSucces, onError) => dispatch(deleteCategoryById(id, onSucces, onError)),
  dispatchEditAction : (id, onSucces, onError) => dispatch(getCategoryId(id,onSucces, onError)),
});

export default connect(null, mapDispatchToProps)(List);

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
