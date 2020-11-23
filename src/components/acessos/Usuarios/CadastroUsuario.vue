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
            {{ $t('cadastrado_sucesso') }}
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
          <v-card-subtitle >{{ $t('cadastrar_novo_usuario?') }}</v-card-subtitle>

          <v-btn
            class="mr-3"
            text
            to="/usuarios"
          >
            {{ $t('nao') }}
          </v-btn>

          <v-btn
            color="success"
            text
            @click="submited = false"
          >
            {{ $t('sim') }}
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
                  :title="$t('Dados_do_usuario')"
                  class="px-5 py-3"
                >
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="recurso.nome"
                        :label="$t('Nome')"
                        name="nome"
                      >

                      </v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                    >
                      <v-text-field
                        v-model="recurso.email"
                        label="Email"
                        class="purple-input"
                        name="email"
                      />
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="recurso.senha"
                        :label="$t('senha')"
                        class="purple-input"
                        name="senha"
                        type="password"
                      />
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="recurso.senhaConfirma"
                        :label="$t('confirme_a_senha')"
                        class="purple-input"
                        name="senha"
                        type="password"
                      />
                    </v-col>

                    <v-col cols="12">
                      <v-combobox
                        v-model="perfisSelecionados"
                        :items="todosPerfisDescricao"
                        :label="$t('Perfis_do_usuario')"
                        multiple
                        chips
                      ></v-combobox>
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
                  {{ $t('Enviar') }}
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
import UsuarioDataService from "@/services/acessos/UsuarioDataService";
const DataService = UsuarioDataService;

export default {
  name: 'CadastroUsuario',
  data(){
    return{
      submited: false,
      recurso: {
        nome: '',
        email: '',
        senha: '',
        senhaConfirma: '',
        inquilino: this.$store.state.inquilino,
        perfis: []
      },
      todosPerfisDescricao: [],
      perfisSelecionados:[],
      todosPerfis: [],
      errors: []
    }
  },
  methods: {
    submitForm(event){

      if (!this.senhaCoincide()){
        return
      }

      this.ConvertePerfis();

      console.log(this.recurso)

     DataService.create(this.recurso)
        .then((response)=> {
          this.erros = [];
          this.submited = true
          event.target.reset();
        })
        .catch(error => {
          window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
          console.log(error)
          this.errors = error.response.data.errors

        })

    },

    senhaCoincide(){
      if (this.recurso.senha !== this.recurso.senhaConfirma){
        this.errors.push({field: this.$t('senha'), message: this.$t('senhas_nao_conferem')})
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
        return false
      }
      return true
    },

    findPerfis(){

      DataService.findPerfis().then((response)=>{
        //Pego so as descrições de cada permissão
        //Ao enviar form envia os obj perfil que tem descrição entre as selecionadas
        const perfis = response.data
        this.todosPerfis = response.data;

        perfis.forEach((value)=> {
          this.todosPerfisDescricao.push(value.descricao)
        })

      })
        .catch(error => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
        console.log(error)

      })
    },

    ConvertePerfis(){

      this.todosPerfis.forEach((perfil => {
        this.todosPerfisDescricao.forEach((descricao) => {

          if (descricao == perfil.descricao){
            this.recurso.perfis.push(perfil)
          }
        })
      }))

    }
  },
  mounted() {
    this.findPerfis()
  }
}
</script>

<style scoped>

</style>
