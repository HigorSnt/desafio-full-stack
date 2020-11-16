import * as Actions from '../constants';

export const companyReducer = (state, action) => {
  switch (action.type) {
    case Actions.SET_COMPANY_ID:
      return { ...state, companyId: action.payload };

    case Actions.SET_UNIT_ID:
      return { ...state, unitId: action.payload };

    default:
      return state;
  }
};
