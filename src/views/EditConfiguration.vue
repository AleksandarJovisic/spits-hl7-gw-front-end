<template>
<v-container
    class="spacing-playground py-0 px-2"
    fluid
  >
<br>
    <v-form
:model="configuration"
      ref="editConfigurationForm"
    >
<v-select clearable
:items="clients2"
v-model="configuration.client_id"
item-text="name"
item-value="id"
:error-messages="client_idErrors"
label="Client name"
@input="$v.configuration.client_id.$touch()"
@blur="$v.configuration.client_id.$touch()"
></v-select>
<v-text-field
v-model="configuration.ip_address"
label="IP Address"
:error-messages="ip_addressErrors"
required
@input="$v.configuration.ip_address.$touch()"
@blur="$v.configuration.ip_address.$touch()"
></v-text-field>
<v-text-field
v-model="configuration.port"
label="Port"
:error-messages="portErrors"
required
@input="$v.configuration.port.$touch()"
@blur="$v.configuration.port.$touch()"
></v-text-field>
<v-select clearable
v-model="configuration.hl7_version_id"
:items="hl7_versions"
item-text="code"
item-value="id"
label="HL7 version"
:error-messages="hl7_version_idErrors"
required
@input="$v.configuration.hl7_version_id.$touch()"
@blur="$v.configuration.hl7_version_id.$touch()"
></v-select>
<br>
<v-btn color="primary" dark @click="saveEditedConfiguration()">save edited configuration</v-btn>
<v-btn class="spacing-playground py-0 px-2" text @click="closeEditConfigurationDrawer();reset()">cancel</v-btn>
    </v-form>
</v-container>
</template>
<script>
import { required,ipAddress,maxValue } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import ConfigurationRepository from '@/services/ConfigurationRepositoryAPI';
  export default {
props: ['configuration','configurations2','hl7_versions','hl7_version','clients2','alertSuccessMethod','closeDrawer','closeEditConfigurationDrawer','client','alertError'],
mixins: [validationMixin],
validations: {
configuration:{
      client_id: { required},
ip_address: { required,ipAddress},
port: { required,maxValue:maxValue(65535)},
hl7_version_id: { required}
}
},
    data: () => ({
alert: false,
alert2: false,
    }),
 computed: {
      client_idErrors () {
        const errors = []
		if (!this.$v.configuration.client_id.$dirty) return errors
        !this.$v.configuration.client_id.required && errors.push('client_id is required')
        return errors
      },
hl7_version_idErrors () {
        const errors = []
		if (!this.$v.configuration.hl7_version_id.$dirty) return errors
        !this.$v.configuration.hl7_version_id.required && errors.push('hl7_version_id is required')
        return errors
      },
      portErrors () {
        const errors = []
		if (!this.$v.configuration.port.$dirty) return errors
		!this.$v.configuration.port.maxValue && errors.push('port number must be less than 65535')
        !this.$v.configuration.port.required && errors.push('port is required.')
        return errors
      },
      ip_addressErrors () {
        const errors = []
		if (!this.$v.configuration.ip_address.$dirty) return errors
		!this.$v.configuration.ip_address.ipAddress && errors.push('invalid ipAddress')
        !this.$v.configuration.ip_address.required && errors.push('ip_address is required')
        return errors
      }},
  methods:{
closeDrawer2(){
this.closeCreateConfigurationDrawer()
},
reset(){
this.$refs.editConfigurationForm.reset()
this.$v.$reset()
},

async	saveEditedConfiguration(){
  /* eslint-disable no-console */
  console.log(this.configuration)
/* eslint-enable no-console */
this.$v.$touch()
await ConfigurationRepository.saveEditedConfiguration(this.configuration,this.configurations2).then(result => {
  /* eslint-disable no-console */
  console.log(result)
  /* eslint-disable no-console */
    this.$refs.editConfigurationForm.reset()
  this.closeEditConfigurationDrawer();
  this.$v.$reset()
  this.alertSuccessMethod()
  }).catch(error =>{
    /* eslint-disable no-console */
  console.log(error)
/* eslint-enable no-console */
this.alertError()
  })
},
     },


  }

</script>