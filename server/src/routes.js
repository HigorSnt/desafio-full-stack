const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const UserController = require('./controllers/UserController');
const CompanyController = require('./controllers/CompanyController');
const UnitController = require('./controllers/UnitController');
const ActiveController = require('./controllers/ActiveController');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/companies', CompanyController.store);
routes.get('/companies', CompanyController.index);
routes.get('/companies/:companyId', CompanyController.show);
routes.get('/companies/:companyId/employees', CompanyController.getEmployees);
routes.post('/companies/:companyId/users', UserController.store);
routes.post('/companies/:companyId/units', UnitController.store);
routes.get('/units/:unitId', UnitController.show);
routes.post(
  '/units/:unitId/actives',
  upload.single('image'),
  ActiveController.store
);
routes.put('/actives/:activeId', ActiveController.update);

module.exports = routes;
