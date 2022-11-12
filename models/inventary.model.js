import * as InventaryDao from '../dao/inventary.dao.js';

class Inventary {
  constructor(){

  }

  async getInventary(id_departamento) {
    return await InventaryDao.getInventary(id_departamento);
  }
}

export default Inventary;