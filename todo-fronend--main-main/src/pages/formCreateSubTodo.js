import React, {useState} from "react";
import { Button, Form, FormGroup, Label, Input,} from 'reactstrap';
import {toast} from 'react-toastify';
import {connect} from 'react-redux';
import { createSubTodo} from '../Redux/actions/subTodoAction';

function FormCreateSubTodo(props){
    const {dispatchCreateTodoSubAction,history} = props;
    const [activityTitle,setActivityTitle] = useState("")
    const [priority, setPriority] = useState(4)
    const [note, setNote] = useState("")
    const idCategory = parseInt(props.match.params.id, 10);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('data');
        const categoryId = parseInt(props.match.params.id, 10);
        const data = {activityTitle, priority, note, categoryId};
        console.log(data)
        dispatchCreateTodoSubAction(data, () => {
            toast.success('judul listmu sudah dibuat');
            history.replace(`/todo-category/${categoryId}/todos`);     
        }, (message) => toast.error(`Error: ${message}`));        
    }

    return (
        <div className="container mt-5">
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="activityTitle">Title</Label>
                    <Input
                        type="text"
                        name="title"
                        id="activityTitle"
                        placeholder="with a placeholder"
                        onChange={(e) => setActivityTitle(e.target.value)}
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

                    />
                </FormGroup>
                <FormGroup>
                    <Label for="priority">Priority</Label>
                        <Input type="select" name="priority" id="priority" onChange={(e) => setPriority(parseInt(e.target.value, 10))} >
                        <option value="4">High</option>
                        <option value ="3">Medium</option>
                        <option value="2">Low</option>
                        <option value="1">None</option>
                    </Input>
                </FormGroup>
          
                <Button type="submit" color="primary" >
                    Save
                </Button>
                <Button className="ml-2" color="secondary" onClick={() => history.replace(`/todo-category/${idCategory}/todos`)}>
                    Cancel
                </Button>
            </Form>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
  
    dispatchCreateTodoSubAction: (data, onSuccess, onError) =>
      dispatch(createSubTodo(data, onSuccess, onError)),   
  });
  

export default  connect(null, mapDispatchToProps)(FormCreateSubTodo);



