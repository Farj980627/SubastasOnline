<template>
    <div>
      <v-toolbar app dark class="blue-grey lighten-1">
        <v-toolbar-side-icon @click="toggleDrawer" />
        <v-toolbar-title>
          <v-btn color="dark" to="/">
            Subastas Online
          </v-btn>
        </v-toolbar-title>

        <v-spacer />

        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat to="/login">{{ $t('navigation.login') }}</v-btn> <v-icon>forward</v-icon>
          <v-btn flat to="/register">{{ $t('navigation.register') }}</v-btn> <v-icon>account_circle</v-icon>
        </v-toolbar-items>

      </v-toolbar>

      

      <v-navigation-drawer
        overlay
        dark
        v-model="drawer"
        absolute
        class="blue-grey darken-1"
                
      >
      <v-list-tile avatar >
        <v-list-tile-avatar>
          <img src="@/assets/resources/sectdgo.png">
        </v-list-tile-avatar>
        <v-list-tile-content >
          <v-list-tile-content>{{ $t('guest.user') }}</v-list-tile-content>
        </v-list-tile-content>
      </v-list-tile>
        <v-list class="pt-0" dense>
          <v-divider />
          
          <v-list-tile v-for="item in items" :key="item.title" @click="$router.push(item.to)">

            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon> 
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.title }}
              </v-list-tile-title>
            </v-list-tile-content>

          </v-list-tile>

          <v-divider />

         

        </v-list>
      </v-navigation-drawer>

    </div>
</template>

<script>
  import navigationMixin from '@/mixins/navigation';
 
  
	export default {
		name: "guest",
    mixins: [navigationMixin],
    
    data () {
		  return {
		    drawer: false,
        items: [
          {title: this.$t('navigation.home'), icon: 'home', to: '/'},
          {title: this.$t('navigation.login'), icon: 'forward', to: '/login'},
          {title: this.$t('navigation.register'), icon: 'account_circle', to: '/register'},
        ]
      }
    }
	}
</script>
