<template>
  <v-app>
    <v-card class="mb-4" color="grey lighten-4" flat tile>
      <v-toolbar>
        <v-toolbar-items>
           
              <v-btn to="/" text color="primary">Головна</v-btn>
              <v-btn to="/results" text color="primary" >Результат</v-btn>

        </v-toolbar-items>
      </v-toolbar>
    </v-card>
    <router-view></router-view>
  </v-app>
</template>
<script>
export default {
  name: 'Header',
    data() {
      return {
      }
    }
};
</script>
