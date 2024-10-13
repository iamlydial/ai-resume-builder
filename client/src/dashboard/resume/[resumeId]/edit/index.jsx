import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../../components/FormSection";
import ResumeReview from "../../components/ResumeReview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import dummy from "@/data/dummy";

const EditResume = () => {
  const params = useParams();
  const [resumeInfo, setResumeInfo] = useState();

  useEffect(() => {
    setResumeInfo(dummy);
  }, []);

  const GetResumeINfo = () =>{
    
  }

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        {/* Form Section */}
        <FormSection />
        {/* Preview Section */}
        <ResumeReview />
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default EditResume;
