<template>
  <main>
    <v-app>
      <v-content mt-5>
        <v-container>
          <guest-navigation />
            <router-view/>
        </v-container>

        <app-footer/>
      </v-content>
    
    </v-app>
  </main>
 
</template>

<script>
import GuestNavigation from '@/navigations/guest';
import AppFooter from '@/components/Footer';
export default {
  components:{
    GuestNavigation,
    AppFooter
  },
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
 
}
</style>
