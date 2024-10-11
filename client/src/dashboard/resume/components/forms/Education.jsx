import React, { useState } from "react";

const educationField = {
  universityName: "",
  degree: "",
  major: "",
  startDate: "",
  endDate: "",
  description: "",
};

const Education = ({ enabledNext }) => {
  const [educationalList, setEducationalList] = useState([educationField]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add your education</p>
    </div>
  );
};

export default Education;
