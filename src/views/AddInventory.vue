<template>
<v-container
    class="spacing-playground py-0 px-2"
    fluid
  >
  <br>
    <v-form
      ref="addInventoryForm"
:model="inventory"
    >
<v-select clearable
v-model="inventory.medicine_id"
:items="medicines2"
item-text="name"
item-value="id"
label="Medicine"
        required
:error-messages="inventoryNameErrors"
@input="$v.inventory.medicine_id.$touch()"
@blur="$v.inventory.medicine_id.$touch()"
></v-select>

      <v-text-field
        v-model="inventory.quantity"
        label="Quantity"
        required
:error-messages="inventoryQuantityErrors"
@input="$v.inventory.quantity.$touch()"
@blur="$v.inventory.quantity.$touch()"
      ></v-text-field>
<br>
<v-btn color="primary" dark @click="createInventory()">save new inventory</v-btn>
<v-btn class="spacing-playground py-0 px-2" text @click="closeDrawer()">cancel</v-btn>
    </v-form>
</v-container>
</template>
<script>
import { required, numeric } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import InventoryRepository from '@/services/InventoryRepositoryAPI';
  export default {
props: ['inventory','inventories2','medicines2','alertSuccess','alertError','closeCreateInventoryDrawer'],
mixins: [validationMixin],
validations: {
inventory:{
      medicine_id: { required},
quantity: { required, numeric}
}},
    data: () => ({
alert: false,
alert2: false,
    }),
computed: {
      inventoryNameErrors () {
        const errors = []
		if (!this.$v.inventory.medicine_id.$dirty) return errors
        !this.$v.inventory.medicine_id.required && errors.push('medicine name for inventory is required')
        return errors
      },
      inventoryQuantityErrors () {
        const errors = []
		if (!this.$v.inventory.quantity.$dirty) return errors
		!this.$v.inventory.quantity.numeric && errors.push('invalid quantity, must be a number')		
        !this.$v.inventory.quantity.required && errors.push('quantity is required.')
        return errors
      },
},
  methods:{
closeDrawer(){
this.$refs.addInventoryForm.reset()
this.$v.$reset()
this.closeCreateInventoryDrawer()
},
async	createInventory(){
this.$v.$touch()
  await  InventoryRepository.createInventory(this.inventory,this.inventories2).then(result=>{
/* eslint-disable no-console */
    console.log(result)
/* eslint-enable no-console */
  this.$refs.addInventoryForm.reset()
    this.$v.$reset()
this.closeCreateInventoryDrawer()
  this.alertSuccess()
  }).catch(error => {
/* eslint-disable no-console */
  console.log(error)
/* eslint-enable no-console */
  this.alertError()  
  })
     }
},
  }

</script>