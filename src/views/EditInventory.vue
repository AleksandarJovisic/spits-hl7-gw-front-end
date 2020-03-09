<template>
<v-container
    class="spacing-playground py-0 px-2"
    fluid
  >
  <br>
    <v-form
      ref="editInventoryForm"
:model="inventory"
    >
      <v-text-field
        v-model="inventory.quantity"
        label="Quantity"
        required
:error-messages="inventoryQuantityErrors"
@input="$v.inventory.quantity.$touch()"
@blur="$v.inventory.quantity.$touch()"
      ></v-text-field>
<br>
<v-btn color="primary" dark @click="createInventory()">save edited inventory</v-btn>
<v-btn class="spacing-playground py-0 px-2" text @click="closeDrawer()">cancel</v-btn>
    </v-form>
</v-container>
</template>
<script>
import { required, numeric } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import InventoryRepository from '@/services/InventoryRepositoryAPI';
  export default {
props: ['inventory','inventories2','medicines2','alertSuccess','alertError','closeEditInventoryDrawer'],
mixins: [validationMixin],
validations: {
inventory:{
quantity: { required, numeric}
}},
    data: () => ({
alert: false,
alert2: false,
    }),
computed: {
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
this.$refs.editInventoryForm.reset()
this.$v.$reset()
this.closeEditInventoryDrawer()
},
async	createInventory(){
this.$v.$touch()
  await  InventoryRepository.editInventory(this.inventory,this.inventories2).then(result=>{
/* eslint-disable no-console */
    console.log(result)
/* eslint-enable no-console */
  this.$refs.editInventoryForm.reset()
    this.$v.$reset()
this.closeEditInventoryDrawer()
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