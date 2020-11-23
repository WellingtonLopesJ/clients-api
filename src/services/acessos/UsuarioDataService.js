import Axios from "axios";

class UsuarioDataService{

  getUser(){
    return Axios.get(`http://localhost:8080/usuarios/dados_Usuario`)
  }

  getPermissoes(){
    return Axios.get(`http://localhost:8080/usuarios/permissoes`)
  }

  update(params){
    return Axios.put(`http://localhost:8080/usuarios/${params.id}`,  {email: params.email})
  }

  create(params){
    return Axios.post('http://localhost:8080/usuarios', params)
  }

  getPage(params){
    return Axios.get('http://localhost:8080/usuarios/page', {params})
  }

  delete(id){
    return Axios.delete(`http://localhost:8080/usuarios/${id}`);
  }

  find(id){
    return Axios.get(`http://localhost:8080/usuarios/${id}`)
  }

  findPermissoes(){
    return Axios.get('http://localhost:8080/usuarios/permissoes')
  }

  findPerfis(){
    return Axios.get('http://localhost:8080/usuarios/perfis')
  }

}

export default new UsuarioDataService()
