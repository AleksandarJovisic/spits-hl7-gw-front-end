<template>
<div>
    <Sidebar/>
    <Navbar/>
<InventoryTable/>
</div>
</template>
<script>
import InventoryTable from './InventoryTable';
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
InventoryTable
  },
  }
</script>