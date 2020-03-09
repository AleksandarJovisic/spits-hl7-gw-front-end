<template>
<section class="login-block">
<div id="bg">
<v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex>
  <v-card class="mx-auto mt-12"
  :elevation="12"
  shaped
>
    <v-row no-gutters>
      <v-col
        cols="6"
        md="4"
      >

 <v-card	class="spacing-playground py-0 px-12"
width="100%"
height="500px"
:color="cardColor"
flat
	>

<v-card-title>
<img alt="Vue logo" src="../assets/logo1.png" class="mx-auto">
    </v-card-title>
    <v-form
      v-model="form"

    >
<br>
 <v-text-field
        v-model="username"
        label="Username"
        required
            outlined
          ></v-text-field>
<br>
 <v-text-field
        v-model="password"
        label="Password"
:type="show3 ? 'text' : 'password'"
        required
            outlined
          ></v-text-field>
<br>
    <v-alert
      dense
      outlined
      type="error"
:value="alert"
transition="scale-transition"
    >
      You have entered wrong credentials, please try again !
    </v-alert>
<br>
      <v-btn 
        color="primary"
        @click="login()"
      >
        LOGIN
      </v-btn>

    </v-form>
	</v-card>

      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="8"
      >

          <v-img
            height="100%"
            width="100%"
            src="../assets/picture1.jpg"
          ></v-img>
 
      </v-col>
    </v-row>
  </v-card>
      </v-flex>

    </v-layout>

  </v-container>

</div>
</section>
</template>
<script>
    export default {
        name: 'Login',
        data() {
            return {      
cardColor:'transparent',	
alert: false,
                    username: '',
                    password: '',
					message:''
            }
        },
        methods: {
            login() {
/* eslint-disable no-console */
console.log(this.username)
console.log(this.password)
/* eslint-enable no-console */
			if(this.username === "info@novacode.rs" && this.password === "novacode"){
			this.$router.replace({ name: "ClientDashboard" });

                }else{
				this.$router.replace({ name: "Login" });
				this.alert = true
				}
    }
	},
computed: {
      cols () {
        const { lg, sm } = this.$vuetify.breakpoint
        return lg ? [3, 9] : sm ? [9, 3] : [6, 6]
      },
    },
	}
</script>

<style scoped>
.login-block{
background: linear-gradient(to bottom, #F5F5F5, #808080); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
float:left;
width:100%;
height:100%;
}
</style>