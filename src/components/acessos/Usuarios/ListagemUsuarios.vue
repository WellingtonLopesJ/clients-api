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
        {{$t('usuario')}} {{ cliente.fantasia }} {{$t('deletado_sucesso')}}}
      </base-material-alert>
    </div>
    <div class="d-flex">
      <v-btn
        class="ma-2"
        color="primary"
        to="usuarios/cadastro"

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
      :title="$t('listagem_usuarios')"
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
          :items="usuarios"
          disable-pagination
          :hide-default-footer="true"
          :search="search"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editUsuario(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="deleteUsuario(item)">mdi-delete</v-icon>
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
import UsuarioDataService from "@/services/acessos/UsuarioDataService";
export default {
  name: "ListagemUsuarios",
  data() {
    return {
      search: "",
      isSearching: false,
      deleted: [],
      usuarios: [],
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
        {text: 'Nome', value: 'nome', sortable: 'false' },
        {text: 'Email', value: 'email', sortable: 'false' },
        {text: 'Inquilino', value: 'inquilino.fantasia', sortable: 'false' },
        {text: 'Data de inclusão', value: 'inquilino.dtInclusao', sortable: 'false' },
        {text: 'Última alteração', value: 'inquilino.dtAlteracao', sortable: 'false' },
        {text: "Ações", value: "actions", sortable: false },
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

    retrieveData() {
      const params = this.getRequestParams(
        this.page,
        this.pageSize,
        this.orderBy,
        this.direction
      );

      UsuarioDataService.getPage(params)
        .then((response) => {

          this.usuarios = response.data.content;
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

        UsuarioDataService.getAll()
          .then((response) => {
            this.usuarios = response.data;
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
      this.retrieveData();
    },

    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.retrieveData();
    },

    handleOrderByChange(value){
      this.orderBy = value;
      this.page = 1;
      this.retrieveData()
    },

    handleDirectionChange(value){
      this.direction = value,
        this.retrieveData()
    },

    editUsuario(id) {
      this.$router.push({ name: "editar.usuario", params: { id: id } });
    },

    deleteUsuario(cliente) {

      UsuarioDataService.delete(cliente.id)
        .then(() => {
          this.deleted.push(cliente)
          this.retrieveData();
        })
        .catch((e) => {
          console.log(e);
        });
    },

  },

  mounted() {
    this.retrieveData();
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
