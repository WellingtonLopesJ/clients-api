import Axios from "axios";

class ClienteDataService{

  getAll(){
    return Axios.get('http://localhost:8080/clientes');
  }

  getPage(params){
    return Axios.get('http://localhost:8080/clientes/page', {params})
  }

  create(params){
    return Axios.post('http://localhost:8080/clientes', params)
  }

  update(params){
    return Axios.put('http://localhost:8080/clientes/' + (params.id), {fantasia: params.fantasia, razaoSocial: params.razaoSocial})
  }

  find(id){
    const url = 'http://localhost:8080/clientes/' + (id.id)
    return Axios.get(url)
  }

  delete(id){
    return Axios.delete(`http://localhost:8080/clientes/${id}`);
  }

  getUser(){
    return Axios.get(`http://localhost:8080/usuarios/1`)
  }

  getPermissoes(){
    return Axios.get(`http://localhost:8080/usuarios/permissoes`)
  }
}

export default new ClienteDataService()
