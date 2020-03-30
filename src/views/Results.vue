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

      deleteDuplicated(table) {
        var result = [];
        for(let i = 0; i < table.length; i++) {
          if(!result.find(x => x.titleSort == table[i].titleSort)) {
            result.push({
              index: i+1,
              id_code: table[i].id_code,
              title: table[i].title,
              titleSort: table[i].titleSort,
              department: [table[i].department]
            })
          } else {
            result[result.indexOf(result.find(x => x.titleSort == table[i].titleSort))].department.push(table[i].department)
          }
        }
        return result;
      },

      compareSort() {
        var dataOneTable = this.getOneTable().slice();
        var dataTwoTable = this.getTwoTable().slice();

        if(dataOneTable && dataTwoTable) {
          var test1 = this.deleteDuplicated(dataOneTable)
          var test2 = this.deleteDuplicated(dataTwoTable)

          for (let i = 0; i < test1.length; i++) {
            for (let j = 0; j < test2.length; j++) {
              if(test1[i].title == test2[j].title) {
                this.similar.push({
                  index: test2[j].index,
                  id_code: test2[j].id_code,
                  title: test2[j].title,
                  titleSort: test2[j].titleSort,
                  department: [...new Set(test1[i].department.concat(test2[j].department))]
                });
              }
            }
          }

          for (let i = 0; i < this.similar.length; i++) {
            for (let j = 0; j < test1.length; j++) {
              if(this.similar[i].titleSort == test1[j].titleSort) {
                test1.splice(j, 1);
              }
            }
            for (let k = 0; k < test2.length; k++) {
              if(this.similar[i].titleSort == test2[k].titleSort) {
                test2.splice(k, 1);
              }
            }
          }
          this.unique_library = test1;
          this.unique_ssu = test2;
        }
      },
      downloadFile(data, titleFile) {
        this.loading = true;
        let initArr = [];
        initArr.push(["Шифр", "Назва", "Розділ", "Характеристики", "ББК", "УДК"]);
        data.map(item => {
          var resItem = [];
          resItem.push(item.id_code ? item.id_code : "", item.title, [...new Set(item.department)].join(", "))
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