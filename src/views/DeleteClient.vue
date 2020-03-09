<template>      
<v-card>
        <v-card-title class="headline">Delete client</v-card-title>

        <v-card-text>
          Permanently delete "{{client.name}}"?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="error"
            @click="deleteClient()"
          >
            Delete
          </v-btn>

          <v-btn
            color="primary"
            text
            @click="closeDialog"
          >
            cancel
          </v-btn>
        </v-card-actions>
      </v-card>
</template>
<script>
import ClientRepository from '@/services/ClientRepositoryAPI';
  export default {
props: ['client','clients2','closeDeleteDialog','alertInfo'],
    data: () => ({
alert: false,
alert2: false,
    }),
  methods:{
closeDialog(){
this.closeDeleteDialog()
},
async deleteClient(){
await ClientRepository.deleteClient(this.client.id,this.clients2).then(result=>{
  /* eslint-disable no-console */
  console.log(result)
/* eslint-enable no-console */
this.closeDeleteDialog()
this.alertInfo()
}).catch(error => {
  /* eslint-disable no-console */
  console.log(error)
/* eslint-enable no-console */
})
}
}
}
</script>