<template> 
    <auth-form action="login" v-on:process="login($event)" />
</template>

<script>
   import AuthForm from '@/forms/Auth';
 	export default {     
         name: "Login",
            components: {AuthForm}
     }
</script>