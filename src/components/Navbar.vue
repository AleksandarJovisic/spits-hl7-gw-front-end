<template>
<v-app-bar
clipped-left
      app
      color="blue-grey lighten-5"
light
    >
      <v-toolbar-title>
<img alt="Vue logo" src="../assets/logo1.png">
</v-toolbar-title>

    </v-app-bar>
</template>
<script>
  export default {
    data: () => ({
      items: [
        {
          text: 'Home',
          disabled: false,
          route: '/',
        },
        {
          text: 'Link 1',
          disabled: true,
        
        },
        {
          text: 'Link 2',
          disabled: true,
         
        },
      ],
    }),
  }
</script>