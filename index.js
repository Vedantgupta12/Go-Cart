import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase,ref,push,onValue,remove}from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings={
    databaseURL:"https://cart-app-f498e-default-rtdb.firebaseio.com/"
}
const app=initializeApp(appSettings)
const database =getDatabase(app)


const shoppingListInDB=ref(database,"shoppingList")

const inputEl=document.getElementById("input-el")
const inputBtn=document.getElementById("input-btn")
const shoppingElement=document.getElementById("shopping-list")

inputBtn.addEventListener("click",function(){
    let inputValue=inputEl.value
    push(shoppingListInDB,inputValue)
  
    emptyInput()
    
})
onValue(shoppingListInDB,function (snapshot){
    if(snapshot.exists())
    {
    let itemsArray=Object.entries(snapshot.val())
    clearShoppingListEl()
    for(let i=0;i<itemsArray.length;i++)
    {
        let currentItem=itemsArray[i]
        let currentItemId=currentItem[0]
        let currentItemValue=currentItem[1]
        addItem(currentItem)
    }
}
else{
    shoppingElement.innerHTML="No items here...yet"
}
})
function clearShoppingListEl()
{
    shoppingElement.innerHTML=""
}
function emptyInput()
{
    inputEl.value=""
}
function addItem(item)
{
    let itemId=item[0]
    let itemValue=item[1]
   let newEl=document.createElement("li")
   newEl.textContent=itemValue

   newEl.addEventListener("click",function(){
    let exactLocation=ref(database,`shoppingList/${itemId}`)
      remove(exactLocation)
})
   shoppingElement.append(newEl)
}