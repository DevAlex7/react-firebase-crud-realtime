import React, {useEffect, useState} from 'react'
import Item from './item'
import { db } from '../services/firebase'
import { data } from 'autoprefixer'
const List = () => {
    
    const [list, setList] = useState([])
    const [isLoading, setLoading] = useState(false)
    
    useEffect(()=>{ 
        db.on('value', (snapshot) => {
            const todos = snapshot.val()
            
            const listOfTodos = []

            for(let id in todos){
                listOfTodos.push({id, ...todos[id]})
            }

            setList(listOfTodos)
        })

        setLoading(false)
    }, [])


    const completeTodo = (data) => {
        const listRef = db.child(data.id);
        listRef.update({
            complete: !data.complete,
        });
    };

    const deleteItem = (data) => {
        const listRef = db.child(data.id)
        listRef.remove()
    } 

    return <>
        <div className="">
        {
            isLoading ? 
                <h1>loading list...</h1>
            :
                list ? list.map((data, index)=> {
                    return <div key={index}>
                        <Item deleteItem={deleteItem} checkAction={completeTodo} list={data} index={index}/>
                    </div>
                })  : <h1>no items</h1>
        }
        </div>
    </>
}

export default List
