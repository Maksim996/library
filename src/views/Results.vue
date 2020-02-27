<template>
  <v-container class="grey lighten-5">
    <v-row 
      no-gutters
    >
    <v-col lg="12" md="12" sm="12" xs="12">
      <v-tabs 
        fixed-tabs
        background-color="indigo"
        dark
        v-model="tab"
      >
      <v-tab href="#one_table">
        1 table
      </v-tab>
      <v-tab href="#two_table">
       2 table
      </v-tab>
      <v-tab href="#three_table">
       2 table
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item value="one_table">
        <v-card>
          <Table :data="one_table"></Table>
        </v-card>
      </v-tab-item>
      <v-tab-item value="two_table">
        <v-card>
          <Table :data="two_table"></Table>
        </v-card>
      </v-tab-item>
       <v-tab-item value="three_table">
        <v-card>
          <Table :data="three_table"></Table>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Table from '../components/Table.vue'
  export default {

    data () {
      return {
        tab: null,

        one_table: [],
        two_table: [],
        three_table: [],
      }
    },
    components : {
      Table,
    },
    created() {
      this.compareSort();
    },
    methods: {
      compareSort (){
        var array1 = JSON.parse(sessionStorage.getItem('one_table'));
        var array2 = JSON.parse(sessionStorage.getItem('two_table'));
        for ( let i = 0; i < array1.length; i++){
          for (let j = 0; j < array2.length; j++ ){
            if(array1[i].title === array2[j].title ){
                this.one_table.push(array2[j]);
                array1.splice(i,1);
                array2.splice(j,1);
                break;
            }
          }
        };
        this.two_table = array1
        this.three_table = array2
      },
    }

  }
</script>
