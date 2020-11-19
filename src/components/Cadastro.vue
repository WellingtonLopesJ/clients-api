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
        <v-card-title >
          <div class="success rounded">
            Cliente cadastrado com sucesso
          </div>


          <v-spacer />

          <v-icon
            aria-label="Close"
            @click="submited = false"
          >
            mdi-close
          </v-icon>
        </v-card-title>

        <v-card-text class="pb-6 pt-12 text-center">
          <v-card-subtitle >Cadastrar novo cliente ? </v-card-subtitle>

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
            @click="submited = false"
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
        <span>{{error.fieldName}}</span> — {{error.message}}"
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
                  title="Dados do cliente"
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

                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="cliente.nRegistro"
                      label="Número do registro"
                      name="nRegistro"
                      class="purple-input"
                      type="number"
                    >

                    </v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="cliente.numero"
                      label="Número"
                      name="numero"
                      class="purple-input"
                      type="number"
                    >

                    </v-text-field>
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

                  <v-col cols="12">
                    <v-text-field
                      v-model="cliente.tipoCliente"
                      label="Tipo cliente"
                      name="tipoCliente"
                      type="number"
                      class="purple-input"
                    >

                    </v-text-field>
                  </v-col>

                  </v-row>
                </base-material-card>
              </v-col>

              <v-col cols="12">
                <base-material-card
                  icon="mdi-map-marker"
                  title="Local"
                  class="px-5 py-3"
                >
                  <v-row>
                    <v-col
                      cols="12"
                      md="4"
                    >
                      <v-text-field
                        v-model="cliente.bairro"
                        label="Bairro"
                        name="bairro"
                        class="purple-input"
                      />
                    </v-col>

                    <v-col
                      cols="12"
                      md="4"
                    >
                      <v-text-field
                        v-model="cliente.cidadeId"
                        label="ID da cidade"
                        class="purple-input"
                        type="number"
                      />
                    </v-col>

                    <v-col
                      cols="12"
                      md="4"
                    >
                      <v-text-field
                        class="purple-input"
                        v-model="cliente.cep"
                        label="CEP"
                        type="number"
                      />
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="cliente.complemento"
                        label="Complemento"
                        class="purple-input"
                        name="complemento"
                      />
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="cliente.descricao"
                        label="Descrição"
                        class="purple-input"
                        name="descricao"
                      />
                    </v-col>



                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="cliente.latitude"
                        label="Latitude"
                        class="purple-input"
                        name="latitude"
                        type="number"
                      />
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="cliente.longitude"
                        label="Longitude"
                        class="purple-input"
                        name="longitude"
                        type="number"
                      />
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        v-model="cliente.logradouro"
                        label="Logradouro"
                        name="logradouro"
                        class="purple-input"
                      >

                      </v-text-field>
                    </v-col>
                  </v-row>
                </base-material-card>
              </v-col>

              <v-col cols="12">
                <base-material-card
                  icon="mdi-phone-message-outline"
                  title="Contato"
                  class="px-5 py-3"
                >
                  <v-row>
                    <v-col
                      cols="12"
                      md="4"
                    >
                      <v-text-field
                        v-model="cliente.fone1"
                        label="fone1"
                        name="fone1"
                      />
                    </v-col>

                    <v-col
                      cols="12"
                      md="4"
                    >
                      <v-text-field
                        class="purple-input"
                        v-model="cliente.fone2"
                        label="fone2"
                        name="fone2"
                      />
                    </v-col>

                    <v-col
                      cols="12"
                      md="4"
                    >
                      <v-text-field
                        v-model="cliente.fone3"
                        label="fone3"
                        name="fone3"
                        class="purple-input"
                      />
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="cliente.fone4"
                        label="fone4"
                        name="fone4"
                        class="purple-input"
                      />
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="cliente.fone5"
                        label="fone5"
                        name="fone5"
                        class="purple-input"
                      />
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
  data(){
    return{
      submited: false,
      cliente: {
        fantasia: 'Fantasia Cadastro',
        razaoSocial: 'razaoSocial Cadastro',
        tipoCliente: 1,
        nRegistro: '59967798033',
        nIm: 333,
        nIe: 999,
        latitude: 1.999,
        longitude: 2.876,
        logradouro: "logradouro",
        numero: 10,
        complemento: null,
        bairro: 'Bairro',
        cep: '9999',
        descricao: '',
        fone1: '61983830018',
        fone2: '',
        fone3: '',
        fone4: '',
        fone5: '',
       cidadeId: 4
      },
      errors: []
    }
  },
  methods: {
    submitForm(event){
      ClienteDataService.create(this.cliente)
        .then((response)=> {
          this.erros = [];
          this.submited = true
          event.target.reset();
      })
      .catch(error => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
        this.errors = error.response.data.errors

      })

    }
  },

}
</script>

<style scoped>

</style>
