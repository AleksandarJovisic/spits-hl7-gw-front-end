<template>
<v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex xs12>
<v-navigation-drawer v-model="drawer5" :right="right" width="30%" absolute temporary>
<EditConfiguration v-bind:configuration="configuration" v-bind:hl7_version="hl7_version" v-bind:hl7_versions="hl7_versions"
v-bind:clients2="clients2" v-bind:configurations2="configurations2" v-bind:alertSuccessMethod="alertSuccessMethod"
v-bind:alertSuccessEditMethod="alertSuccessEditMethod" v-bind:alertError="alertError"
 v-bind:client="client" v-bind:closeEditConfigurationDrawer="closeEditConfigurationDrawer"></EditConfiguration>   
    </v-navigation-drawer>
	<v-navigation-drawer v-model="drawer6" :right="right" width="30%" absolute temporary>
<AddConfiguration v-bind:configuration="configuration" v-bind:hl7_version="hl7_version" v-bind:hl7_versions="hl7_versions"
v-bind:clients2="clients2" v-bind:configurations2="configurations2" v-bind:alertSuccessMethod="alertSuccessMethod" v-bind:closeCreateConfigurationDrawer="closeCreateConfigurationDrawer"></AddConfiguration>   
    </v-navigation-drawer>
<v-dialog persistent 
        v-model="configDialog"
        max-width="500px"
      >
        <DeleteConfiguration v-bind:configuration="configuration" v-bind:configurations2="configurations2" v-bind:closeDeleteDialog="closeDeleteDialog"
v-bind:alertInfo="alertInfo"></DeleteConfiguration>
      </v-dialog>
	<v-snackbar v-model="snackbar" :bottom="y === 'bottom'" :color="color" :left="x === 'left'"
      :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout"
      :top="y === 'top'" :vertical="mode === 'vertical'">
      {{ text }}
      <v-btn dark text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
<br>
<br>
<v-card>
<v-card-title>
Client configurations
<v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
<v-btn color="primary" elevation-24  @click.stop="openCreateConfigurationDrawer()">Add new configuration</v-btn>
<v-spacer></v-spacer>
      <v-text-field class="text-right"
        v-model="search"
        
        label="Search"
        single-line
        hide-details
      ></v-text-field>

</v-card-title>


    <v-data-table :headers="headers" :items="configurations2" :search="search" :page.sync="page" :items-per-page="10"
      hide-default-footer

      @page-count="pageCount = $event">
<template v-slot:item.action="{ item }">
<v-btn icon x-small color="grey darken-1" @click.stop="openEditConfigurationDrawer(item)"><v-icon>{{ editIcon.icon }}</v-icon></v-btn>
<v-btn icon x-small color="grey darken-1" @click="openDeleteConfigurationDialog(item)"><v-icon>{{ deleteIcon.icon }}</v-icon></v-btn>
    </template>	
<template v-slot:item.client_status="{ item }">
      <v-chip       label
      outlined :color="getColor(item.client_status)" dark v-if="item.client_status" x-small>ACTIVE</v-chip>
<v-chip       label
      outlined :color="getColor(item.client_status)" dark v-else x-small>INACTIVE</v-chip>
</template>
	</v-data-table>
</v-card>
<div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>

      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import ClientRepository from '@/services/ClientRepositoryAPI';
import ConfigurationRepository from '@/services/ConfigurationRepositoryAPI';
import AddConfiguration from './AddConfiguration';
import EditConfiguration from './EditConfiguration';
import DeleteConfiguration from './DeleteConfiguration';

export default{
props: [],
data(){
return {
editIcon:{
icon:'mdi-pencil'
},
deleteIcon:{
icon:'mdi-delete'
},
page: 1,
        pageCount: 0,
        itemsPerPage: 5,
configDialog:false,
color: '',
        mode: '',
        snackbar: false,
        text: '',
        timeout: 3000,
        x: null,
        y: 'top',
		client:{
id:'',	
  name:'',
  active:''
  },
hl7_version:{
id:'',
code:''
},
configuration:{
        id:'',
client_id:'',
  client_name:'',
  ip_address:'',
  port:'',
  client_status:'',
  hl7_version_code:'',
  hl7_version_id:''
  }, 
alert:false,
drawer6:null,
drawer5:null,
drawer2:null,
right: true,
search:'',
       configurations2:[],
clients2:[],
hl7_versions:[],
headers: [
{ text: 'Configurations', align: 'left', sortable: false, value: 'client_name' },
{ text: 'IP Address',align: 'center', value: 'ip_address', sortable: false },
{ text: 'Port',align: 'center', value: 'port', sortable: false },
{ text: 'Status of client',align: 'center', value: 'client_status', sortable: false },
{ text: 'HL7 version',align: 'center', value: 'hl7_version_code', sortable: false },
{ text: 'Actions',align: 'center', value: 'action', sortable: false },
        ]
       
      }
    },
methods:{
openEditConfigurationDrawer(item){
this.configuration = Object.assign({}, item)
this.drawer5 = !this.drawer5
},
getColor (client_status) {
        if (client_status == false){
		return 'error'
		}
        else{
		return 'success'
		} 
      },
async getClients(){
this.clients2 = await ClientRepository.getClients()
},
alertSuccessMethod(){
this.color="success"
this.text="New configuration has been saved!"
this.snackbar = true
},
alertSuccessEditMethod(){
this.color="success"
this.text="Configuration details have been successfully edited!"
this.snackbar = true
},
alertError(){
this.color="error"
this.text="Error - configuration not saved!"
this.snackbar = true
},
openDeleteConfigurationDialog(item){
this.configuration = Object.assign({}, item)
this.configDialog = true
/* eslint-disable no-console */
console.log(this.configuration)
/* eslint-disable no-console */
},
closeCreateConfigurationDrawer(){
this.drawer6 = !this.drawer6
},
closeEditConfigurationDrawer(){
this.drawer5 = false
},
openCreateConfigurationDrawer(){
this.drawer6 = !this.drawer6
},
alertSuccess2(){
this.alert = !this.alert
},
alertInfo(){
this.color="info"
this.text="Configuration has been successfully deleted!"
this.snackbar = true
},
deleteMedicine(id){
return this.$store.commit('deleteMedicine',id);
},
closeDeleteDialog (){
this.configuration=''
this.configDialog = false
},
async getData(){
this.configurations2 = await ConfigurationRepository.getConfigurations()
},
async getHL7versions(){
this.hl7_versions = await ConfigurationRepository.getHL7versions()
},
},
created(){
this.getData()
this.getHL7versions()
this.getClients()
},
components: {
AddConfiguration,
EditConfiguration,
DeleteConfiguration
}
}
</script>