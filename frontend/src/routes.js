import React, { useReducer } from 'react';
import { HashRouter, Route } from 'react-router-dom';

import CompanyContext from './contexts/CompanyContext';
import { companyReducer } from './reducers';
import ListCompanies from './pages/ListCompanies';
import RegisterCompany from './pages/RegisterCompany';
import CompanyView from './pages/CompanyView';
import UnitView from './pages/UnitView';
import NewActive from './pages/NewActive';

function Routes() {
  const stateInitial = { companyId: '', unitId: '' };
  const [state, dispatch] = useReducer(companyReducer, stateInitial);

  return (
    <CompanyContext.Provider value={{ state, dispatch }}>
      <HashRouter basename="/">
        <Route path="/" exact component={ListCompanies} />
        <Route path="/register" component={RegisterCompany} />
        <Route path="/company" exact component={CompanyView} />
        <Route path="/company/unit" exact component={UnitView} />
        <Route path="/company/unit/active" exact component={NewActive} />
      </HashRouter>
    </CompanyContext.Provider>
  );
}

export default Routes;
