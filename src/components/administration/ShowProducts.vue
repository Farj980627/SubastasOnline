
 <template>
   <v-layout wrap row >
    <v-flex xs12 sm6   v-for="product in products" :key="product.id" >
      <v-card>
        <v-card-media :src="product.src" :key="product.nombre" height="200px">
        </v-card-media>
        <v-card-title primary-title>
         
          <v-spacer/>
          <v-chip label color="pink" text-color="white">
              {{product.nombre}}
          </v-chip>         
          <v-btn color="green" dark @click="seePrd(product.id)"  >
                 Ver
          </v-btn>
        </v-card-title>
        
      </v-card>
    </v-flex>
  </v-layout>

</template>

<script>
    import { db } from '@/main';
    import { mapGetters } from 'vuex';
    

    export default {
        name: "show-products",        
        data () {
            return{
                products: []
               
                
            
                
            }
        },
        methods:{
          
          seePrd(valId){
                  
            
             this.$router.push({name: 'ShowProduct', params: { id: valId}});

          }

        },
        mounted() {                   
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
           
            db.collection('products').where("limitDate",">=", today).onSnapshot(snapshot => {

                for (var i =0 ; i < snapshot.docs.length; i++){                   
                    db.collection('products').doc(snapshot.docs[i].id).get().then(doc => {
                        var url;
                        var prdName;  
                        var id;
                                           
                        if (doc.data().limitDate == today && doc.data().limitHour < todayTime){  
                      } else {
                        url = doc.data().urls[0];
                        prdName = doc.data().productName;
                        id = doc.data().pid;
                        const datos = {
                           src: url,
                           nombre: prdName,
                           id: id
                        }                       
                                                 
                          this.products.push(datos)                                    
                         
                      }                      
                                                  

                    })                 

              }
              
            
                               
                            
            
          }, (error) => {
            console.log('listener products pagination off...');
          }          );
          
        
        },
       
        
       

        
        
            
        
    }

    
</script>

