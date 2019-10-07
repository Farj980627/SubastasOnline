<template>
  <div>
    <auth-form
        action="register"
        v-on:process="register($event)"
      />
    <app-snack-bar
        v-if="snackBar"
        :snack-bar="snackBar"
        :text="message"
        :timeout="timeout"
      />
  </div>
 


</template>

<script>
	import AppSnackBar from "@/components/SnackBar";
  import AuthForm from '@/forms/Auth';
  import {db} from '@/main';
  import { setTimeout } from 'timers';
 	export default {
     name: "Register",
   
     components: {AuthForm, AppSnackBar},
     data () {
		  return {
		    snackBar: false,
        message: '',
        timeout: 5000
      }
    },
    methods: {
      
		  register (user) {
        
		    this.$store.dispatch('firebaseRegister', user)
          .then((userRegistered) => {              
            const data = {
              email: user.email, 
              name:user.nombre,
              surname: user.apellido,
              phone: user.telefono,
              img_url: "",
              nick: user.nickname,                          
              role: 'customer'

            };
            
            db.collection('users').doc(userRegistered.user.uid).set(data).then(() => {
              this.$store.commit('setRole', data.role);
              this.$router.push('/');
            });
          })
          .catch((error) => {
            this.message = error.message.substr(0, 500);
            this.snackBar = true;
            setTimeout(() => {
              this.snackBar = false;
            }, this.timeout);
          })
      }
    }

   }
</script>