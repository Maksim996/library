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
          <Table :data="similar" :titleFile="'Збіжності'"></Table>
        </v-card>
      </v-tab-item>
      <v-tab-item value="unique_library">
        <v-card>
          <Table :data="unique_library" :titleFile="'Унікальні_предмети_Бібліотеки'"></Table>
        </v-card>
      </v-tab-item>
       <v-tab-item value="unique_ssu">
        <v-card>
          <Table :data="unique_ssu"  :titleFile="'Унікальні_предмети_АСУ'"></Table>
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
        loading: false,
      
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
          var test1 = dataOneTable
          var test2 = dataTwoTable

          for (let i = 0; i < test1.length; i++) {
            for (let j = 0; j < test2.length; j++) {
              if(test1[i].titleSort == test2[j].titleSort && test1[i].department == test2[j].department) {
                this.similar.push({
                  index: test2[j].index,
                  // id_code: test2[j].id_code,
                  title: test2[j].title,
                  titleSort: test2[j].titleSort,
                  department: test2[j].department
                  // department: [...new Set(test1[i].department.concat(test2[j].department))]
                });
              }
            }
          }

          for (let i = 0; i < this.similar.length; i++) {
            for (let j = 0; j < test1.length; j++) {
              if(this.similar[i].titleSort == test1[j].titleSort && this.similar[i].department == test1[j].department) {
                test1.splice(j, 1);
              }
            }
            for (let k = 0; k < test2.length; k++) {
              if(this.similar[i].titleSort == test2[k].titleSort && this.similar[i].department == test2[k].department) {
                test2.splice(k, 1);
              }
            }
          }
          this.unique_library = test1;
          this.unique_ssu = test2;

        }
      },
    }
  }
</script>