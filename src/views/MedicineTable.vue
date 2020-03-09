<template>
<v-container>
	<v-navigation-drawer v-model="drawer2" :right="right" width="30%" absolute temporary>
<AddMedicine v-bind:medicine="medicine" v-bind:medicines2="medicines2" v-bind:alertSuccess="alertSuccess" 
v-bind:alertError="alertError" v-bind:closeCreateMedicineDrawer="closeCreateMedicineDrawer"></AddMedicine>   
    </v-navigation-drawer>
    <v-layout
      text-center
      wrap
    >
      <v-flex>
    <v-navigation-drawer v-model="drawer" :right="right" width="30%" absolute temporary>
<EditMedicine v-bind:medicine="medicine" v-bind:medicines2="medicines2" v-bind:alertEditSuccess="alertEditSuccess" v-bind:closeEditMedicineDrawer="closeEditMedicineDrawer"></EditMedicine>   
    </v-navigation-drawer>
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
Medicines
<v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
<v-btn color="primary" elevation-24  @click.stop="openCreateMedicineDrawer()">Add new medicine</v-btn>
<v-spacer></v-spacer>
      <v-text-field class="text-right"
        v-model="search"
        
        label="Search"
        single-line
        hide-details
      ></v-text-field>

</v-card-title>


    <v-data-table :headers="headers" :items="medicines2" :search="search" :page.sync="page" :items-per-page="itemsPerPage" :sort-by.sync="sortBy"
      hide-default-footer

      @page-count="pageCount = $event">
<template v-slot:item.action="{ item }">
<v-btn icon x-small color="grey darken-1" @click.stop="openEditMedicineDrawer(item)"><v-icon>{{ editIcon.icon }}</v-icon></v-btn>
    </template>	
	</v-data-table>

</v-card>
<div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>

<br>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import MedicineRepository from '@/services/MedicinesRepositoryAPI';
import EditMedicine from './EditMedicine';
import AddMedicine from './AddMedicine';

export default{
props: [],
data(){
return {
sortBy:'name',
editIcon:{
icon:'mdi-pencil'
},
page: 1,
        pageCount: 0,
        itemsPerPage: 10,
dialog:false,
color: '',
        mode: '',
        snackbar: false,
        text: '',
        timeout: 3000,
        x: null,
        y: 'top',
alertSuccess2:false,
alertError2:false,
drawer:null,
drawer2:null,
right: true,
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' },
        ],
search:'',
       medicines2:[],
medicine:{
        name:'',
        id:''
       },
          headers: [
          {
            text: 'Medicines',
            align: 'left',
            sortable: false,
            value: 'name',
          },
{ text: 'Actions',align: 'center', value: 'action', sortable: false },
        ]
       
      }
    },
methods:{
openEditMedicineDrawer(item){
this.medicine = Object.assign({}, item)
this.drawer = !this.drawer
},
closeEditMedicineDrawer(){
this.drawer = !this.drawer
},
openCreateMedicineDrawer(){
this.drawer2 = true
},
closeCreateMedicineDrawer(){
this.drawer2 = false
},
alertSuccess(){
this.color="success"
this.text="New medicine has been saved!"
this.snackbar = true
},
alertEditSuccess(){
this.color="success"
this.text="Medicine has been successfully edited!"
this.snackbar = true
},
alertError(){
this.color="error"
this.text="Error medicine not saved!"
this.snackbar = true
},
deleteMedicine(id){
return this.$store.commit('deleteMedicine',id);
},
async getData(){
this.medicines2 = await MedicineRepository.getMedicines()
},
saveEditedConfiguration(){  
this.$store.commit('editConfig',this.item); 
}
},
created(){
this.getData()
},
components: {
EditMedicine,
AddMedicine
}
}
</script>