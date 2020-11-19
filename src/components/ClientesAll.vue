
<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >

    <base-material-card
      icon="mdi-clipboard-text"
      title="Listagem de clientes"
      class="px-5 py-3"
    >
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Procurar"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="clientes"
          :search="search"
        ></v-data-table>
      </v-card>
    </base-material-card>

  </v-container>
</template>


<script>
import ClienteDataService from "@/services/ClienteDataService";
export default {
name: "ClientesAll",
  data(){
  return{
    clientes: [],
    headers: [
      {text: 'ID',value: 'id', align: 'start', sortable: 'true'},
      {text: 'Fantasia', value: 'fantasia', sortable: 'false' },
      {text: 'Razão social', value: 'razaoSocial', sortable: 'false' },
      {text: 'Status Comum', value: 'statusComum', sortable: 'false' },
      {text: 'nIm', value: 'nim', sortable: 'false' },
      {text: 'nIe', value: 'nie', sortable: 'false' },
    ],
    search: ""
  }
  },
  methods: {
    retrieveClientes() {
      ClienteDataService.getAll()
          .then((response) => {
            this.clientes = response.data;
          })
          .catch((e) => {
            console.log(e);
          });
    },
  },
  mounted() {
  this.retrieveClientes()
  }
}
</script>

<style scoped>

</style>
