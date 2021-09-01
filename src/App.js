import './App.css';
import React, { useState } from 'react';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import _ from "lodash";
import {v4} from "uuid";
import addbutton from './add-button.png';
import raspberrysans from './raspberryicon.png';
const item1 = {
  id: v4(),
  name: "Submit Portfolio by midnight today"
}
const item2 = {
  id: v4(),
  name: "Send email to Professor Kim"
}
const item3 = {
  id: v4(),
  name: "Clean the room 80%"
}
const item4 = {
  id: v4(),
  name: "Edit the food vlog (urgent)"
}
function App() {
  const [text, setText] = useState("");
  const [state, setState] = useState({
    "todo": {
      title: "To-Do",
      items: [item1,item2],
      css: { 
        "border-color": '#f4b6ff'
      }
    },
    "inprogress":{
      title: "In-Progress",
      items: [item4],
      css: { 
        "border-color": '#ffb6c1'
      }
    },
    "done": {
      title: "Done",
      items: [item3],
      css: { 
        "border-color": '#c1ffb6'
      }
    },
    "delete": {
      title: "Delete",
      items: [],
      css: {
        "border-color": '#b6fff4'
      }
    }
  }
  );

  const handleDragEnd = ({destination, source}) => {
    if(!destination)  return;

    if(destination.droppableId === source.droppableId && destination.index === source) return;
    {/*dropped in same place */}
    const itemcopy = {...state[source.droppableId].items[source.index]}
    console.log(itemcopy);
    if(destination.droppableId === "delete" && source.droppableId !== "delete"){
      {/*deleteing an item */}
      setState(prev =>{
        prev = {...prev}
        prev[source.droppableId].items.splice(source.index,1);
        return prev;
      })
    }
    else{
      {/*adding an item*/}
    setState(prev =>{
      prev = {...prev}
      prev[source.droppableId].items.splice(source.index,1);
      {/*splice used to delete but also add */}
      prev[destination.droppableId].items.splice(destination.index,0, itemcopy);
      return prev;
    })

    }
  }
  const addItem = () => {
      if(!text)
      return;
      setState(prev =>{
        return {...prev,
          todo: {
            title: "To-Do",
            items: [{id:v4(), name: text}, ...prev.todo.items]
          }
        }
      })
      setText("");
  }

  return (
    <div className="App">
      <br/>
      <div className="username"> Made by @raspberrysans: Sans Bhatia </div>
      <div class="header"> 
      <img height="50px" width="50px" src={raspberrysans}/>
      Kanban Board </div>
      <div className="add_todo"> 
      <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
      <button className="addbutton"> 
        <img alt = "" src = {addbutton} height="30px" width="30px" onClick={addItem}/>
      </button>
      </div>
      <div className="drop"> 
      <DragDropContext onDragEnd= {handleDragEnd}>
        {_.map(state, (data, key) => {
          return(
            <div key={key} className="column"> 
              <h2 className="datatitle" style={data.css}>{data.title}</h2>

                <Droppable droppableId={key}>
                  {(provided) => {
                    return(
                      <div ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="droppable_column"
                      >
                        {
                        data.items.map((element, index) => {
                          return (
                            <Draggable key={element.id} index={index} draggableId={element.id.toString()} >
                              {
                                (provided) => {
                                  return(
                                    <div
                                    ref = {provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="draggable_item"
                                    > 
                                    {element.name}
                                    </div>
                                  )

                                }}
                            </Draggable>
                          )
                        })}
                        {provided.placeholder}
                      </div>
                    )
                  }
                  }

                </Droppable>

            </div>
            
          )
          
        })}
      </DragDropContext>
      </div>

        
      
    </div>
  );
}

export default App;
