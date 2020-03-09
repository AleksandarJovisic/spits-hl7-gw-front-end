<template>
<v-container
    class="spacing-playground py-0 px-2"
    fluid
  >
<br>
    <v-form
      ref="editMedicineform"
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
<v-btn color="primary" dark @click="saveEditedMedicine()">save edited medicine</v-btn>
<v-btn class="spacing-playground py-0 px-2" text @click="closeDrawer">cancel</v-btn>
    </v-form>
</v-container>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import MedicineRepository from '@/services/MedicinesRepositoryAPI';
  export default {
props: ['medicine','medicines2','closeEditMedicineDrawer','alertEditSuccess'],
mixins: [validationMixin],
validations: {
medicine:{
      name: { required}
}},
    data: () => ({
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
async saveEditedMedicine(){  
this.$v.$touch()
await MedicineRepository.saveEditedMedicine(this.medicine,this.medicines2).then(result => {

/* eslint-disable no-console */
    console.log(result)
/* eslint-enable no-console */

this.$refs.editMedicineform.reset()
this.$v.$reset()
this.closeEditMedicineDrawer()
this.alertEditSuccess()
  }).catch(error => {
  /* eslint-disable no-console */
  console.log(error)
  /* eslint-disable no-console */
  })
},
closeDrawer(){
this.$refs.editMedicineform.reset()
this.$v.$reset()
this.closeEditMedicineDrawer()
}
}
  }

</script>