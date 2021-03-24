import React, { useEffect, useState } from "react";
import {connect} from 'react-redux';
import { toast } from "react-toastify";
import { Button,  Form, FormGroup, Label, Input} from 'reactstrap';
import { getDetailSubCategory, updateSubCategory } from "../Redux/actions/subTodoAction";


function EditSubTodo(props){
    const{match, history,dispatchGetSubTodoId,dispatchUpdateDetail} = props;
    const [activityTitle, setActivityTitle] = useState('');
    const [note, setNote] = useState ('');
    const [priority, setPriority] = useState('');
    const [id, setId] = useState(0);
    const [categoryId, setCategoryId] = useState(0)

   
    useEffect(() => {
      const noteId = match.params.EditSubTodo;
      if (noteId) {
          dispatchGetSubTodoId(noteId, ({activityTitle, note, priority, categoryId, id}) =>{
              setActivityTitle(activityTitle);
              setNote(note);
              setPriority(priority);
              setCategoryId(categoryId);
              setId(id);
          });
        }
    }, [dispatchGetSubTodoId, match.params.EditSubTodo])

    const handleSubmit = (e) => {
      e.preventDefault();
      const noteId = match.params.EditSubTodo;
      const categoryId = parseInt(props.match.params.id, 10);
      const data = {activityTitle, note, priority, id, noteId, categoryId };
      dispatchUpdateDetail( noteId , data , () => {
         toast.success('Berhasil diupdate nih');
         history.replace(`/todo-category/${categoryId}/todos`)
      }, (message) => toast.error(`Error : ${message}`));
    }

    return (
      <>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="activityTitle">Title</Label>
            <Input
              type="text"
              name="title"
              id="activityTitle"
              placeholder="with a placeholder"
              onChange={(e) => setActivityTitle(e.target.value)}
              value={activityTitle}
            />
          </FormGroup>

          <FormGroup>
            <Label for="note">Note</Label>
            <Input
              type="text"
              name="note"
              id="note"
              placeholder="with a placeholder"
              onChange={(e) => setNote(e.target.value)}
              value={note}
            />
          </FormGroup>
          <FormGroup>
            <Label for="priority">Priority</Label>
            <Input
              type="select"
              name="priority"
              id="priority"
              onChange={(e) => setPriority(parseInt(e.target.value, 10))}
              value={priority}
            >
              <option value="4">High</option>
              <option value ="3">Medium</option>
              <option value="2">Low</option>
              <option value="1">None</option>
            </Input>
          </FormGroup>

          <Button type="submit" color="primary" >
            Save
          </Button>
          <Button color="secondary">
            Cancel
          </Button>
        </Form>
      </>
    );
}

const mapDispatchToProps = (dispatch) => ({
    dispatchUpdateDetail: (id, data, onSuccess, onError) => 
        dispatch(updateSubCategory(id, data, onSuccess, onError)),
    
    dispatchGetSubTodoId: (id, onSuccess) => 
      dispatch(getDetailSubCategory(id, onSuccess))
})

export default connect(null,mapDispatchToProps)(EditSubTodo) ;