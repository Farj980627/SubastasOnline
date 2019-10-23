<template> 

    <v-container fill-height>
      <v-carousel  delimiter-icon="stop">
        <v-carousel-item v-for="(item,i) in items" :src="item.src" :key="i"></v-carousel-item>
      </v-carousel>

    </v-container>
    
   


</template>

<script>
 	export default {
          data () {
      return {
        items: [
          {
            src: require ("@/assets/resources/01.jpg")
           
          },
          {
            src: require ("@/assets/resources/02.jpeg")
          },
          {
            src: require ("@/assets/resources/03.jpg")
          },
          {
            src: require ("@/assets/resources/04.jpg")
          }
        ]
      }
    }
     }
</script>