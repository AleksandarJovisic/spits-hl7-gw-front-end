<template>
<div>
    <Sidebar/>
    <Navbar/>
<ClientTable/>
</div>
</template>
<script>
import ClientTable from './ClientTable';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
export default {
    data () {
      return {       
    }
  },
  components:{
  Navbar,
Sidebar,
ClientTable
  },
  }
</script>