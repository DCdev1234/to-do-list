import Item from "@/components/item";
import { randomUUID } from "crypto";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export type ItemType = {
  content: string
  checked: boolean
  id: string
}


export default function Home() {
  const [items, setItems] = useState<ItemType[]>([])

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

  function handleAdd(e: FormEvent<HTMLFormElement>){
    e.preventDefault()
    if(e.currentTarget.input_field.value === ""){
      alert("You did not put any text in")
    }
    else{
      let newItems = [{content: e.currentTarget.input_field.value, checked: false, id: uuidv4().toString()}, ...items]
      setItems(newItems)
      localStorage.setItem("items",JSON.stringify(newItems))
      e.currentTarget.input_field.value = ""
    }
  }

  return (
    <div className="flex w-full">
      <div className="flex flex-col mx-auto mt-10">
          <h1 className="text-4xl mb-5 text-center font-bold">To-Do List</h1>
          <div className="flex flex-col gap-1">
            <form onSubmit={handleAdd} className="mx-auto mb-5 flex flex-row">
              <input type="text" className="text-black" id="input_field" name="input_field" autoComplete="off"/>
              <button className="bg-green-500 px-3 mx-2 block lg:hidden" type="submit">+</button>
            </form>
            {items.map((details)=>{
              return <Item key={details.id} setItems={setItems} details={details}/>
            })}
          </div>
      </div>
    </div>
  );
}
