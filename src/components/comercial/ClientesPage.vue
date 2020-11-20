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
        {{$t('usuario')}} {{ $t('deletado_sucesso', {prm: 'aaaa'}) }}
      </base-material-alert>
    </div>
  <div class="d-flex">
    <v-btn
      class="ma-2"
      color="primary"
      to="clientes/cadastro"

    >
      {{$t('novo_cadastro')}}
      <v-icon
        right
        dark
      >
        mdi-plus-circle
      </v-icon>
    </v-btn>
  </div>


    <base-material-card
      icon="mdi-clipboard-text"
      :title="
      $t('listagem_clientes')"
      class="px-5 py-3"
    >


    <v-card class="pa-4" tile>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Procurar"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-row>
        <v-col cols="4" sm="3">
          <v-select
              v-model="pageSize"
              :items="pageSizes"
              label="Itens por página"
              @change="handlePageSizeChange"
          ></v-select>
        </v-col>

        <v-col cols="4" sm="3">
          <v-select
              :items="headers"
              label="Ordenar por"
              v-model="orderBy"
              @change="handleOrderByChange"
          ></v-select>
        </v-col>
        <v-col cols="4" sm="3">
          <v-select
              :items="directions"
              label="Ordenar por"
              v-model="direction"
              @change="handleDirectionChange"
          ></v-select>
        </v-col>

        <v-col cols="12" sm="9">

        </v-col>
      </v-row>

      <v-data-table
          :headers="headers"
          :items="clientes"
          disable-pagination
          :hide-default-footer="true"
          :search="search"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editCliente(item.id)">mdi-pencil</v-icon>
          <v-icon small @click="deleteCliente(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>

      <v-pagination
          v-model="page"
          :length="totalPages"
          total-visible="7"
          next-icon="mdi-menu-right"
          prev-icon="mdi-menu-left"
          @input="handlePageChange"
      ></v-pagination>
    </v-card>
    </base-material-card>

  </v-container>
</template>

<script>
import i18n from '@/i18n'
import ClienteDataService from "@/services/comercial/ClienteDataService";
export default {
  name: "ClientesPage",
  data() {
    return {
      search: "",
      isSearching: false,
      deleted: [],
      clientes: [],
      page: 1,
      totalPages: 0,
      pageSize: 16,
      pageSizes: [8, 16, 24],
      orderBy: null,
      directions: [
        {text: 'Maior para menor', value: 'ASC'},
        {text: 'Menor para maior', value: 'DESC'}
      ],
      direction: null,

      headers: [
        {text: 'ID',value: 'id', align: 'start', sortable: 'true'},
        {text: 'Fantasia', value: 'fantasia', sortable: 'false' },
        {text: 'Razão social', value: 'razaoSocial', sortable: 'false' },
        {text: 'Status Comum', value: 'statusComum', sortable: 'false' },
        {text: 'nIm', value: 'nim', sortable: 'false' },
        {text: 'nIe', value: 'nie', sortable: 'false' },
        { text: "Ações", value: "actions", sortable: false },
      ]
    }
  },

  methods: {

    getRequestParams(page, pageSize, orderBy, direction) {
      let params = {};

      if (page) {
        params["page"] = page - 1;
      }

      if (pageSize) {
        params["linesPerPage"] = pageSize;
      }

      if (orderBy) {
        params["orderBy"] = orderBy;
      }

      if (direction) {
        params["direction"] = direction;
      }

      return params;
    },

    retrieveClientes() {
      const params = this.getRequestParams(
          this.page,
          this.pageSize,
          this.orderBy,
          this.direction
      );

      ClienteDataService.getPage(params)
          .then((response) => {

            this.clientes = response.data.content;
            this.totalPages = response.data.totalPages;
            this.pageSize = response.data.size

            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
    },

    handleSearchChange(){
      if (this.search.length > 0 && !this.isSearching){
        this.isSearching = true;

        ClienteDataService.getAll()
          .then((response) => {
            this.clientes = response.data;
          })
          .catch((e) => {
            console.log(e);
          });
      }

      if (this.search.length < 1 && this.isSearching){
        this.retrieveClientes()
      }
    },

    handlePageChange(value) {
      this.page = value;
      this.retrieveClientes();
    },

    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.retrieveClientes();
    },

    handleOrderByChange(value){
      this.orderBy = value;
      this.page = 1;
      this.retrieveClientes()
    },

    handleDirectionChange(value){
      this.direction = value,
      this.retrieveClientes()
    },

    editCliente(id) {
      this.$router.push({ name: "Editar", params: { id: id } });
    },

    deleteCliente(cliente) {

      ClienteDataService.delete(cliente.id)
        .then(() => {
          this.deleted.push(cliente)
          this.retrieveClientes();
        })
        .catch((e) => {
          console.log(e);
        });
    },

  },

  mounted() {
    this.retrieveClientes();
  },

  watch:{
    search: function (){
      this.handleSearchChange()
    }
  }
}
</script>

<style scoped>

</style>
