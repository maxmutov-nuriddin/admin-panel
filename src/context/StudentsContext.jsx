/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

export const StudentsFetchContext = createContext();

export const StudentsContext = ({ children }) => {
  const [values, setValues] = useState([]);

  const state = { values, setValues };


  return (
    <StudentsFetchContext.Provider value={state}>
      {children}
    </StudentsFetchContext.Provider>
  );
};
