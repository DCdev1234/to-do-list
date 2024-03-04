import Item from "@/components/item";
import { randomUUID } from "crypto";
import Image from "next/image";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export type ItemType = {
  content: string
  checked: boolean
  id: string
}


export default function Home() {
  const [items, setItems] = useState<ItemType[]>([])
  const [inputField, setInputField] = useState<string>("")

  useEffect(()=>{
    console.log("loaded")
    let itemsCache = localStorage.getItem("items")
    let itemsJson
    if (itemsCache){
      itemsJson = JSON.parse(itemsCache)
    } else{
      itemsJson = []
    }

    setItems(itemsJson)
  }, [])

  function handleAdd(){
    if(inputField === ""){
      alert("You did not put any text in")
    }
    else{
      let newItems = [...items,{content: inputField, checked: false, id: uuidv4().toString()}]
      setItems(newItems)
      localStorage.setItem("items",JSON.stringify(newItems))
      setInputField("")
    }
  }

  return (
    <div className="flex w-full">
      <div className="flex flex-col mx-auto mt-10">
          <h1 className="text-4xl mb-5">To-Do List</h1>
          <div className="flex flex-col gap-1">
            <div>
              <input type="text" className="text-black" value={inputField} onChange={(e)=>{setInputField(e.currentTarget.value)}}/>
              <button className="bg-green-500 px-3 mx-2 mb-5" onClick={handleAdd}>+</button>
            </div>
            {items.map((details)=>{
              return <Item setItems={setItems} details={details}/>
            })}
          </div>
      </div>
    </div>
  );
}
