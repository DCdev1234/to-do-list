import { ItemType } from "@/pages";
import { SetStateAction, Dispatch } from "react";

export default function Item({details, setItems}: {details: ItemType, setItems: Dispatch<SetStateAction<ItemType[]>>}){
    
    function handleCheck() {
        let itemsCache = localStorage.getItem("items")
        let itemsJson
        if (itemsCache){
          itemsJson = JSON.parse(itemsCache)
        } else{
          itemsJson = []
        }

        let item = itemsJson.filter((item: any)=>{return item.id === details.id})[0]
        let listWithoutItem = itemsJson.filter((item: any)=>{return item.id !== details.id})
        console.log("item", item)
        item.checked = !item.checked
        console.log("item", item)

        let newItems = [...listWithoutItem, item]
        setItems(newItems)
        localStorage.setItem("items",JSON.stringify(newItems))
    }


    return (
    <div className="flex flex-row gap-2">
        <input type="checkbox" id={`checkbox_${details.id}`} checked={details.checked} onChange={handleCheck} />
        <label htmlFor={`checkbox_${details.id}`}>{details.content}</label>
    </div>)


} 