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
            Cliente editado com sucesso
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
          <v-card-subtitle>Fazer mais alguma mudança ?</v-card-subtitle>

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

    <div v-for="error in errors">
      <base-material-alert
        color="error"
        dark
        dismissible
      >
        <span>{{ error.fieldName }}</span> — {{ error.message }}"
      </base-material-alert>
    </div>


    <v-row justify="center">
      <v-col
        cols="12"
        md="12"
      >

        <v-form @submit.prevent="submitForm" v-if="!submited">
          <v-container class="py-0">
            <v-row>
              <v-col cols="12">
                <base-material-card
                  icon="mdi-clipboard-text"
                  title="Editar cliente"
                  class="px-5 py-3"
                >
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="cliente.fantasia"
                        label="Fantasia"
                        name="fantasia"
                      >

                      </v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        v-model="cliente.statusComum"
                        label="Status comum"
                        name="statusComum"
                      >

                      </v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="cliente.nIe"
                        label="nIe"
                        class="purple-input"
                        name="nIe"
                      />
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="cliente.nIm"
                        label="nIm"
                        class="purple-input"
                        name="nIm"
                      />
                    </v-col>


                    <v-col
                      cols="12">
                      <v-text-field
                        v-model="cliente.razaoSocial"
                        label="Razão social"
                        name="razaoSocial"
                        class="purple-input"
                      >

                      </v-text-field>
                    </v-col>


                  </v-row>
                </base-material-card>
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
                  Enviar
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ClienteDataService from "@/services/ClienteDataService";

export default {
  name: 'Cadastro',
  data() {
    return {
      submited: false,
      cliente: {
        id: null,
        fantasia: 'Fantasia Cadastro',
        razaoSocial: 'razaoSocial Cadastro',
        nIm: null,
        nIe: null,
        statusComum: ''
      },
      errors: []
    }
  },
  methods: {
    submitForm(event) {
      ClienteDataService.update(this.cliente)
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

    getCliente() {

      ClienteDataService.find(this.$route.params)
      .then((response)=>{
          console.log(response.data)
          this.cliente.fantasia = response.data.fantasia
          this.cliente.id = response.data.id
          this.cliente.nIe = response.data.nIe
          this.cliente.nIm = response.data.nIm
          this.cliente.razaoSocial = response.data.razaoSocial
          this.cliente.statusComum = response.data.statusComum
      })
        .catch(error => {
          window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
          console.log(error)
          this.errors.push({field: 'ID', message: 'Usuário não encontrado'})
        })
    }
  },
  mounted() {
    this.getCliente()
  }

}
</script>

<style scoped>

</style>
