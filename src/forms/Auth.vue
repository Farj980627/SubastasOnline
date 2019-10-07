<template>
    <div class="fill-height pt-2 ">
      <v-jumbotron color="blue-grey lighten-1" dark height="50px"  > 
        <v-container fill-height>
          <v-layout fill-height align-center>
            <v-flex text-xs-center>
              <h3 class="display-1">
                {{ $t(`${action}.title`) }}
              </h3>
            </v-flex>
          </v-layout>
        </v-container>
      </v-jumbotron>

    <v-container >
      <v-form id="nativeForm" v-model="valid" >
        
        <v-text-field
          prepend-icon="accessibility"
          v-if="action === 'register'"
          :label="$t(`${action}.nombre`)"  
          v-model="name"
          :rules = "nameRules"
          name="name"                
        />
        
        <v-text-field
          prepend-icon="face"
          v-if="action === 'register'"
          :label="$t(`${action}.apellido`)"  
          v-model="surname"
          :rules = "surnameRules"
          name="surname"    
                    
        />
        <v-text-field
          prepend-icon="child_care"
          v-if="action === 'register'"
          :label="$t('profile.nickname')"  
          v-model="nick"
          :rules = "nickRules"
          name="nickname"    
                    
        />
        <v-text-field
          prepend-icon="phone"
          v-if="action === 'register'"
          :label="$t(`${action}.telefono`)"  
          v-model="phone"
          :rules= "telefonoRules"
          name="phone"                
        />

         <v-text-field
          prepend-icon="email"
          autocomplete="off"
          :label="$t('auth.email')"
          v-model="email"
          :rules="emailRules"
          name="email"
        />

        <v-text-field   
          prepend-icon="looks_6"       
          :label="$t('auth.password')"
          v-model="password"
          :rules="passwordRules"
          name="password"
          type="password"
        />

        <v-text-field
          prepend-icon="looks_6"
          v-if="action === 'register'"
          :label="$t('auth.password_confirmation')"
          v-model="password_confirmation"
          :rules="passwordConfirmationRules"
          name="password_confirmation"
          type="password"
        />
        
        <v-divider />
        
        <br>

        <v-btn @click="submit"  color="blue-grey lighten-1" dark :disabled="!valid">
          {{ $t(`${action}.submit`) }}
        </v-btn>
      
        <br>
        <div class="bt-0"> 
        <!-- Boton de registro con google -->
          <img src="../assets/signinGoogle.png"   @click="submitGoogle" >
          <v-spacer />
          
          <!-- Boton de registro con face -->
          <v-btn @click="submitFacebook">FACEBOOK</v-btn>
        </div>

    <v-spacer/>


      </v-form>
          </v-container>

    </div>
</template>

<script>
  import firebase from 'firebase';
  import AppSnackBar from "@/components/snackBar";
  import AuthForm from "@/forms/Auth";
  import {db} from '@/main';
  import { setTimeout } from 'timers';

 	export default {
 
         name: "auth-form",
         
          props: {
            action: ''
          },
         data () {
           
		    return {
		    valid: false,
        email: '',
        emailRules: [
          (v) => !!v || this.$t('validations.required', {field: 'E-mail'}),
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || this.$t('validations.email', {field: 'E-mail'})
        ],
        password: '',
        passwordRules: [
          (v) => !!v || this.$t('validations.required', {field: 'Password'}),
          (v) => v.length >= 6 || this.$t('validations.minLength', {field: 'Password', length: 6})
        ],
        password_confirmation: '',
        passwordConfirmationRules: [
          (v) => !!v || this.$t('validations.required', {field: 'Password'}),
          (v) => v.length >= 6 || this.$t('validations.minLength', {field: 'Password', length: 6}),
          (v) => v === this.password || this.$t('validations.password_confirmation'),
        ],
        phone: '',
        telefonoRules:[
          (v) => !!v || this.$t('validations.required', {field: 'Telefono'}),
          (v) => v.length === 10 || /^[1-9]{10}$/.test(v) || this.$t('validations.telefono', {field: 'Telefono'})

        ],
        name: '',
        nameRules:[
          (v) => !!v || this.$t('validations.required', {field: 'nombre'}),   
        ],
        surname: '',
        surnameRules:[
          (v) => !!v || this.$t('validations.required', {field: 'apellido'}),   
            ] ,
        nick: '',
        nickRules: [
          (v) => !!v || this.$t('validations.required', {field: 'Nickname'}),   
            (v) => v.length <= 16 || this.$t('validations.maxLength', {field: 'Nick', length: 16}),
        ],
        snackBar: false,
        message: '',
        timeout: 5000 ,
        
        
        }

    },
    methods: {
      //Metodo de registro con google
      submitGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then((result) => {          
           const data = {                           
              uid: result.user.uid,
              email: result.additionalUserInfo.profile.email,
              name: result.additionalUserInfo.profile.given_name,
              surname: result.additionalUserInfo.profile.family_name, 
              img_url: result.additionalUserInfo.profile.picture,
              nick: " ",
              phone: " ",
              role: 'customer'
            }; 
                               
           db.collection('users').doc(data.uid).onSnapshot(snapshot => {
                if (snapshot.exists == false) {                    
                db.collection('users').doc(result.user.uid).set(data).then(() => {
               
                this.$router.push('/administration/AdminProfile').catch(err => {});
              })
              } else {
                this.$router.push('/').catch(err => {});
               
              };                 
            })      
        })
        .catch((error) => {
            this.message = error.message.substr(0, 60);
            this.snackBar = true;
            setTimeout(() => {
              this.snackBar = false;
            }, this.timeout);         
        });
        
      },
      submitFacebook() {        
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then((result) => {          
           const data = {                           
              uid: result.user.uid,
              email: result.additionalUserInfo.profile.email,
              name: result.additionalUserInfo.profile.first_name,
              surname: result.additionalUserInfo.profile.middle_name, 
              img_url: result.additionalUserInfo.profile.picture.data.url,
              nick: " ",
              phone: " ",
              role: 'customer'
            };                  
            
            db.collection('users').doc(data.uid).onSnapshot(snapshot => {
              
                if (snapshot.exists == false) {                    
                db.collection('users').doc(result.user.uid).set(data).then(() => {
                
                this.$router.push('/administration/AdminProfile').catch(err => {});
              })
              } else {
                this.$router.push('/').catch(err => {});
                
              }; 
                
            }) 
            
                  
        })
         .catch((error) => {
            this.message = error.message.substr(0, 60);
            this.snackBar = true;
            setTimeout(() => {
              this.snackBar = false;
            }, this.timeout);         
        });
        
      },
       submit () {
        this.$emit('process', {email: this.email, password: this.password, nombre: this.name, apellido: this.surname, telefono: this.phone, nickname: this.nick });
        
      }
      
    }
    
    
    
  }
</script>