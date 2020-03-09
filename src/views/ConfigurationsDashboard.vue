<template>
<div>
    <Sidebar/>
    <Navbar/>
	<ConfigurationTable/>
</div>
</template>
<script>
import ConfigurationTable from './ConfigurationTable';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
export default {
    data () {
      return {
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' },
        ],        
    }
  },
  components:{
  Navbar,
Sidebar,
  ConfigurationTable
  },
  }
</script>