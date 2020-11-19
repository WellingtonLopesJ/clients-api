
<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <div v-for="cliente in deleted" class="flex justify-center align-center">
      <base-material-alert
        color="success"
        dark
        dismissible
        style="max-width: 300px"
      >
        Usuário {{cliente.fantasia}} deletado com sucesso
      </base-material-alert>
    </div>


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
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editCliente(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="deleteCliente(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
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
    deleted: [],
    clientes: [],
    headers: [
      {text: 'ID',value: 'id', align: 'start', sortable: 'true'},
      {text: 'Fantasia', value: 'fantasia', sortable: 'false' },
      {text: 'Razão social', value: 'razaoSocial', sortable: 'false' },
      {text: 'Status Comum', value: 'statusComum', sortable: 'false' },
      {text: 'nIm', value: 'nim', sortable: 'false' },
      {text: 'nIe', value: 'nie', sortable: 'false' },
      { text: "Ações", value: "actions", sortable: false },
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

    editCliente(id) {
      this.$router.push({ name: "Editar", params: { id: id } });
    },

    deleteCliente(cliente) {
      this.deleted.push(cliente)
      ClienteDataService.delete(cliente.id)
        .then(() => {
          this.retrieveClientes();
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
