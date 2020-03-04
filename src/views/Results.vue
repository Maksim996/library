<template>
  <v-container>

   
    <v-row>
    <v-col lg="12" md="12" sm="12" xs="12">
      <v-tabs  grow v-model="tab"
      >
      <v-tab href="#one_table">
        Збіжності
      </v-tab>
      <v-tab href="#two_table">
       Унікальні предмети Бібліотеки 
      </v-tab>
      <v-tab href="#three_table">
       Унікальні предмети АСУ
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item value="one_table">
        <v-card>
          <Table :data="one_table"></Table>
          <v-row >
            <v-btn 
              :disabled="one_table.length == 0 && loading" 
              :loading="loading"
              small 
              @click="downloadFile(one_table)"
              >
              Завантажити
            </v-btn>
          </v-row>
        </v-card>
      </v-tab-item>
      <v-tab-item value="two_table">
        <v-card>
          <Table :data="two_table"></Table>
          <v-row >
            <v-btn 
              :disabled="two_table.length == 0" 
              :loading="loading"
              small 
              @click="downloadFile(two_table) && loading"
            >
              Завантажити
            </v-btn>
          </v-row>
        </v-card>
      </v-tab-item>
       <v-tab-item value="three_table">
        <v-card>
          <Table :data="three_table"></Table>
          <v-row >
            <v-btn 
              :disabled="three_table.length == 0 && loading" 
              :loading="loading"
              small 
              @click="downloadFile(three_table)"
            >
              Завантажити
            </v-btn>
          </v-row>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    </v-col>
    </v-row>
  </v-container>
</template>

<script>
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Table from '../components/Table.vue'
  export default {
    data () {
      return {
        tab: null,
        one_table: [],
        two_table: [],
        three_table: [],
        loading: false,
      
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
        if(array1 && array2) {
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
        }
      },
      downloadFile( data) {
          let initArr = [];
          initArr.push(["Шифр", "Назва", "Розділ", "Характеристики", "ББК", "УДК"]);
          data.map(item => {
            var resItem = [];
            resItem.push(item.id_code == "" ? "" : item.id_code, item.title)
            return resItem;
          }).map(item => initArr.push(item));

          var wb = XLSX.utils.book_new();
          wb.SheetNames.push("Повні збіжності");
          var ws_data = initArr.map(e => e);
          var ws = XLSX.utils.aoa_to_sheet(ws_data);
          wb.Sheets["Повні збіжності"] = ws;
          var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
          saveAs(new Blob([this.s2ab(wbout)],{type:"application/octet-stream"}), 'result.xlsx')
      },
      s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
      },
    
    }
  }
</script>