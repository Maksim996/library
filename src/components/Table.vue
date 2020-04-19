<template>
    <div>
        <v-dialog v-model="dialog" persistent max-width="600px" >
            <v-card>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Назва" v-model="modalData.title"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">Закрити</v-btn>
                    <v-btn color="blue darken-1" text @click="saveEdit">Зберегти</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-row>
            <v-col class="col-12 d-flex justify-center">
              <v-btn
                v-if="this.$route.name==='results'"
                :disabled="loadingBtn || items.length == 0"
                :loading="loadingBtn"
                color="success"
                class="white--text"
                large
                @click="downloadFile()"
                >
               
                  Зберегти
                <v-icon right dark>save</v-icon>
              </v-btn>
            </v-col>
        </v-row>
        <v-autocomplete
              v-model="selectedDepartments"
              :items="departments"
              filled
              chips
              background-color="#ffffff"
              label="Укажить кафедри"
              item-text="name"
              item-value="name"
              multiple
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  @click="data.select"
                  @click:close="removeDepartment( data.item)"
                >
                  {{ data.item }}
                </v-chip>
              </template>
            </v-autocomplete>
        <v-text-field
            v-model="search"
            clearable
            flat
            hide-details
            color="primary"
            prepend-inner-icon="search"
            label="Пошук"
            class="mb-3 mx-3"
        ></v-text-field>

        <v-data-table
            :headers="headers"
            :loading="loading"
            :loading-text="loading ? 'Завантаження' : ''"
            :items="items"
            :search="search"
            class="elevation-1"
        >
            <template v-slot:body="{ items }">
                <tbody>
                <tr v-for="item in items" :key="item.name">
                    <td>{{ item.index }}</td>
                    <!-- <td>{{ item.id_code }}</td> -->
                    <td>{{ item.title }}</td>
                    <td  v-if="Array.isArray(item.department)">
                        <ul>
                            <li v-for="(department, index) in item.department" v-if="department !== ''" :key="index">
                                {{ department !=='' ? department : '' }}
                            </li>
                        </ul>
                    </td>
                    <td v-else>
                        {{ item.department }}
                    </td>
                    <td>
                        <div v-if='$route.path =="/"'>
                            <v-tooltip top>
                                <template v-slot:activator="{ on }">
                                    <v-icon small class="mx-2" @click="edit(item)" v-on="on">edit</v-icon>
                                </template>
                                <span>Редагувати</span>
                            </v-tooltip>

                            <v-tooltip top>
                                <template v-slot:activator="{ on }">
                                    <v-icon small @click="deleteItem(item)" v-on="on">delete</v-icon>
                                </template>
                                <span>Видалити</span>
                            </v-tooltip>
                        </div>
                    </td>
                </tr>
                </tbody>
            </template>

            <template v-slot:no-data>
                Дані відсутні
            </template>
        </v-data-table>
    </div>
</template>

<script>
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default {
    props: {
        data: Array,
        titleFile: '',
        loading: Boolean,
    },
    data: () => ({
        selectedDepartments: null,
        departments: [],
        items: [],
        dialog: false,  
        search: '',
        editIndex: null,
        loadingBtn: false,
        modalData: {
          title: ''
        },
        headers: [
        {
            text: '№',
            value: 'index',
            width: "10px",
        },
        // {
        //     text: 'ID',
        //     value: 'id_code',
        //     width: "10px",
        // },
        {
            text: 'Назва',
            align: 'left',
            value: 'title',
            width: "50%",
        },
        {
            text: 'Кафедра',
            align: 'left',
            value: 'department',
            width: "40%",
        },
        {
            text: '',
            value: 'action',
            sortable: false,
            width: "150px",
            align: 'right',
        },
        ],
    }),
    mounted(){
        this.items = this.data;
    },
    created() {
        this.departments = this.getUniqueDepartment(this.data);
    },
    watch: {
        data() {
            this.items = this.data;
        },
        selectedDepartments() {
            this.items = this.data

            let items = this.items,
                selectedDepartments = this.selectedDepartments,
                newArray = [];
            for( let i = 0; i < items.length; i++ ){
                if( selectedDepartments.length > 1){
                    for(let j = 0; j < selectedDepartments.length; j++){
                        if( items[i].department === selectedDepartments[j]){
                           newArray.push(items[i]);
                        }
                    }
                } 
                else if ( selectedDepartments.length === 1) {
                    if( items[i].department === selectedDepartments[0]){
                        newArray.push(items[i]);
                    }
                } 
                else if(selectedDepartments.length === 0) {
                    newArray = this.data
                }
                
            }
            this.items = newArray
          
          // let departments = this.selectedDepartments
            // console.log(departments);
            // let ar = this.similar.filter(similar => similar.department == this.departments_similar );
            // let ar = this.items.filter(function (item){
            // console.log(departments.length);
            // if(departments.length < 1){
                // return  item.department == departments
            // }
           
        }
    },
    computed: {
       
    },
    methods: {

        edit(item) {
            Object.assign(this.modalData, item);
            this.editIndex = this.data.indexOf(item);
            this.dialog = true;
        },
        deleteItem (item) {
            const index = this.data.indexOf(item)
            this.$swal({
                title: 'Бажаєте видалити?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Так',
                cancelButtonText: "Закрити",
            }).then((result) => {
                if (result.value) {
                this.data.splice(index, 1);
                this.$swal.fire({
                    icon: 'success',
                    title: 'Видалено',
                    showConfirmButton: false,
                    timer: 1500
                })
                }
            })
        },

        saveEdit() {
            this.data[this.editIndex].title = this.modalData.title;
            this.data[this.editIndex].titleSort = this.modalData.title.toUpperCase().replace(/ +/g, ' ').trim();
            this.dialog = false;
        },

        getUniqueDepartment( array ) {
            return [...new Set(array.map(item => item.department))];
        },

        removeDepartment (name) {
            const index = this.selectedDepartments.indexOf(name)
            if (index >= 0) this.selectedDepartments.splice(index, 1)
            this.items = this.data;
        },

        downloadFile() {
            this.loadingBtn = true;
            let data = this.items,
                titleFile = this.titleFile,
                initArr = [];
            
            initArr.push(["Шифр", "Назва", "Кафедра", "Характеристики", "ББК", "УДК"]);
            data.map(item => {
            var resItem = [];
            resItem.push(item.id_code ? item.id_code : "", item.title, item.department)
            return resItem;
            }).map(item => initArr.push(item));

            var wb = XLSX.utils.book_new();
            wb.SheetNames.push(titleFile);
            var ws_data = initArr.map(e => e);
            var ws = XLSX.utils.aoa_to_sheet(ws_data);
            wb.Sheets[titleFile] = ws;
            var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
            saveAs(new Blob([this.s2ab(wbout)],{type:"application/octet-stream"}), titleFile+'.xlsx');
            setTimeout(()=>{this.loadingBtn = false}, 1000);
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