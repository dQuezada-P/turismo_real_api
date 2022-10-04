import { getCantDepartments } from "../dao/estadisticDao.js";
export const countDepartments = async (req, res) => {
    try {
        const cant_departments = await getCantDepartments();
        res.json(cant_departments);
    } catch (error) {
      console.error(error);
    }
  };