import React, { useState, useEffect } from 'react'
import './style.css';

// Getting data from local storage
const getLocalData = () => {
    const lists = localStorage.getItem('mytodolist');
    if (lists) {
        return JSON.parse(lists);
    } else {
        return [];
    }
}

const Todo = () => {
    const [task, setTask] = useState("");
    const [duration, setDuration] = useState("");
    const [items, setItems] = useState(getLocalData());

    // Adding item on submit button
    const addItem = () => {
        if (!task) {
            alert('Please Add Task');
        } else if (!duration) {
            alert('Please Add Duration');
        }
        else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                task: task,
                duration: duration,
                toggle: false
            };
            setItems([...items, myNewInputData]);
            setTask('');
        }
    };

    //complete the task
    const completeItem = (index) => {
        setItems(
            items.map((ele) => {
                if (ele.id === index) {
                    ele.toggle = !ele.toggle;

                }
                return ele;
            })
        )
    };

    //Deleting task
    const deleteItem = (index) => {
        const updatedItems = items.filter((ele) => {
            return ele.id !== index;
        });
        setItems(updatedItems)
    };


    //Maintaing the state on refreshing the page
    useEffect(() => {
        localStorage.setItem('mytodolist', JSON.stringify(items))
    }, [items])

    return (
        <>
            <div className="container">
                <div className="todo-form">
                    <h3 className='heading'>Add Task</h3>
                    <div className="form-container">
                        <form>
                            <div className="input-group">
                                <input type='text'
                                    placeholder='Add Task'
                                    className='form-control'
                                    value={task}
                                    onChange={(event) => setTask(event.target.value)} />
                            </div>

                            <div className="input-group">
                                <input type='number'
                                    placeholder='Add Hours'
                                    className='form-control'
                                    value={duration}
                                    min={0}
                                    max={24}
                                    onChange={(event) => setDuration(event.target.value)} />
                            </div>

                            <div className="input-group">
                                <button className="form-control submitBtn" onClick={addItem}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='showItems'>
                    {
                        items.length > 0 ? <h3 className='heading'>Task to do</h3> :
                            <h3>No task to do</h3>
                    }
                    {
                        items.map((ele, index) => {
                            return (
                                <div className='eachItem' key={index}>
                                    <h2 style={{
                                        textDecoration: ele.toggle ? 'line-through' : ''
                                    }}>{ele.task}</h2>
                                    <h2 style={{
                                        textDecoration: ele.toggle ? 'line-through' : ''
                                    }}>{ele.duration} hr</h2>
                                    <div className='todo-btn'>
                                        {ele.toggle ?
                                            <i className='fas fa-times-circle add-btn' onClick={() => completeItem(ele.id)}></i> :
                                            <i className='fas fa-check-circle add-btn' onClick={() => completeItem(ele.id)}></i>}
                                        <i className='far fa-trash-alt add-btn' onClick={() => {
                                            deleteItem(ele.id)
                                        }}></i>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Todo