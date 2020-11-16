import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tractian-challenge-fullstack.herokuapp.com',
});

export const getAllCompanies = async () => {
  let response = await api.get('/companies');
  return response.data;
};

export const registerCompany = async (company) => {
  return await api.post('/companies', company);
};

export const registerUnit = async (companyId, unit) => {
  return await api.post(`/companies/${companyId}/units`, unit);
};

export const getCompany = async (companyId) => {
  let response = await api.get(`/companies/${companyId}`);

  return response.data;
};

export const getUnit = async (unitId) => {
  let response = await api.get(`/units/${unitId}`);

  return response.data;
};

export const getEmployees = async (companyId) => {
  let response = await api.get(`/companies/${companyId}/employees`);

  return response.data;
};

export const createActive = async (unitId, active) => {
  return await api.post(`/units/${unitId}/actives`, active);
};
