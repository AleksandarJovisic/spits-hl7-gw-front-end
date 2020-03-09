<template>
<v-container
    class="spacing-playground py-0 px-2"
    fluid
  >
  <br>
    <v-form
      ref="medicineform"
:model="medicine"
    >
      <v-text-field
        v-model="medicine.name"
        label="Name"
        required
:error-messages="medicineNameErrors"
@input="$v.medicine.name.$touch()"
@blur="$v.medicine.name.$touch()"
      ></v-text-field>
<br>
<v-btn color="primary" dark @click="createMedicine()">save new medicine</v-btn>
<v-btn class="spacing-playground py-0 px-2" @click="closeCreateMedicineDrawer()" text>cancel</v-btn>
    </v-form>

</v-container>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import MedicineRepository from '@/services/MedicinesRepositoryAPI';
  export default {
props: ['medicine','medicines2','alertSuccess','alertError','closeCreateMedicineDrawer'],
mixins: [validationMixin],
validations: {
medicine:{
      name: { required}
}},
    data: () => ({
alert: false,
alert2: false,
    }),
computed: {
      medicineNameErrors () {
        const errors = []
		if (!this.$v.medicine.name.$dirty) return errors
        !this.$v.medicine.name.required && errors.push('medicine name is required')
        return errors
      },
},

  methods:{
async	createMedicine(){
            this.name = this.medicine.name
this.$v.$touch()
  await  MedicineRepository.createMedicine(this.medicine,this.medicines2).then(result=>{
/* eslint-disable no-console */
    console.log(result)
/* eslint-enable no-console */
this.closeCreateMedicineDrawer()
  this.alertSuccess()
  this.$refs.medicineform.reset()
    this.$v.$reset()
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