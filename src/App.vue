<template>
  <v-app>
    <v-card class="mb-4" color="grey lighten-4" flat tile>
      <v-toolbar>
        <v-toolbar-items>
            <v-btn @click="redirect('/')" text>Головна</v-btn>
            <v-btn @click="redirect('/results')" text>Результат</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-card>
    <router-view></router-view>
  </v-app>
</template>
<script>
export default {
  name: 'Header',
    data: () => ({}),
    methods: {
        redirect(url) {
          if (this.$route.path !== url) this.$router.push(url);
        },
    }
};
</script>