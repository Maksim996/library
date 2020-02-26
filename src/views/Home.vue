<template>

  <v-container class="grey lighten-5">
    <v-row 
      class='mb-6'
      no-gutters
    >
      <v-col>
        <v-card
          class="pa-2"
          outlined
          tile
        >
          <v-file-input type="file" @change="readFileLibrary($event)" multiple label="File input"></v-file-input>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="pa-2"
          outlined
          tile
        >
          <v-file-input @change="readFileASU($event)" multiple label="File input"></v-file-input>
        </v-card>
      </v-col>
    </v-row>
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
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item value="one_table">
        <v-card>
          <v-btn small @click="deleteDuplicate(one_table)">Видалення дублікатів</v-btn>
          <Table :data="one_table"></Table>
        </v-card>
      </v-tab-item>
      <v-tab-item value="two_table">
        <v-card>
          <v-btn small @click="deleteDuplicate(two_table)">Видалення дублікатів</v-btn>
          <Table :data="two_table"></Table>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    </v-col>
    </v-row>
  </v-container>

</template>

<script>
// @ is an alias to /src
import XLSX from 'xlsx';
import Table from '../components/Table.vue';

export default {
  name: "Home",
  data() {
    return {
      tab: null,
      one_table: [],
      two_table: []
    }
  },
  components: {
    Table
  },
  methods: {
    readFileAsync(file) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.onload = (e) => {
                var data = e.target.result;
                var workbook = XLSX.read(data, {
                    type: 'binary',
                    codepage: 1251
                });
                workbook.SheetNames.forEach(function(sheetName) {
                    resolve(XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]));
                })
            };
            reader.onerror = reject;
            reader.readAsBinaryString(file);
        })
    },

    async readFileLibrary(event) {
      if(event[0]) {
        let data = await this.readFileAsync(event[0]);
        this.one_table = await data.map((item, index) => {
          return {
            index,
            id_code: item["Шифр"],
            title: item["Назва"]
          }
        })
        console.log(this.one_table)
      }
    },

    async readFileASU(event) {
      if(event[0]) {
        let data = await this.readFileAsync(event[0]);
        this.two_table = await data.map((item, index) => {
          return {
            index,
            id_code: item["Шифр спеціальності"],
            title: item["Дисципліна"]
          }
        })
        console.log(this.two_table)
      }
    },
  },

  deleteDuplicate(array) {
    array.filter((item, index) => {
      array.indexOf()
    })
  }
};
</script>
