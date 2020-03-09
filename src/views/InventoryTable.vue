<template>
<v-container>
	<v-navigation-drawer v-model="invDrawerAdd" :right="right" width="30%" absolute temporary>
<AddInventory v-bind:inventory="inventory" v-bind:inventories2="inventories2" v-bind:medicines2="medicines2" v-bind:alertSuccess="alertSuccess" 
v-bind:alertError="alertError" v-bind:closeCreateInventoryDrawer="closeCreateInventoryDrawer"></AddInventory>   
    </v-navigation-drawer>
	<v-navigation-drawer v-model="invDrawerEdit" :right="right" width="30%" absolute temporary>
<EditInventory v-bind:inventory="inventory" v-bind:inventories2="inventories2" v-bind:medicines2="medicines2" v-bind:alertSuccess="alertSuccess" 
v-bind:alertError="alertError" v-bind:closeEditInventoryDrawer="closeEditInventoryDrawer"></EditInventory>   
    </v-navigation-drawer>
    <v-layout
      text-center
      wrap
    >
      <v-flex>
	<v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :color="color"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn
        dark
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
<br>
<br>
<v-card>
<v-card-title>
Inventory
<v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
<v-btn color="primary" elevation-24  @click.stop="openCreateInventoryDrawer()">Add new inventory</v-btn>
<v-spacer></v-spacer>
      <v-text-field class="text-right"
        v-model="search"
        
        label="Search"
        single-line
        hide-details
      ></v-text-field>

</v-card-title>


    <v-data-table :headers="headers" :items="inventories2" :search="search" :page.sync="page" :items-per-page="itemsPerPage" :sort-by.sync="sortBy"
      hide-default-footer

      @page-count="pageCount = $event">
<template v-slot:item.action="{ item }">
<v-btn icon x-small color="grey darken-1" @click.stop="openEditInventoryDrawer(item)"><v-icon>{{ editIcon.icon }}</v-icon></v-btn>
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
import InventoryRepository from '@/services/InventoryRepositoryAPI';
import MedicineRepository from '@/services/MedicinesRepositoryAPI';
import AddInventory from './AddInventory';
import EditInventory from './EditInventory';
export default{
props: [],
data(){
return {
sortBy:'medicine_name',
invDrawerEdit:false,
editIcon:{
icon:'mdi-pencil'
},
color: '',
        mode: '',
        snackbar: false,
        text: '',
        timeout: 3000,
        x: null,
        y: 'top',
page: 1,
        pageCount: 0,
        itemsPerPage: 10,
alert:false,
invDrawerAdd:null,
drawer2:null,
right: true,
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' },
        ],
search:'',
medicines2:[],
       inventories2:[],
inventory:{
        medicine_name:'',
        quantity:'',
		medicine_id:'',
        id:''
       },
          headers: [
          {
            text: 'Inventories',
            align: 'left',
            sortable: false,
            value: 'medicine_name',
          },
{ text: 'Quantity',align: 'center', value: 'quantity', sortable: false },
{ text: 'Actions',align: 'center', value: 'action', sortable: false },
        ]
       
      }
    },
methods:{
async getMedicines(){
this.medicines2 = await MedicineRepository.getMedicines()
},
openCreateInventoryDrawer(){
this.invDrawerAdd = true
},
closeCreateInventoryDrawer(){
this.invDrawerAdd = false
},
openEditInventoryDrawer(item){
this.inventory = Object.assign({}, item)
this.invDrawerEdit = true
},
closeEditInventoryDrawer(){
this.invDrawerEdit = false
},
alertError(){
this.color="error"
this.text="Error, inventory not saved!"
this.snackbar = true
},
alertSuccess(){
this.color="success"
this.text="New inventory has been saved!"
this.snackbar = true
},
deleteMedicine(id){
return this.$store.commit('deleteMedicine',id);
},
async getData(){
this.inventories2 = await InventoryRepository.getInventories()
},
saveEditedConfiguration(){  
this.$store.commit('editConfig',this.item); 
}
},
created(){
this.getData()
this.getMedicines()
},
components: {
AddInventory,
EditInventory
}
}
</script>