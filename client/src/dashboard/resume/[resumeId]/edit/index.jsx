import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../../components/FormSection";
import ResumeReview from "../../components/ResumeReview";

const EditResume = () => {
  const params = useParams();

  useEffect(() => {
    console.log(params, "params");
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
      {/* Form Section */}
      <FormSection />
      {/* Preview Section */}
      <ResumeReview />
    </div>
  );
};

export default EditResume;
