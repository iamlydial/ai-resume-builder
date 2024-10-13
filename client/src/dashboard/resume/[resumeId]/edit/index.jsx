import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../../components/FormSection";
import ResumeReview from "../../components/ResumeReview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../../service/GlobalApi.js";

const EditResume = () => {
  const { resumeId } = useParams();
  console.log("params from Edit Resume" + resumeId);
  const [resumeInfo, setResumeInfo] = useState();

  useEffect(() => {
    console.log("Fetching resume with ID:", resumeId); // Add this for debugging
    if (resumeId) {
      GetResumeInfo();
    } else {
      console.error("No resumeId provided");
    }
  }, [resumeId]); // Add resumeId as a dependency

  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId)
      .then((resp) => {
        console.log(resp.data.data); // Logs the API response data
        setResumeInfo(resp.data.data); // Updates the state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching resume info:", error);
      });
  };

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
