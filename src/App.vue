<template>
    
    <v-content>
      <HelloWorld />
        <div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/results">Результат</router-link>
        </div>
      <router-view />
    
    </v-content>
  
</template>

<script>
import HelloWorld from "./components/HelloWorld";
// import { saveAs } from 'file-saver';

export default {
  name: "App",

  components: {
    HelloWorld
  },

  data: () => ({
    //
  })
};
</script>
