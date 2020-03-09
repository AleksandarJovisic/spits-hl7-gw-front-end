import axios from 'axios';

export default{

async getMedicines(medicines2){
let result = await  axios.get(process.env.VUE_APP_MEDICINES)
medicines2 = result.data.items
return medicines2
},

async createMedicine(medicine,medicines2){
let result = await  axios.post(process.env.VUE_APP_MEDICINES,{
   name: medicine.name
})
medicines2.push(result.data)
return result
},

async saveEditedMedicine(medicine, medicines2){
let URL = process.env.VUE_APP_MEDICINES+"/" + medicine.id
let result = await axios.put(URL,{
    name: medicine.name,
  })
  var index = medicines2.findIndex(function(i){
    return i.id === medicine.id;
})
  medicines2.splice(medicines2.findIndex(function(i){
    return i.id === medicine.id;
}), 1);
  medicines2.splice(index, 0, result.data);

  return result
}

}
