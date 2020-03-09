<template>
<v-container
    class="spacing-playground py-0 px-2"
    fluid
  >
<br>
    <v-form
:model="client"
      ref="addClientForm"
    >
      <v-text-field
        v-model="client.clientName"
        label="Name"
        required
:error-messages="clientNameErrors"
@input="$v.client.clientName.$touch()"
@blur="$v.client.clientName.$touch()"
      ></v-text-field>
<br>
<v-btn color="primary" dark @click="saveCreatedClient()">save new client</v-btn>
<v-btn class="spacing-playground py-0 px-2" text @click="closeDrawer">cancel</v-btn>
    </v-form>
</v-container>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import ClientRepository from '@/services/ClientRepositoryAPI';
  export default {
props: ['client','clients2','alertSuccess','alertError','closeCreateClientDrawer'],
mixins: [validationMixin],
validations: {
client:{
      clientName: { required}
}},
    data: () => ({
alert: false,
alert2: false,
    }),
computed: {
      clientNameErrors () {
        const errors = []
		if (!this.$v.client.clientName.$dirty) return errors
        !this.$v.client.clientName.required && errors.push('clientName is required')
        return errors
      },
},
  methods:{
  closeDrawer(){
this.closeCreateClientDrawer()
},
async	saveCreatedClient(){
            this.clientName = this.client.clientName
			this.$v.$touch()
  await  ClientRepository.createClient(this.client,this.clients2).then(result=>{
  /* eslint-disable no-console */
  console.log(result)
/* eslint-enable no-console */
  this.alertSuccess()
  this.closeCreateClientDrawer()
  this.$refs.addClientForm.reset()
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