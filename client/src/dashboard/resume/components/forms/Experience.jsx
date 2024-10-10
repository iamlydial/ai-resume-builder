import React, { useState } from "react";

const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummary: "",
};

const Experience = ({ enabledNext }) => {
  const [experienceList, setExperienceList] = useState([{formField}]);

  return <div>Experience</div>;
};

export default Experience;
