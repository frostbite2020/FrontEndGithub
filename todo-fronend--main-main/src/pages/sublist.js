import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {getCategoryId} from "../Redux/actions/todolistAction";
import {getCategoryById, createSubTodo, getDeleteSubCategory, updateCheckDone} from "../Redux/actions/subTodoAction";
import { toast } from "react-toastify";
import {Link} from 'react-router-dom'
import '../css/style.css'


const Sublist = ({dispatchGetTodoIdAction, dispatchGetSubTodoIdAction,
 dispatchDeleteTodoSubAction, dispatchUpdateCheckBoxAction, match, history, subTodoCategory}) => {
  const [idCategory, setIdCategory] = useState('')
  const [title, setTitle] = useState("")
  const [data, setData] = useState([])
  const [selectSubTodo, setSelectSubTodo] = useState("")
  const [filteredPriority, setFilteredPriority] = useState(3)
  const [priority, setPriority] = useState([])
  //pagination
  const [pageIndex, setPageIndex] = useState(1)
  const [totalPages, setTotalPages] = useState()
  //Check
  
  useEffect(()=> {
    const idSub = match.params.todoCategoryID;
    if(idSub){
      dispatchGetTodoIdAction(idSub, ({categoryTitle, id})  =>
      {
        setTitle(categoryTitle);
        setIdCategory(id);
      });
      dispatchGetSubTodoIdAction(idSub, pageIndex, data => {
        setData(data.todoItems.lists)
        setPriority(data.priorityLevels)
        setPageIndex(data.todoItems.pageIndex)
        setTotalPages(data.todoItems.totalPages)
      });
    }
  }, [dispatchGetTodoIdAction, dispatchGetSubTodoIdAction, match.params.todoCategoryID, pageIndex])

  const showModal = (event, id) => {
    event.preventDefault();
    setSelectSubTodo(id);
    window.$("#confirmationModal").modal("show");
  }
  const checkDone = (event, id, e) => {
    event.preventDefault()
    const idSub = match.params.todoCategoryID;
    const done = !e
    const dataCheck = {id, done}
    dispatchUpdateCheckBoxAction( id,  dataCheck, () =>{
      toast.success('Success updating status');
      dispatchGetSubTodoIdAction(idSub, pageIndex, data => {
        setData(data.todoItems.lists)
        setPageIndex(data.todoItems.pageIndex)
        setPriority(data.priorityLevels)
      });
    }, (message) => toast.error(`Error : ${message}`));

  }

  const handleDelete = () => {
    const id = match.params.todoCategoryID;
    dispatchDeleteTodoSubAction(
      selectSubTodo,
      () => {
        window.$("#confirmationModal").modal("hide");
        toast.success("Udah kehapus Nih!");
        dispatchGetSubTodoIdAction(id, pageIndex, data => {
          setData(data.todoItems.lists)
        })
      },
      (message) => {
        window.$("#confirmationModal").modal("hide");
        toast.error(`Error:${message}`);
      }
    );
  };
  const cek =()=>{
    console.log(subTodoCategory.todoItems.lists)
  }
  //pagination
  const halaman = []
  for (let i = 1; i < (totalPages + 1); i++) {
    halaman.push(i)
  }

  const handleOnClick = (event) => {
    setPageIndex(Number(event.target.id))
    history.replace(`/todo-category/${idCategory}/todos`)
  }
  //value of pages
  const [pageNumberLimit, setPageNumberLimit] = useState(5)
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)

  //next and prev page
  const handleNextPage = () => {
    setPageIndex(pageIndex + 1)
    if(pageIndex + 1> maxPageNumberLimit){
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
    }
  }
  const handlePrevPage = () => {
    setPageIndex(pageIndex - 1)
    if((pageIndex - 1)% pageNumberLimit == 0){
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
    }
  }
  const nextIncrementPage = () => {
    setPageIndex(pageIndex + 5)
    if(pageIndex + 5> totalPages){
      setPageIndex(totalPages)
    }
    if(pageIndex + 5 > maxPageNumberLimit){
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
    }
  }
  const prevDecrementPage = () => {
    setPageIndex(pageIndex - 5)
    if(pageIndex == totalPages){
      let i = totalPages
      setPageIndex(i - 1)
    }
    if((pageIndex - 5)% pageNumberLimit == 1 
        || (pageIndex - 5)% pageNumberLimit == 2
        || (pageIndex - 5)% pageNumberLimit == 3
        || (pageIndex - 5)% pageNumberLimit == 4
        || (pageIndex - 5)% pageNumberLimit == 0){
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
    }
  }
  let pageIncrementBtn = null;
  if(halaman.length > maxPageNumberLimit){
    pageIncrementBtn = <li onClick={nextIncrementPage}>&hellip;</li>
  }
  let pageDecrementBtn = null;
  if(minPageNumberLimit >= 1){
    pageDecrementBtn = <li onClick={prevDecrementPage}>&hellip;</li>
  }
  //page number
  const renderPageNumbers = halaman.map((number) => {
    if(number < (maxPageNumberLimit + 1) && number > minPageNumberLimit){
      return(
        <li className={pageIndex == number ? "active" : null}
            key={number} 
            id={number} 
            onClick={handleOnClick}>
          {number}
        </li>
      )
    }
    else{
      return null
    }
  })

  //main
  return (
    <React.Fragment>
      <div className="container-sm">
        <div className="row">
          <div className="col-2">
            <h2 style={{fontWeight:'bold'}}>{title}</h2>
            {/* <button onClick={cek}>cek</button> */}
            <Link to={`/todo-category/${idCategory}/add`}> 
              <button className="btn btn-primary mt-1"> Add </button>
            </Link>
          </div>
          <div className="col-10">
              <table className="table border">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Status</th>
                    <th scope="col">Todo Title</th>
                    <th scope="col">Priority</th>
                    <th scope="col">Note</th>
                    <th>Action Button</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((datas, index) => (
                    <tr>
                      <th scope="row" id="nomorUrut">{index + 1}</th>
                      <td>
                        <div className="form-check">
                          <input 
                            className="form-check-input" 
                            type="checkbox"
                            checked={datas.done}
                            id="flexCheckDefault"
                            aria-setsize={30}
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
                </tbody>
              </table>
              <div className="row">
                <div className="col">
                  <ul className="pageNumbers">
                    <li>
                      <button onClick={handlePrevPage} disabled={pageIndex<=1}>Prev</button>
                    </li>
                    {pageDecrementBtn}
                    {renderPageNumbers}
                    {pageIncrementBtn}
                    <li>
                      <button onClick={handleNextPage} disabled={pageIndex>=halaman.length}>Next</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
        <Modal handleDelete={handleDelete} />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  loading : state.loading,
  todoCategory : state.todoCategory,
  subTodoCategory : state.subTodoList,
});

const mapDispatchToProps = (dispatch) => ({
    
  dispatchGetTodoIdAction: (id, onSuccess) => 
    dispatch(getCategoryId(id, onSuccess)),

  dispatchGetSubTodoIdAction: (id, onSuccess, onError) => 
    dispatch(getCategoryById(id, onSuccess, onError)),

  dispatchCreateTodoSubAction: (data, onSuccess, onError) =>
    dispatch(createSubTodo(data, onSuccess, onError)),
    
  dispatchUpdateCheckBoxAction: (id, data, onSuccess, onError) =>
    dispatch(updateCheckDone(id, data, onSuccess, onError)),
  
  dispatchDeleteTodoSubAction: (id, onSuccess, onError) =>
    dispatch(getDeleteSubCategory (id, onSuccess, onError)),
  
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Sublist);

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