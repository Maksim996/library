<template>
  <v-container>
    <v-row>
    <v-col lg="12" md="12" sm="12" xs="12">
      <v-tabs grow v-model="tab">
      <v-tab href="#similar">
        Збіжності
      </v-tab>
      <v-tab href="#unique_library">
        Унікальні предмети Бібліотеки 
      </v-tab>
      <v-tab href="#unique_ssu">
        Унікальні предмети АСУ
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item value="similar">
        <v-card>
           <v-row>
            <v-col class="col-12 d-flex justify-center">
              <v-btn 
                :disabled="loading || similar.length == 0" 
                :loading="loading"
                color="success"
                class="white--text"
                large
                @click="downloadFile(similar, 'Збіжності')"
                >
                  Зберегти
                <v-icon right dark>save</v-icon>
              </v-btn>
            </v-col> 
          </v-row>
          <Table :data="similar"></Table>
        </v-card>
      </v-tab-item>
      <v-tab-item value="unique_library">
        <v-card>
          <v-row>
            <v-col class="col-12 d-flex justify-center">
              <v-btn 
                :disabled=" loading || unique_library.length == 0" 
                :loading="loading"
                color="success"
                class="white--text"
                large
                @click="downloadFile(unique_library, 'Унікальні_предмети_Бібліотеки') && loading"
              >
                Зберегти
                <v-icon right dark>save</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <Table :data="unique_library"></Table>
        </v-card>
      </v-tab-item>
       <v-tab-item value="unique_ssu">
        <v-card>
          <v-row>
            <v-col class="col-12 d-flex justify-center">
              <v-btn 
              :disabled=" loading || unique_ssu.length == 0" 
              :loading="loading"
              color="success"
              class="white--text"
              large
              @click="downloadFile(unique_ssu, 'Унікальні_предмети_АСУ')"
              >
                Зберегти
                <v-icon right dark>save</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <Table :data="unique_ssu"></Table>
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
  import { saveAs } from 'file-saver';
  import Table from '../components/Table.vue';
  import { mapGetters } from 'vuex';

  export default {
    data () {
      return {
        tab: null,
        similar: [],
        unique_library: [],
        unique_ssu: [],
        loading: false
      }
    },
    components: {
      Table
    },
    created() {
      this.compareSort();
    },
    methods: {
      ...mapGetters(["getOneTable", "getTwoTable"]),

      compareSort() {
        var dataOneTable = this.getOneTable().slice();
        var dataTwoTable = this.getTwoTable().slice();
        
        if(dataOneTable && dataTwoTable) {
          for (let i = 0; i < dataOneTable.length; i++) {
            for (let j = 0; j < dataTwoTable.length; j++) {
              if(dataOneTable[i].titleSort == dataTwoTable[j].titleSort) {
                this.similar.push(dataTwoTable[j]);
              }
            }
          }

          for (let i = 0; i < this.similar.length; i++) {
            for (let j = 0; j < dataOneTable.length; j++) {
              if(this.similar[i].titleSort == dataOneTable[j].titleSort) {
                dataOneTable.splice(j, 1);
              }
            }
            for (let k = 0; k < dataTwoTable.length; k++) {
              if(this.similar[i].titleSort == dataTwoTable[k].titleSort) {
                dataTwoTable.splice(k, 1);
              }
            }
          }

          this.unique_library = dataOneTable;
          this.unique_ssu = dataTwoTable;
        }
      },
      downloadFile(data, titleFile) {
        this.loading = true;
        let initArr = [];
        initArr.push(["Шифр", "Назва", "Розділ", "Характеристики", "ББК", "УДК"]);
        data.map(item => {
          var resItem = [];
          resItem.push(item.id_code == "" ? "" : item.id_code, item.title, item.department)
          return resItem;
        }).map(item => initArr.push(item));

        var wb = XLSX.utils.book_new();
        wb.SheetNames.push(titleFile);
        var ws_data = initArr.map(e => e);
        var ws = XLSX.utils.aoa_to_sheet(ws_data);
        wb.Sheets[titleFile] = ws;
        var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
        saveAs(new Blob([this.s2ab(wbout)],{type:"application/octet-stream"}), titleFile+'.xlsx');
        setTimeout(()=>{this.loading = false}, 1000);
      },
      s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
      }
    }
  }
</script>