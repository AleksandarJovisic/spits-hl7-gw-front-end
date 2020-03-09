<template>
<v-navigation-drawer
      app
clipped
:color="color"
    >
      <v-list dense>
          <v-list-item
            v-for="link in links"
            :key="link.title"
            router :to="link.route"
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ link.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>
<script>
export default {
    data () {
      return {
        links: [
          { title: 'Home', icon: 'mdi-home', route: '/Home' },
          { title: 'Clients', icon: 'mdi-account', route: '/ClientDashboard' },
{ title: 'Configurations', icon: 'mdi-settings', route: '/ConfigurationsDashboard' },
{ title: 'Medicines', icon: 'mdi-pill', route: '/MedicineDashboard' },
{ title: 'Inventory', icon: 'mdi-factory', route: '/InventoryDashboard' },
        ],
        color: 'grey lighten-4',
        colors: [
          'primary',
          'blue',
          'success',
          'red',
          'teal',
        ],
        right: true,
        background: false,
      }
    },
    computed: {
      bg () {
        return this.background ? 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg' : undefined
      },
    },
  }
</script>
<style>
</style>