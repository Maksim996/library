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
            :items="data"
            :search="search"
            class="elevation-1"
        >
        
            <template v-slot:item.action="{ item }" v-if='$route.path =="/"'>
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
            </template>
            <template v-slot:no-data>
                Дані відсутні
            </template>
        </v-data-table>
    </div>
</template>

<script>
export default {
    props: {
        data: Array,
        loading: Boolean,
    },
    data: () => ({
        dialog: false,  
        search: '',
        editIndex: null,
        modalData: {
          title: ''
        },
        headers: [
        {
            text: '№',
            value: 'index',
            width: "10px",
        },
        {
            text: 'ID',
            value: 'id_code',
            width: "10px",
        },
        {
            text: 'Назва',
            align: 'left',
            value: 'title',
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
        }
    }
}
</script>