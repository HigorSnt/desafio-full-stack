const express = require('express');

const UserController = require('./controllers/UserController');
const CompanyController = require('./controllers/CompanyController');
const UnitController = require('./controllers/UnitController');
const ActiveController = require('./controllers/ActiveController');

const routes = express.Router();

routes.post('/companies', CompanyController.store);
routes.get('/companies/:companyId', CompanyController.show);
routes.get('/companies/:companyId/employees', CompanyController.getEmployees);
routes.post('/companies/:companyId/users', UserController.store);
routes.post('/companies/:companyId/units', UnitController.store);
routes.post('/units/:unitId/actives', ActiveController.store);
routes.put('/actives/:activeId', ActiveController.update);

module.exports = routes;
