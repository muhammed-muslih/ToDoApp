import React from "react";
import { useState,useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt,faEdit,faCalendarPlus} from '@fortawesome/free-regular-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';



const BodyTitle = ()=>{
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const currentDate = new Date()
    const currentDay = currentDate.getDay()
    const day = days[currentDay]
    return (
        <div className="body-title"> 
            <h1 style={{color:""}}> <b>  Whoops, it's {day} 🌚  </b></h1>
        </div>
    )

}

const Subtitle = ()=>{
    return(
        <h1 className="subTitle" style={{color:"rgb(51, 125, 235)"}}> 📌Inbox </h1>
    )
}



const AddToDo = ()=>{

//add list in to array
    const [toDoTitle,setToDoTitle] = useState('')
    const [toDoDescription,setToDoDescription] = useState('')
    const [toDos ,setToDos] = useState(()=>{
        const toDoList = localStorage.getItem('todos')
        if(toDoList){
            return JSON.parse(toDoList)
        }else{
            return []
        }
    })

     
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(toDos))
      }, [toDos]);


      //edit toDo

    


     //add to do modal
     const [addToDo,setAddTodo] = useState(false)



     function checkRadioButtonState (id){
        toDos?.map((todo)=>{

            if(todo.id === id){
                todo.isCompleted = !todo.isCompleted;
            }

        })
        setToDos([...toDos]);
    }

    function setEditTodo(id) {
        toDos?.map((data)=>{
            if(data.id === id){
                data.isEdit = !data.isEdit;
            }
        })
        setToDos([...toDos])
    }

    function deleteTodo(id){
        // console.log(id);

     const result = window.confirm("Are you sure you want to delete");

    if(result){
     toDos.map((data,index) => {
        if (data.id === id) {
            toDos.splice(index, 1);
        }
    })

    setToDos([...toDos])
     }
   


    }
   


    return(
        <>
        <div className="toDoAddDiv" onClick={()=>{
            
          setAddTodo(!addToDo)
        }}>
           {/* <div className="addIcon"><FontAwesomeIcon icon={faPlusSquare}/></div> */}
           <div className="add-task"> <h2>📝Add task</h2></div>
        </div>
    {addToDo? 


    <div className="modalCard">

        <div>
           <div ><input type="text" placeholder="Task Name..."style={{fontSize:18,width:'100%'}} className="inputBox" value={toDoTitle}
              onChange={(e)=>{
              setToDoTitle(e.target.value)
              }} />
           </div>

          <div><input type="text" placeholder="Description..." style={{fontSize:16,width:'100%',marginTop:"1rem"}} className="inputBox" 
               value={toDoDescription}
               onChange={(e)=>{
              setToDoDescription(e.target.value)
               }} />
            </div>

        </div>

       <div className="btnDiv">
           <div> <FontAwesomeIcon icon={faCalendarPlus} /> </div>
           <div className="addBtnDiv">
           <button style={{color:"whitesmoke",fontSize:16,backgroundColor:'rgb(51, 125, 235)',cursor:'pointer'}}
           onClick={()=>{
            if(toDoTitle){

                setToDos([{id:Date.now(),title:toDoTitle,description:toDoDescription,isCompleted:false,isDeleted:false,isEdit:false},...toDos])
                setToDoTitle('')
                setToDoDescription('')
                setAddTodo(false)

            }else{
                setAddTodo(false)
                window.alert('Title is required')

            }
           
            }} >AddTask</button>
      
           <button style={{color:"rgb(51, 125, 235)",fontSize:16,marginRight:"2rem",cursor:'pointer'}} onClick={()=>{
            setAddTodo(false)
            setToDoTitle('')
            setToDoDescription('')
            }}>Cancel</button>
        </div>
       </div>
    </div>
      
      :""  } 

     
     {
        (toDos.length == 0 ? (<div className="empty">

              
            <img src="https://png.pngtree.com/png-vector/20190729/ourmid/pngtree-todo-task-list-check-time-flat-color-icon-vector-png-image_1624185.jpg"/>
             <h1>No Task oops....</h1>
        </div>) : (
        toDos?.map((data)=>(

       
        data.isCompleted ? (

        <div className="card" key={data.id} style={{backgroundColor:"#c6ccc8"}}> 
        <div>
       <input type="checkbox" className="selectRadio" checked={data.isCompleted} onChange={(e)=>{
        // console.log(e.target.checked);
        checkRadioButtonState(data.id);
       }} />


       <div className="container">
        <strike>
       <h4><b>{data.title}</b></h4>
       <p>{data.description}</p>
       </strike>
       </div>
       </div>

      <div className="icon">
       {/* <div> <FontAwesomeIcon icon={faEdit} />  </div> */}
       <div style={{color:"red",cursor:'pointer'}}> <FontAwesomeIcon icon={faTrashAlt} onClick={()=>{
        deleteTodo(data.id)
       }} /> </div>
      </div>  

    </div>
            ):(
               
              <div key={data.id}> 
                <div className="card" > 
                <div>
                <input type="checkbox" className="selectRadio" checked={data.isCompleted} onChange={(e)=>{
                 console.log(e.target.checked);
                 checkRadioButtonState(data.id);
                }} />
         
         
                <div className="container">
                <h4><b>{data.title}</b></h4>
                <p>{data.description}</p>
                </div>
                </div>
         
               <div className="icon">
                <div style={{color:"blue",cursor:'pointer'}}> <FontAwesomeIcon icon={faEdit} onClick={()=>{
                   setEditTodo(data.id)
                }} />  </div>
                <div style={{color:"red",cursor:'pointer'}}> <FontAwesomeIcon icon={faTrashAlt} onClick={()=>{
                    deleteTodo(data.id)
                }} /> </div>
               </div>  
         
             </div>


             {
             data.isEdit ? (


            <div className="modalCard">

        <div>
           <div ><input type="text" placeholder="Task Name..."style={{fontSize:18,width:'100%'}} className="inputBox" value={data.title}
              onChange={(e)=>{
                // console.log(e.target.value);
                data.title = e.target.value
               setToDoTitle(e.target.value)
              }} />
           </div>

          <div><input type="text" placeholder="Description..." style={{fontSize:16,width:'100%',marginTop:"1rem"}} className="inputBox" 
               value={data.description}
               onChange={(e)=>{
                data.description = e.target.value
               setToDoDescription(e.target.value)
               }} />
            </div>

        </div>

       <div className="btnDiv">
           <div> <FontAwesomeIcon icon={faCalendarPlus} /> </div>
           <div className="addBtnDiv">
           <button style={{color:"whitesmoke",fontSize:16,backgroundColor:'rgb(51, 125, 235)'}}
           onClick={()=>{
            setEditTodo(data.id)
            }} >EditTask</button>
      
           <button style={{color:"rgb(51, 125, 235)",fontSize:16,marginRight:"2rem"}} onClick={()=>{setEditTodo(data.id)}}>Cancel</button>
        </div>
       </div>
    </div>
             ):""
           
             }
             </div>

            )

          )))

     )}

    </>

    )
}




const Body = ()=>{
    return(
        <div className="mainDiv">
        <div className="toDoBody">

            <BodyTitle/>
            <Subtitle/>
            <AddToDo/>
        </div>
        </div>
        
    )
}

export default Body;