<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="pa-2">
          <v-file-input 
            type="file" 
            @change="readFileLibrary($event)" 
            multiple 
            label="Файл Бібліотеки"
          >
          </v-file-input>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="pa-2">
          <v-file-input 
            @change="readFileASU($event)" 
            multiple 
            label="Файл АСУ"
          ></v-file-input>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0">
        <v-btn  large color="success" @click="compare()">Порівняти</v-btn>
      </v-col>
    </v-row>
    <v-row>
    <v-col lg="12" md="12" sm="12" xs="12">
      <v-tabs 
        grow 
        color="primary"
        v-model="tab"
      >
      <v-tab href="#one_table">
        Бібліотека
      </v-tab>
      <v-tab href="#two_table">
        АСУ
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item value="one_table">
        <v-card>
          <Table :data="one_table" :loading="loading"></Table>
        </v-card>
      </v-tab-item>
      <v-tab-item value="two_table">
        <v-card>
          <Table :data="two_table" :loading="loading"></Table>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    </v-col>
    </v-row>
    <v-card-text class="py-2 text-center">
      СтудЦІТ
    </v-card-text>
  </v-container>
</template>

<script>
import XLSX from 'xlsx';
import Table from '../components/Table.vue';
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: "Home",
  data() {
    return {
      tab: null,
      one_table: [],
      two_table: [],
      loading: false
    }
  },
  components: {
    Table
  },
  created() {
    this.initialize();
  },
  computed: {
    ...mapGetters(["getOneTable", "getTwoTable"])
  },
  methods: {
    ...mapMutations(["setOneTable", "setTwoTable"]),
    
    initialize () {
      this.one_table = this.getOneTable;
      this.two_table = this.getTwoTable;
    },
    
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
        if(event[0].name.match(/xls/) == null) {
          this.$swal({
            icon: 'error',
            title: 'Помилка',
            text: 'Невірний формат файлу. Підтримуються формати: .xls, xslx'
          })
          return;
        }
        this.loading = true;
        let data = await this.readFileAsync(event[0]);
        this.one_table = await data.map((item, index) => {
          return {
            index: index+1,
            // id_code: item["Шифр"],
            title: item["Назва"],
            department: item["Кафедра"] ? "Кафедра "+item["Кафедра"].toLowerCase() : "",
            titleSort: item["Назва"].toLowerCase().replace(/ +/g, ' ').trim()
          }
        });
        this.loading = false;
      }
    },

    async readFileASU(event) {
      if(event[0]) {
        if(event[0].name.match(/csv/) == null) {
          this.$swal({
            icon: 'error',
            title: 'Помилка',
            text: 'Невірний формат файлу. Підтримуються формати: .csv'
          })
          return;
        }
        this.loading = true;
        let data = await this.readFileAsync(event[0]);
        this.two_table = await data.map((item, index) => {
          return {
            index: index+1,
            // id_code: item["KOD_DISC"],
            title: item["NAME_DISC"],
            department: item["NAME_DIV"],
            titleSort: item["NAME_DISC"].toLowerCase().replace(/ +/g, ' ').trim()
          }
        })
        this.loading = false;
      }
    },
    
    compare() {
      this.setOneTable(this.one_table);
      this.setTwoTable(this.two_table);
      this.$router.push("/results");
    }
  }
};
</script>