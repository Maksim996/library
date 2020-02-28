<template>
    <v-app>
      <v-content>
          <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/results">Результат</router-link>
          </div>
        <router-view />
      
      </v-content>
    </v-app>
</template>

<script>
// import { saveAs } from 'file-saver';

export default {
  name: "App",
  data: () => ({
    //
  })
};
</script>
