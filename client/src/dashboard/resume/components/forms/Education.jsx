import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../service/GlobalApi.js";
import { toast } from "sonner";

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
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const handleChange = (e, index) => {
    const newEntries = educationalList.slice();
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);
  };

  const AddNewEducation = () => {
    setEducationalList([...educationalList, educationField]);
  };

  const RemoveNewEducation = () => {
    setEducationalList((educationalList) => educationalList.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        Education: educationalList,
      },
    };

    GlobalApi.UpdateResumeDetail(params.resumeId, data).then(
      (resp) => {
        console.log(resp);
        setLoading(false);
        toast("Details updated!");
      },
      (error) => {
        setLoading(false);
        toast("Server Error please try again!");
      }
    );
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationalList,
    });
  }, [educationalList]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add your education</p>
      <div>
        {educationalList &&
          educationalList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div className="col-span-2">
                  <label>University Name</label>
                  <Input
                    name="universityName"
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div>
                  <label>Degree</label>
                  <Input
                    name="degree"
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div>
                  <label>Major</label>
                  <Input
                    name="major"
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div>
                  <label>Start Date</label>
                  <Input
                    name="startDate"
                    type="date"
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div>
                  <label>End Date</label>
                  <Input
                    name="endDate"
                    type="date"
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div>
                  <label>Description</label>
                  <Textarea
                    name="description"
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button onClick={RemoveNewEducation}>- Remove</Button>
          <Button
            onClick={AddNewEducation}
            variant="outline"
            className="text-primary"
          >
            + Add More
          </Button>
        </div>

        <Button onClick={onSave}>Save</Button>
      </div>
    </div>
  );
};

export default Education;
