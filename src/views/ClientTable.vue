<template>
<v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex>
<v-navigation-drawer v-model="clientSaveDrawer" :right="right" width="30%" absolute temporary>
<AddClient v-bind:client="client" v-bind:clients2="clients2" v-bind:alertSuccess="alertSuccess" 
v-bind:alertError="alertError" v-bind:closeCreateClientDrawer="closeCreateClientDrawer"></AddClient>
    </v-navigation-drawer>
<v-navigation-drawer v-model="clientEditDrawer" :right="right" width="30%" absolute temporary>
<EditClient v-bind:client="client" v-bind:clients2="clients2" v-bind:alertSuccessEditClient="alertSuccessEditClient" 
v-bind:alertError="alertError" v-bind:closeEditClientDrawer="closeEditClientDrawer"></EditClient>
    </v-navigation-drawer>
<v-dialog
        v-model="dialog"
        max-width="500px"
      >
        <DeleteClient v-bind:client="client" v-bind:clients2="clients2" v-bind:closeDeleteDialog="closeDeleteDialog"
v-bind:alertInfo="alertInfo"></DeleteClient>
      </v-dialog>
<v-snackbar v-model="snackbar" :bottom="y === 'bottom'" :color="color" :left="x === 'left'"
      :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout"
      :top="y === 'top'" :vertical="mode === 'vertical'">
      {{ text }}
      <v-btn dark text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
	<v-snackbar v-model="snackbar2" :bottom="y === 'bottom'" :color="color" :left="x === 'left'"
      :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout"
      :top="y === 'top'" :vertical="mode === 'vertical'">
      {{ text }}
      <v-btn dark text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
<br>
<br>
<v-card >
<v-card-title>
      Clients
<v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
<v-btn color="primary" elevation-24  @click.stop="openCreateClientDrawer()">Add new client</v-btn>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" label="Search" single-line hide-details>
</v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="clients2" :search="search" class="elevation-1" :page.sync="page" :items-per-page="itemsPerPage"
      hide-default-footer

      @page-count="pageCount = $event">
<template v-slot:item.action="{ item }">
<v-btn icon  x-small color="grey darken-1" @click.stop="openEditClientDrawer(item)"><v-icon>{{ editIcon.icon }}</v-icon></v-btn>
<v-menu
      :close-on-content-click="false"
      :nudge-width="80"
      offset-y="offset"
    >
      <template v-slot:activator="{ on }">
        <v-btn
icon  x-small color="grey darken-1"
          v-on="on"
        >
          <v-icon>{{ actionIcon.icon }}</v-icon>
        </v-btn>
      </template>

        <v-list dense rounded>
          <v-list-item>

<v-btn v-if="item.active" small color="error"  @click.stop="changeClientStatusToInactive(item)">deactivate</v-btn>
              <v-btn v-else small color="success"  @click.stop="changeClientStatus(item)">activate</v-btn>
          </v-list-item>
            <v-list-item>
            <v-btn
@click="openDeleteClientDialog(item)"
        
        dark
        small
        color="red"
      >
DELETE
      </v-btn>
         
          </v-list-item>
        </v-list>


    </v-menu>

    </template>	
<template v-slot:item.active="{ item }">
      <v-chip       label
      outlined :color="getColor(item.active)" dark v-if="item.active" x-small >ACTIVE</v-chip>
<v-chip       label
      outlined :color="getColor(item.active)" dark v-else x-small>INACTIVE</v-chip>
</template>
	</v-data-table>
<div>
	
</div>
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
import AddClient from './AddClient';
import EditClient from './EditClient';
import DeleteClient from './DeleteClient';
export default{
props: [],
data(){
return {
color2:'purple',
offset:'true',
editIcon:{
icon:'mdi-pencil'
},
actionIcon:{
icon:'mdi-dots-horizontal'
},
deleteIcon:{
icon:'mdi-delete'
},

page: 1,
        pageCount: 0,
        itemsPerPage: 10,
dialog:false,
color: '',
        mode: '',
        snackbar2: false,
snackbar: false,
        text: '',
        timeout: 3000,
        x: null,
        y: 'top',
clientSaveDrawer:false,
clientEditDrawer:false,
direction: 'top',
    fab: false,
    fling: false,
    hover: false,
    tabs: null,
    top: false,
    bottom: true,
    left: false,
    transition: 'slide-y-reverse-transition',
right2: 'true',
right: true,
search:'',
       clients2:[],
client:{
id:'',	
  name:'',
  active:''
  },
          headers: [
          {
            text: 'Client',
            align: 'left',
            sortable: false,
            value: 'name',
          },
{ text: 'Status',align: 'center', value: 'active', sortable: false },
{ text: 'Actions',align: 'center', value: 'action', sortable: false },
        ]
       
      }
    },
    computed: {
      activeFab () {
        switch (this.tabs) {
          case 'one': return { class: 'purple', icon: 'account_circle' }
          case 'two': return { class: 'red', icon: 'edit' }
          case 'three': return { class: 'green', icon: 'keyboard_arrow_up' }
          default: return {}
        }
      },
    },
watch: {
      top (val) {
        this.bottom = !val
      },
      right (val) {
        this.left = !val
      },
      bottom (val) {
        this.top = !val
      },
      left (val) {
        this.right2 = !val
      },
    },
methods:{
openEditMedicineDrawer(item){
this.medicine = Object.assign({}, item)
this.drawer = !this.drawer
},
cellValueRenderer(row, column, cellValue) {
        let value = cellValue;
        if (typeof row[column.property] === 'boolean') {
            value = String(cellValue);
            if (value === 'true'){
            value = "ACTIVE"
            }else{
            value = "INACTIVE"
            }
        }
        return value;
    },
getColor (active) {
        if (active == false){
		return 'error'
		}
        else{
		return 'success'
		} 
      },
openCreateClientDrawer(){
this.clientSaveDrawer = !this.clientSaveDrawer
},
openEditClientDrawer(item){
this.client = Object.assign({}, item)
/* eslint-disable no-console */
console.log(this.client)
/* eslint-disable no-console */
this.clientEditDrawer = !this.clientEditDrawer
},
openDeleteClientDialog(item){
this.client = Object.assign({}, item)
  /* eslint-disable no-console */
  console.log(this.client)
/* eslint-enable no-console */
this.dialog = !this.dialog
},
closeCreateClientDrawer(){
this.clientSaveDrawer = !this.clientSaveDrawer
},
closeEditClientDrawer(){
this.clientEditDrawer = false
},
closeDeleteDialog(){
this.dialog = false
},
async changeClientStatus(item){
this.client = Object.assign({}, item)
  await  ClientRepository.changeClientStatus(this.client, this.clients2).then(result=>{
  /* eslint-disable no-console */
  console.log(result)
/* eslint-enable no-console */
  }).catch(error => {
  /* eslint-disable no-console */
  console.log(error)
/* eslint-enable no-console */
  })
},
async changeClientStatusToInactive(item){
this.client = Object.assign({}, item)
  await  ClientRepository.changeClientStatusToInactive(this.client, this.clients2).then(result=>{
  /* eslint-disable no-console */
  console.log(result)
/* eslint-enable no-console */
  }).catch(error => {
  /* eslint-disable no-console */
  console.log(error)
/* eslint-enable no-console */
  })
},
async getData(){
this.clients2 = await ClientRepository.getClients()
},
alertSuccessEditClient (){
this.color="success"
this.text="Client "+ this.client.name +" has been successfully edited!"
this.snackbar2 = true
},
alertSuccess(){
this.color="success"
this.text="New client"+ this.client.name +" has been saved!"
this.snackbar = true
},
alertError(){
this.color="error"
this.text="Error - something went wrong, try again!"
this.snackbar = true
},
alertInfo(){
this.color="info"
this.text="Client has been successfully deleted!"
this.snackbar = true
}
},
created(){
this.getData()
},
components: {
AddClient,
EditClient,
DeleteClient
}
}
</script>
<style>
  /* This is for documentation purposes and will not be needed in your application */
  #create .v-speed-dial {
    position: absolute;
  }

  #create .v-btn--floating {
    position: relative;
  }
</style>
