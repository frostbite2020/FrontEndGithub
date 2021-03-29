import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {getCategoryId} from "../Redux/actions/todolistAction";
import {getCategoryById, createSubTodo} from "../Redux/actions/subTodoAction";
import {Link} from 'react-router-dom'
import '../css/style.css'
import TodoListDataPage from "./todoListData/todoListData";
import '../css/style.css'

const Sublist = ( {dispatchGetTodoIdAction, dispatchGetSubTodoIdAction,
  match, history, subTodoCategory}) => {
  const [idCategory, setIdCategory] = useState('')
  const [title, setTitle] = useState('')
  const [filteredPriority, setFilteredPriority] = useState(0)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState(0)
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
      dispatchGetSubTodoIdAction(idSub, search, pageIndex, sortBy, filteredPriority,  data => {
        setPageIndex(data.todoItems.pageIndex)
        setTotalPages(data.todoItems.totalPages)
      });      
    }
    
  }, [dispatchGetTodoIdAction, dispatchGetSubTodoIdAction, match.params.todoCategoryID, search, pageIndex, sortBy, filteredPriority ])
  
  const cek =() =>{
    console.log("ini angka" + title)
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
    if((pageIndex - 5)% pageNumberLimit == 1 
        || (pageIndex - 5)% pageNumberLimit == 2
        || (pageIndex - 5)% pageNumberLimit == 3
        || (pageIndex - 5)% pageNumberLimit == 4
        || (pageIndex - 5)% pageNumberLimit == 0){
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
    }
    if(pageIndex == totalPages){
      let i = totalPages
      setPageIndex(i - 1)
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
      <div className="container mt-5">
        <div className="row">
          <div className="col-3">
            <h2 style={{fontWeight:'bold'}}>{title}</h2>
            <button onClick={cek}>cek</button>
            <div className="search-input input-group">
              <input 
                  className="form-control"
                  type="text"
                  placeholder="Search By Title"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}/>
                <span className="input-group-btn">
                  <button className="btn-primary">
                    search
                  </button>
                </span>
            </div>
            <select value={sortBy} defaultValue="0" onChange={(e) => setSortBy(e.target.value)}>
              <option value="0">-----</option>
              <option value="1">By Name</option>
              <option value="2">By Descent Name</option>
              <option value="3">By Priority</option>
            </select>
            <select value={filteredPriority} defaultValue="0" onChange={(e) => setFilteredPriority(e.target.value)}>
              <option value="0">-----</option>
              <option value="4">High Priority</option>
              <option value="3">Medium Priority</option>
              <option value="2">Low Priority</option>
              <option value="1">None</option>
            </select>
            <Link to={`/todo-category/subTodo/${idCategory}/add`}> 
              <button className="btn btn-primary mt-1"> Add </button>
            </Link>
          </div>
          <div className="col-9">
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
                <TodoListDataPage 
                  pageIndex={pageIndex} 
                  idCategory={idCategory} 
                  subTodoCategory={subTodoCategory}
                  filteredPriority={filteredPriority}
                  sortBy={sortBy}
                  search={search}/>
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

  dispatchGetSubTodoIdAction: (id, search, pageIndex, sortBy, filterByPriority, onSuccess, onError) => 
    dispatch(getCategoryById(id, search, pageIndex, sortBy, filterByPriority, onSuccess, onError)),

  dispatchCreateTodoSubAction: (data, onSuccess, onError) =>
    dispatch(createSubTodo(data, onSuccess, onError)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sublist);
