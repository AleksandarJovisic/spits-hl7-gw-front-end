import axios from 'axios';

export default{

 async deleteClient(id, clients2){     
let deleteURL =process.env.VUE_APP_BASE+ "/clients"+ "/" + id
let result = await  axios.delete(deleteURL)
clients2.splice(clients2.findIndex(function(i){
    return i.id === id;
}), 1)
return result
},
async changeClientStatus(client,clients2){
let URL =process.env.VUE_APP_BASE+ "/clients"+ "/"+ client.id +"/status"
let result = await  axios.put(URL,{
active:true
})
/* eslint-disable no-console */
console.log(result)
/* eslint-disable no-console */
  var index = clients2.findIndex(function(i){
    return i.id === client.id;
})
  clients2.splice(clients2.findIndex(function(i){
    return i.id === client.id;
}), 1);
  clients2.splice(index, 0, result.data);
return result
},

async changeClientStatusToInactive(client,clients2){
let URL =process.env.VUE_APP_BASE+ "/clients"+ "/"+ client.id +"/status"
let result = await  axios.put(URL,{
active:false
})
/* eslint-disable no-console */
console.log(result)
/* eslint-disable no-console */
  var index = clients2.findIndex(function(i){
    return i.id === client.id;
})
  clients2.splice(clients2.findIndex(function(i){
    return i.id === client.id;
}), 1);
  clients2.splice(index, 0, result.data);
return result
},

async getClients(clients2){
let result = await  axios.get(process.env.VUE_APP_BASE+ "/clients")
clients2 = result.data.items
  /* eslint-disable no-console */
  console.log(clients2)
  /* eslint-disable no-console */
return clients2
},

async createClient(client,clients2){
let URL =process.env.VUE_APP_BASE+ "/clients/" + client.id   
let result = await axios.post(URL,{  
   name: client.clientName
  })
clients2.push(result.data)
return result


},

async saveEditedClient(client,clients2){
let URL =process.env.VUE_APP_BASE+ "/clients/" + client.id
let result = await axios.put(URL,{
    name: client.name,
  })
/* eslint-disable no-console */
console.log(result)
/* eslint-disable no-console */
  var index = clients2.findIndex(function(i){
    return i.id === client.id;
})
  clients2.splice(clients2.findIndex(function(i){
    return i.id === client.id;
}), 1);
  clients2.splice(index, 0, result.data);
  return result


}

}