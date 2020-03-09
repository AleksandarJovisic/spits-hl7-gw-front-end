<template>
<div>
    <Sidebar/>
    <Navbar/>
	<MedicineTable/>
</div>
</template>
<script>
import MedicineTable from './MedicineTable';
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
  MedicineTable
  },
  }
</script>