<template>
<v-container
    class="spacing-playground py-0 px-2"
    fluid
  >
<br>
    <v-form
:model="configuration"
      ref="addConfigurationForm"
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
:error-messages="hl7_version_idErrors"
required
@input="$v.configuration.hl7_version_id.$touch()"
@blur="$v.configuration.hl7_version_id.$touch()"
label="HL7 version"
></v-select>

<br>
<v-btn color="primary" dark @click="saveCreatedConfiguration()">save new configuration</v-btn>
<v-btn class="spacing-playground py-0 px-2" text @click="closeDrawer2()">cancel</v-btn>
    </v-form>
</v-container>
</template>
<script>
import { required,ipAddress,maxValue,numeric } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import ConfigurationRepository from '@/services/ConfigurationRepositoryAPI';
  export default {
props: ['configuration','configurations2','hl7_versions','hl7_version','clients2','alertSuccessMethod','closeDrawer','closeCreateConfigurationDrawer'],
mixins: [validationMixin],
validations: {
configuration:{
      client_id: { required},
ip_address: { required,ipAddress},
port: { required,maxValue:maxValue(65535),numeric},
hl7_version_id: { required}
}
},
	data: () => ({
alert: false,
alert2: false,
client_id: '',
ip_address:'',
port: '',
hl7_version_id:'',

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
		!this.$v.configuration.port.numeric && errors.push('invalid port, must be a number')
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
      },
    },
  methods:{
closeDrawer2(){
this.closeCreateConfigurationDrawer()
},

async	saveCreatedConfiguration(){
  /* eslint-disable no-console */
  console.log(this.configuration)
/* eslint-enable no-console */
this.$v.$touch()
  await  ConfigurationRepository.createConfiguration(this.configuration,this.configurations2).then(result=>{
  /* eslint-disable no-console */
  console.log(result)
this.$refs.addConfigurationForm.reset()
this.$v.$reset()
this.closeCreateConfigurationDrawer()
this.alertSuccessMethod()
/* eslint-enable no-console */
  }).catch(error => {
  /* eslint-disable no-console */
  console.log(error)
/* eslint-enable no-console */
  })
     },
},
  }

</script>