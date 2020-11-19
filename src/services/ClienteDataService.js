import Axios from "axios";

class ClienteDataService{

  getAll(){
    return Axios.get('http://localhost:8080/clientes');
  }

  getPage(params){
    console.log(params)
    return Axios.get('http://localhost:8080/clientes/page', {params})
  }

  create(params){
    console.log(params)
    return Axios.post('http://localhost:8080/clientes', params)
  }

}

export default new ClienteDataService()
