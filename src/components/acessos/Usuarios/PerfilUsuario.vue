<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-dialog
      v-model="submited"
      max-width="500"
    >
      <v-card>
        <v-card-title>
          <div class="success rounded">
            {{ $t('usuario') }} {{ $t('editado_sucesso') }}
          </div>


          <v-spacer/>

          <v-icon
            aria-label="Close"
            @click="submited = false"
          >
            mdi-close
          </v-icon>
        </v-card-title>

        <v-card-text class="pb-6 pt-12 text-center">
          <v-card-subtitle>{{ $t('fazer_mais') }}</v-card-subtitle>

          <v-btn
            class="mr-3"
            text
            to="/clientes"
          >
            Não
          </v-btn>

          <v-btn
            color="success"
            text
            @click="submited = false; this.getCliente"
          >
            Sim
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <div v-for="error in errors">
          <base-material-alert
            color="error"
            dark
            dismissible
          >
            <span>{{ error.fieldName }}</span> — {{ error.message }}"
          </base-material-alert>
        </div>

        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              {{$t('informacoes')}}  {{$t('pessoais')}}
            </div>

            <div class="subtitle-1 font-weight-light">
              {{$t('editar')}}
            </div>
          </template>

          <v-form @submit.prevent="submitForm">
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    label="Email"
                    class="purple-input"
                    v-model="usuario.email"
                  />
                </v-col>


                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mr-0"
                    type="submit"
                  >
                    Atualizar
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>

          <base-material-card
            color="warning"
            class=""
          >
            <template v-slot:heading>
              <div class="display-2 font-weight-light">
                {{$t('inquilino')}}
              </div>

              <div class="subtitle-1 font-weight-light">
                {{inquilino.fantasia}} - {{inquilino.razaoSocial}}
              </div>
            </template>
            <v-card-text>
              <v-data-table
                :headers="inquilinoHeaders"
                :items="inquilinos"
                disable-pagination
                :hide-default-footer="true"
              />
            </v-card-text>
          </base-material-card>

      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <base-material-card
          class="v-card-profile"
          avatar="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
        >
          <v-card-text class="text-center">
            <h6 class="display-1 mb-1 grey--text d-flex justify-center">
              <div v-for="perfil in usuario.perfis" :key="perfil.id">
                <span class="pr-3">
                  {{ perfil.descricao }}
                </span>
              </div>
            </h6>

            <h4 class="display-2 font-weight-light mb-3 black--text">
              {{usuario.nome}}
            </h4>



          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ClienteDataService from "@/services/comercial/ClienteDataService";
import UsuarioDataService from "@/services/acessos/UsuarioDataService";

export default {
  name: "Perfil",
  data(){
    return{
      submited: false,
      errors: [],
      usuario: this.$store.state.user,
      inquilinos: [this.$store.state.inquilino],
      inquilino: this.$store.state.inquilino,
      inquilinoHeaders:
        [
          {text: 'ID',value: 'id', align: 'start', sortable: 'false'},
          {text: 'Fantasia', value: 'fantasia', sortable: 'false' },
          {text: 'Razão social', value: 'razaoSocial', sortable: 'false' },
          {text: 'Tipo', value: 'tipo', sortable: 'false' },
          {text: 'Status', value: 'status', sortable: 'false' },
          {text: 'Tipo contratação', value: 'tipoContratacao', sortable: 'false' },
          {text: 'Número de registro', value: 'nRegistro', sortable: 'false' },

        ]
    }
  },
  methods: {
    submitForm(event) {
      UsuarioDataService.update(this.usuario)
        .then((response) => {
          this.errors = [];
          this.submited = true
        })
        .catch(error => {
          console.log(error)
          this.errors = error.response.data.errors
          window.scrollTo({top: 0, left: 0, behavior: 'smooth'})

        })

    },
  }
}
</script>

<style scoped>

</style>
