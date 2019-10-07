<template>
  <main>
    <v-app>
      <v-content mt-5 v-if="$store.state.loaded">
        <v-container>
          <guest-navigation v-if="role === 'guest'" />
          <customer-navigation v-if="role === 'customer'" />
            <router-view/>
        </v-container>

        <app-footer/>
      </v-content>

      <v-container v-else fill-height>
        <v-layout flex align-center fill-height>
          <v-progress-circular indeterminate :size="100" :width="10" color="purple" />
        </v-layout>
      </v-container>
    
    </v-app>
  </main>
 
</template>

<script>
import GuestNavigation from '@/navigations/guest';
import CustomerNavigation from '@/navigations/customer';
import AppFooter from '@/components/Footer';
import {mapGetters} from 'vuex';
export default {
  components:{
    GuestNavigation,
    CustomerNavigation,
    AppFooter
  },
  name: 'App',
  computed: {
    ...mapGetters(['role'])
  }
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
