<template>
    <div>
      <v-toolbar app dark class="blue-grey lighten-1" @click="getInfo">
        <v-toolbar-side-icon @click="toggleDrawer" />
        <v-toolbar-title>
          <v-btn color="dark" to="/">
            Subastas Online
          </v-btn>
        </v-toolbar-title>

        <v-spacer />

        <v-toolbar-items class="hidden-sm-and-down">
             <v-btn flat @click="logout">{{ $t('navigation.logout') }}</v-btn>
        </v-toolbar-items>

      </v-toolbar>

      

      <v-navigation-drawer
        overlay
        dark
        v-model="drawer"
        absolute
        class="blue-grey darken-1"
           
      >
      <v-list-tile avatar @click="profile">
        <v-list-tile-avatar >
          <img :src= this.img_url>
        </v-list-tile-avatar>
        <v-list-tile-content >
          <v-list-tile-content> {{this.nombreFire}} </v-list-tile-content>
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

            <v-list-tile @click="toggleDrawer" >
              <v-list-tile-action>
                <v-icon>arrow_back</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ $t('navigation.close_menu') }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-divider />

            <v-list-tile @click="logout">
              <v-list-tile-action>
                <v-icon>clear</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ $t('navigation.logout') }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

        </v-list>
      </v-navigation-drawer>

    </div>
</template>

<script>
  import navigationMixin from '@/mixins/navigation';
  import {db} from '@/main';
  import AppSnackBar from '@/components/SnackBar';
  import authModule from '@/modules/auth';
  import AuthForm from '@/forms/Auth';
  
  
  
	export default {
		name: "customer-navigation",
    mixins: [navigationMixin],
    components:{AppSnackBar, authModule,AuthForm},
  
    data () {
		  return {
        drawer: false,
        
        items: [
          { title: this.$t('navigation.home'), icon: 'home', to: '/' },
         
        ],
        img_url: "" ,
        nombreFire: "",
      }
    },
    methods: {
      getInfo(){    
        
        db.collection('users').doc(authModule.state.user.uid).get().then(doc => {        
          this.img_url = doc.data().img_url
          this.nombreFire = doc.data().name
          
        })   

      }
    }

    
	}
</script>
