<template>      
<v-card>
        <v-card-title class="headline">Delete client</v-card-title>
        <v-card-text>
          Permanently delete configuration for {{configuration.client_name}}?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="error"
            @click="deleteConfiguration()"
          >
            Delete
          </v-btn>

          <v-btn
            color="primary"
            text
            @click="closeDeleteDialog"
          >
            cancel
          </v-btn>
        </v-card-actions>
      </v-card>
</template>
<script>
import ConfigurationRepository from '@/services/ConfigurationRepositoryAPI';
  export default {
props: ['configuration','configurations2','closeDeleteDialog','alertInfo'],
    data: () => ({
    }),
  methods:{
async deleteConfiguration(){
  /* eslint-disable no-console */
  console.log(this.configuration.id)
/* eslint-enable no-console */
await ConfigurationRepository.deleteConfiguration(this.configuration.id,this.configurations2).then(result=>{
  /* eslint-disable no-console */
  console.log(result)
/* eslint-enable no-console */
this.closeDeleteDialog()
this.alertInfo()
this.configuration=''
}).catch(error => {
  /* eslint-disable no-console */
  console.log(error)
/* eslint-enable no-console */
})
}
}
}
</script>