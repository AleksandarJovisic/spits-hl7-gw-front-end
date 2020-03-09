import axios from 'axios';

export default{


async getConfigurations(configurations2){
   let result = await  axios.get(process.env.VUE_APP_CONFIGURATIONS)
   /* eslint-disable no-console */
   console.log(result)
   /* eslint-disable no-console */
   configurations2 = result.data.items
 return configurations2
},

async getHL7versions(hl7_versions){
   let result = await  axios.get('http://localhost:8080/hl7-versions')
   /* eslint-disable no-console */
   console.log(result)
   /* eslint-disable no-console */
   hl7_versions = result.data.items
 return hl7_versions
},

async deleteConfiguration(id,configurations2){     
let deleteURL = process.env.VUE_APP_CONFIGURATIONS+ "/" + id
let result = await  axios.delete(deleteURL)
configurations2.splice(configurations2.findIndex(function(i){
    return i.id === id;
}), 1)
return result
},

async createConfiguration(configuration,configurations2){
/* eslint-disable no-console */
console.log(configuration)     
/* eslint-disable no-console */
let result = await axios.post(process.env.VUE_APP_CONFIGURATIONS,{
    client_id: configuration.client_id,
    ip_address: configuration.ip_address,
    port: configuration.port,
    hl7_version_id: configuration.hl7_version_id
  })
  /* eslint-disable no-console */
console.log(result)     
/* eslint-disable no-console */
configurations2.push(result.data)
  return result
},

async saveEditedConfiguration(configuration,configurations2){
/* eslint-disable no-console */
console.log(configuration.id)
/* eslint-disable no-console */
let URL =process.env.VUE_APP_CONFIGURATIONS+ "/" + configuration.id
let result = await axios.put(URL,{
    client_id: configuration.client_id,
    ip_address: configuration.ip_address,
    port: configuration.port,
    hl7_version_id: configuration.hl7_version_id
  })
   /* eslint-disable no-console */
console.log(result)
  /* eslint-disable no-console */
  var index = configurations2.findIndex(function(i){
    return i.id === configuration.id;
})
  configurations2.splice(configurations2.findIndex(function(i){
    return i.id === configuration.id;
}), 1);
  configurations2.splice(index, 0, result.data);
    return result
}

}
