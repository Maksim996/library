<template>
    <v-data-table
        :headers="headers"
        :loading="loading"
        :loading-text="loading ? 'Завантаження' : ''"
        :items="data"
        class="elevation-1"
    >

        <template v-slot:item.action="{ item }">
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
</template>

<script>
export default {
    props: {
        data: Array
    },
    data: () => ({
        loading: false,
        headers: [
        {
            text: '№',
            value: 'index',
            width: "10px",
            sortable: false,
        },
        {
            text: 'ID',
            value: 'id_code',
            width: "10px",
            sortable: false,
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
        edit() {

        },
        deleteItem() {
            
        }
    }
}
</script>