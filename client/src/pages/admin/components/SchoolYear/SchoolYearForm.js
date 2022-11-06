import React from "react";
import { useEffect, useState } from "react";
import SchoolYearTable from "./SchoolYearTable";
const SchoolYearForm = () => {
  const [isFormOpen, setIsFormOpen] = useState(true);
  return <>{!isFormOpen ? <SchoolYearTable /> : <>asda</>}</>;
};

export default SchoolYearForm;
