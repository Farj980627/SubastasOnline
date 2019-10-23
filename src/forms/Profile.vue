<template>
    <div>
      <v-jumbotron color="blue-grey lighten-1" dark height="50px"  > 
        <v-container fill-height>
          <v-layout fill-height align-center>
            <v-flex text-xs-center>
              <h3 class="display-1">
                {{ $t('profile.home') }}
              </h3>
            </v-flex>
          </v-layout>
        </v-container>
      </v-jumbotron>

      <v-container>
        <v-form  id="nativeForm" v-model="valid" >
          <v-layout row wrap>  
            <v-flex xs12 sm5>
              <v-subheader>Nombre:</v-subheader>
              <v-text-field
              prepend-icon="accessibility"  
              disabled
              :label= this.name  
              name="name"                
              />
              <v-subheader>{{$t('register.apellido')}}</v-subheader>
              <v-text-field
              prepend-icon="face"          
              :label= this.surname 
              disabled
              name="surname"                
              />
              <v-subheader>{{$t('profile.nickname2')}}</v-subheader>
              <v-text-field
              prepend-icon="child_care"          
              :label= this.nick 
              v-model= nick
              :rules = "nickRules"
              name="nickname"                
              />
              <v-subheader>{{$t('register.telefono')}}</v-subheader>
              <v-text-field
              prepend-icon="phone"          
              :label= this.phone 
              v-model= phone
              :rules= "telefonoRules"
              name="phone"                          
              />

            </v-flex>
            <v-flex xs12 sm7>
              <img  :src="this.url_img" width="400" height="400">
              <v-spacer />
     
              <v-progress-linear v-model="UploadValue"></v-progress-linear>
              <v-spacer />
              <input   type="file" @change="onFileSelected" />
              
            </v-flex>
          
          
            <v-btn @click="submit"  color="blue-grey lighten-1" dark :disabled="!valid">
              {{ $t('common.save') }}
            </v-btn>
          </v-layout>
       
          
            
        
        </v-form>
      
      </v-container>
        
    </div>
</template>

<script>
    import authModule from '@/modules/auth';
    import AppSnackBar from "@/components/snackBar";
    import {db} from '@/main';
    import firebase from 'firebase';

    export default {
        name: "profile",
        components:{authModule, AppSnackBar},
        data (){
          return  {
            valid: false,
            name: "",
            url_img: "",
            surname: "", 
            value: false,          
            nick: '',
            UploadValue:0,
          
            selectedFile: null,
            nickRules: [
              (v) => !!v || this.$t('validations.required', {field: 'Nickname'}),   
              (v) => v.length <= 16 || this.$t('validations.maxLength', {field: 'Nick', length: 16}),
            ],
            phone: '',
            telefonoRules:[
               (v) => !!v || this.$t('validations.required', {field: 'Telefono'}),
               (v) => v.length === 10 || /^[1-9]{10}$/.test(v) || this.$t('validations.telefono', {field: 'Telefono'})
            
            ],

             
          }
          
        },
        mounted() {
          db.collection('users').doc(authModule.state.user.uid).get().then(doc => {
            this.name = doc.data().name;
            this.surname = doc.data().surname;
            this.phone = doc.data().phone;
            this.url_img = doc.data().img_url;
            
            if (doc.data().nick == " "){
              
            } else {
              this.nick = doc.data().nick
            }
            

          })
        },
        methods: {
          submit () { 
                     
            db.collection('users').doc(authModule.state.user.uid).update({
              nick: this.nick,
              phone: this.phone,
              img_url: this.url_img
              }
            );
            
            this.$router.push('/').catch(err => {});            
          },
          onFileSelected(event){
            this.selectedFile= event.target.files[0];

            const storageRef = firebase.storage().ref(`/perfil/${this.selectedFile.name}`);
            const task = storageRef.put(this.selectedFile);
            task.on('state_changed', snapshot => {
              let percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
              this.UploadValue = percentage;              
            }, error=>{console.log(error.message)},
             ()=>{this.UploadValue=100;
                task.snapshot.ref.getDownloadURL().then((url)=>{                  
                  this.url_img = url;              
             });;       
             
            
          });
        }
        
    }
  }
    
</script>