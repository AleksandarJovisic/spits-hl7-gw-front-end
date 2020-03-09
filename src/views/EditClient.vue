<template>
<v-container
    class="spacing-playground py-0 px-2"
    fluid
  >
<br>
    <v-form
      ref="editClientForm"
    >
      <v-text-field
        v-model="client.name"
        label="Name"
        required
:error-messages="clientNameErrors"
@input="$v.client.name.$touch()"
@blur="$v.client.name.$touch()"
      ></v-text-field>
<br>
<v-btn color="primary" dark @click="saveEditedClient()">save edited client</v-btn>
<v-btn class="spacing-playground py-0 px-2" text @click="closeDrawer">cancel</v-btn>
    </v-form>
</v-container>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import ClientRepository from '@/services/ClientRepositoryAPI';
  export default {
props: ['client','clients2','closeEditMedicineDrawer','closeEditClientDrawer','alertSuccessEditClient','alertError'],
mixins: [validationMixin],
validations: {
client:{
      name: { required}
}},
    data: () => ({
    }),
computed: {
      clientNameErrors () {
        const errors = []
		if (!this.$v.client.name.$dirty) return errors
        !this.$v.client.name.required && errors.push('name is required')
        return errors
      },
},
  methods:{
async saveEditedClient(){  
this.$v.$touch()
await ClientRepository.saveEditedClient(this.client,this.clients2).then(result => {
  /* eslint-disable no-console */
  console.log(result)
  /* eslint-disable no-console */
    /* eslint-disable no-console */
  console.log("success")
  /* eslint-disable no-console */
  this.closeEditClientDrawer()
  this.alertSuccessEditClient()
  this.$v.$reset()
    /* eslint-disable no-console */
  console.log("success")
  /* eslint-disable no-console */
  }).catch(error =>{
      /* eslint-disable no-console */
  console.log(error)
  /* eslint-disable no-console */
  this.alertError()
  })
},
closeDrawer(){
this.closeEditClientDrawer()
}
}
  }

</script>