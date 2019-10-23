 <template>
    <div>
        <v-container fluid grid-list-md>
             <v-form id="nativeForm" v-model="valid" >
                <v-layout row wrap>  
                    <v-flex xs12 sm8>    
                        <v-text-field
                            prepend-icon="shop_two"          
                            :label="$t('productTemplate.prdName')"
                            name="productName" 
                            v-model = "productName"               
                        />
                    </v-flex>
                    <v-flex xs12 sm4>
                        <v-text-field
                            prepend-icon="monetization_on"          
                            :label="$t('productTemplate.prdPrice')"
                            name="initialPrice"   
                            v-model="initialPrice"             
                        />
                    </v-flex >
            
                    <v-flex xs12 sm8>
                        <v-text-field
                            prepend-icon="description"          
                            :label="$t('productTemplate.prdDesc')"
                            name="description"  
                            v-model="description"              
                        />
                    </v-flex>
                    
                    <v-flex xs12 sm4>
                        
                        <v-select
                            :items = "Types"
                            label =  " Tipo de Subasta: " 
                            single-line
                            prepend-icon="merge_type"
                            v-model="types" >                        
                        </v-select>
                    </v-flex>
                    <v-flex xs12 sm4>
                        <v-subheader>{{$t('productTemplate.prdLimDate')}}</v-subheader>
                        <v-date-picker color="indigo" locale="es-mx" v-model="limitDate"></v-date-picker> 
                    </v-flex> 
                    <v-flex xs12 sm4>
                        <v-select
                            :items = "counter"
                            label= "Condiciones del producto"
                            single-line
                            prepend-icon="wallpaper"
                            v-model="quality" > 
                       </v-select>
                    </v-flex>
                    <v-flex xs12 sm4>
                        <v-subheader>{{$t('productTemplate.prdLimHour')}}</v-subheader>
                        <v-time-picker color="indigo" v-model="limitHour"></v-time-picker>
                    </v-flex>
                   
                    <v-flex xs12 sm12>
                        <v-subheader>Subir Imagenes</v-subheader>
                        <input type="file" multiple id="files" @change="selectedFiles"/>
                    </v-flex>
                    <v-flex xs12 sm12>
                        <v-carousel delimiter-icon="stop" prev-icon="mdi-arrow-left" next-icon="mdi-arrow-right">
                            <v-carousel-item v-for="(item,i) in urls" :src="item" :key="i"></v-carousel-item>
                        </v-carousel>
                    </v-flex>
                   

                    <v-flex xs12 sm12>
                          <v-btn @click="submit"  color="blue-grey lighten-1" dark :disabled="!valid">
                            {{ $t('common.save') }}
                          </v-btn> 
                    </v-flex>               
                   
              </v-layout>
             </v-form>
        </v-container>
    </div>
        

</template>

<script>
    import AppSnackBar from "@/components/SnackBar";    
    import * as faker from 'faker';
    import authModule from '@/modules/auth';
    import {db} from '@/main';
    import { setTimeout } from 'timers';
    import firebase from 'firebase';

    export default {
        name: "post-product",
        components: {authModule, AppSnackBar},
        data() {
            return {
                valid: false,
                alert:true,
                productName: ' ',
                initialPrice: ' ',
                description: ' ',
                types: null,
                limitDate: null,
                limitHour: null,
                quality: null,
                Types: ['Subasta Cerrada', 'Subasta Abierta'],
                counter: ['1','2','3','4','5','6','7','8','9','10'],
                snackBar: false,
                message: '',
                timeout: 5000,
                urls: [],
                selectedFile: null
                
            }
        },
        methods: {
            submit() {
                var id = faker.random.alphaNumeric(10);
                const data = {
                    productName: this.productName,
                    initialPrice : this.initialPrice,
                    description : this.description,
                    type: this.types,
                    limitDate: this.limitDate,
                    limitHour: this.limitHour,
                    quality:this.quality,
                    uid: authModule.state.user.uid,
                    urls: this.urls,
                   
                    pid: id
                };
                db.collection('products').doc(id).set(data).then(() =>{
                    
                   
                    this.$router.push('/');

                }).catch((error) => {
                    this.message = error.message.substr(0, 500);
                    this.snackBar = true;
                    setTimeout(() => {
                    this.snackBar = false;
                    }, this.timeout);
                })


            },
            selectedFiles(event){
              
                for (var i = 0; i < event.target.files.length; i++){
                    this.selectedFile= event.target.files[i]
                    const storageRef = firebase.storage().ref(`/products/${this.selectedFile.name}`);
                    const task = storageRef.put(this.selectedFile);
                    task.on('state_changed', snapshot => {                                   
                    }, error=>{console.log(error.message)},
                    ()=>{
                          task.snapshot.ref.getDownloadURL().then((url)=>{                
                             
                          const img = url;                            
                          this.urls.push(img)  
                              
                        });;     
                        
                      
                        });
                }          
          


            }
        },
    }
    
</script>