// import React from 'react'



// const TodoListDataPage = ({subTodoCategory, idSub}) => {

//     const checkDone = (event, id, e) => {
//         event.preventDefault()
//         const pageIndex = subTodoCategory.todoItems.pageIndex
//         const done = !e
//         const dataCheck = {id, done}
//         dispatchUpdateCheckBoxAction( id,  dataCheck, () =>{
//           toast.success('Success updating status');
//           dispatchGetSubTodoIdAction(idSub, pageIndex, filteredPriority);
//         }, (message) => toast.error(`Error : ${message}`));
    
//       }
//     const cek =() =>{
//         console.log(subTodoCategory)
//     }

//     return (
//         <tbody>
//             {subTodoCategory.todoItems.lists.map((datas, index) => (
//                 <tr>
//                 <th scope="row" id="nomorUrut">{index + 1}</th>
//                 <td>
//                     <div className="form-check">
//                     <input 
//                         className="form-check-input" 
//                         type="checkbox"
//                         checked={datas.done}
//                         id="flexCheckDefault"
//                         aria-setsize={30}
//                         size={30}
//                         onChange={(e) => checkDone(e, datas.id, datas.done)}/>
//                     </div>
//                 </td>
//                 <td>{datas.activityTitle}</td>
//                 <td>{datas.priority}</td>
//                 <td>{datas.note}</td>
//                 <td>
//                     {datas.done ? <button
//                     className="btn btn-secondary"
//                     href="/"
//                     onClick={(e) => showModal(e, datas.id)}
//                     >
//                     delete
//                     </button> : <button className="btn btn-secondary" disabled>delete</button>}
//                     <Link to={`/todo-category/${datas.categoryId}/todo/${datas.id}`}  className="ml-2" > 
//                     <button className="btn btn-warning">edit</button>
//                     </Link>
//                 </td>
//                 </tr>
//             ))}
//             <button onClick={cek}>cek</button>
//         </tbody>
//     )
// }

// export default TodoListDataPage