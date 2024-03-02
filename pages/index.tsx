import Item from "@/components/item";
import Image from "next/image";
import { useEffect, useState } from "react";

export type ItemType = {
  content: string
  checked: boolean
  id: number
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

  return (
    <div className="flex w-full">
      <div className="flex flex-col mx-auto mt-10">
          <h1 className="text-4xl mb-5">To-Do List</h1>
          <div className="flex flex-col gap-1">
            {items.map((item)=>{
              return <Item setItems={setItems} details={item}/>
            })}
          </div>
      </div>
    </div>
  );
}