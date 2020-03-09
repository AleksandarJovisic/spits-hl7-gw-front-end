import axios from 'axios';

export default{

async getInventories(inventories2){
let result = await   axios.get(process.env.VUE_APP_INVENTORY)
   /* eslint-disable no-console */
   console.log(result.data.items)
      /* eslint-disable no-console */
   inventories2 = result.data.items
      /* eslint-disable no-console */
   console.log(result.data.items)
      /* eslint-disable no-console */
   return inventories2
   }
,
async createInventory(inventory,inventories2){
let result = await  axios.post(process.env.VUE_APP_INVENTORY,{
   medicine_id: inventory.medicine_id,
   quantity: inventory.quantity
  })
  inventories2.push(result.data)
  return result
},

async editInventory(inventory,inventories2){
let URL =process.env.VUE_APP_INVENTORY+ "/" + inventory.medicine_id
let result = await axios.put(URL,{
    medicine_id: inventory.medicine_id,
    quantity: inventory.quantity
  })
  var index = inventories2.findIndex(function(i){
    return i.id === inventory.medicine_id;
})
  inventories2.splice(inventories2.findIndex(function(i){
    return i.id === inventory.medicine_id;
}), 1);
  inventories2.splice(index, 0, result.data);
  return result
}


}
