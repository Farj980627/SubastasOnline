
 <template>
 
  <div>
    
     <v-jumbotron color="blue-grey lighten-1" dark height="50px"  > 
        <v-container fill-height>
          <v-layout fill-height align-center>
            <v-flex text-xs-center>
              <h3 class="display-1">
                {{name}}
              </h3>
            </v-flex>
          </v-layout>
        </v-container>
      </v-jumbotron>

      <v-divider/>

      <v-container fill-height>
         <v-carousel delimiter-icon="stop" prev-icon="mdi-arrow-left" next-icon="mdi-arrow-right" interval=2000>
            <v-carousel-item v-for="item in imgs" :src="item" :key="item"></v-carousel-item>
          </v-carousel>
      </v-container>

      <v-divider />
      <v-jumbotron color= "blue darken-1" >
        <v-container fill-height>
          <v-layout  row wrap>
            <v-flex xs12 sm6>
              <v-card color="blue-grey darken-2" class="white--text">
                <v-card-title primary-title> 
                 <div>
                    <h3 class="headline mb-0">{{$t('products.description')}}</h3>
                    <div>{{description}}</div>
                </div>
                </v-card-title>            
              </v-card>
              <v-card color="blue-grey darken-2" class="green--text">
                <v-card-title primary-title> 
                 <div>
                    <h3 class="headline mb-0">{{$t('products.initialPrice')}}</h3>
                    <div>{{initialPrice}}</div>
                </div>
                </v-card-title>                            
              </v-card>
              <v-card color="blue-grey darken-2" class="red--text">
                <v-card-title primary-title> 
                 <div>
                    <h3 class="headline mb-0">{{$t('products.limitDate')}}</h3>
                    <div>{{limitDate}}</div>
                </div>
                </v-card-title> 
                <v-card color="blue-grey darken-2" class="red--text">
                <v-card-title primary-title> 
                 <div>
                    <h3 class="headline mb-0">{{$t('products.limitHour')}}</h3>
                    <div>{{limitHour}}</div>
                </div>
                </v-card-title>                            
              </v-card>                           
              </v-card>
            </v-flex>
            <v-flex>
              <v-btn color="primary" dark @click.native.stop="dialog = true">Make an Ofert</v-btn>
              <v-dialog v-model="dialog" max-width="320" >
                <v-jumbotron color="blue darken-1">
                  <v-flex fill-height>
                    <v-text-field v-model="ofert" name="ofert" label='Tu oferta' prepend-icon="attach_money"></v-text-field>
                    <v-btn color="primary" dark @click="insertOfert()">{{$t('common.save')}}</v-btn>


                  </v-flex>
                  
                </v-jumbotron>
              </v-dialog>
            </v-flex>
          </v-layout>
        </v-container>
      </v-jumbotron>


  </div>


</template>

<script>
  import { db } from '@/main';
  import firebase from 'firebase';
  import authModule from '@/modules/auth';
  
    
    export default {
        name: "show-product",  
        components:{authModule},
        data () {
          return {
            name: '',
            description:'',
            initialPrice: '',
            limitDate: '',
            limitHour: '',
            quality: '',
            imgs: [],
            dialog: false,
            ofert: '',
            idPrd: ''
            
            

          }
        } ,   
       
        
        mounted() {
          
          let idPrd = this.$route.params.id;
          this.idPrd = idPrd
          
          db.collection('products').doc(idPrd).get().then(doc=>{
           
          this.name = doc.data().productName;
          this.description = doc.data().description;
          this.initialPrice= doc.data().initialPrice;
          this.limitDate = doc.data().limitDate;
          this.limitHour = doc.data().limitHour;
          this.quality = doc.data().quality;          
          for (var i = 0 ; i < doc.data().urls.length; i++){
            const url = doc.data().urls[i];
            this.imgs.push(url);
          }
          
         })
         db.collection('products').doc(this.idPrd).collection('oferts').OrderByChild('ofert').limitToFirst(3).onSnapshot(snapshot => {
            console.log('sirve')
           
        })
        
         

          
          
        },
        methods: {
          insertOfert(){
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear();
            var todayHour = today.getHours();
            var todayMin = today.getMinutes();
            if (dd < 10) {
                dd ='0' +dd;
            } 
            if (mm < 10) {
                mm = '0' + mm;
            }
            today= yyyy + '-' + mm + '-' + dd
           var  todayTime = todayHour + ':' + todayMin   
            
           const data = {
             creationDate: today,
             creationHour: todayTime,
             uid: authModule.state.user.uid,
             ofert: this.ofert
           }
          db.collection('products').doc(this.idPrd).collection('oferts').add(data)
          
            this.dialog = false
          }
         
        }
    }
    
</script>
