import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import RichTextEditor from "../RichTextEditor";

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
  const [experienceList, setExperienceList] = useState([{ formField }]);

  const handleChange = (index, event) => {};

  const AddNewExperince = () => {
    setExperienceList([...experienceList, formField]);
  };

  const RemoveExperience = () => {
    setExperienceList((experienceList) => experienceList.slice(0, -1));
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Professional Experience</h2>
      <p>Add your previous job experience</p>
      <div>
        {experienceList &&
          experienceList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs ">Position Title</label>
                  <Input
                    name="title"
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-xs ">Company Name</label>
                  <Input
                    name="companyName"
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-xs ">City</label>
                  <Input
                    name="city"
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-xs ">State</label>
                  <Input
                    name="state"
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-xs ">Start Date</label>
                  <Input
                    type="date"
                    name="startDate"
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-xs ">End Date</label>
                  <Input
                    type="date"
                    name="endDate"
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div className="col-span-2">
                  <RichTextEditor />
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button onClick={RemoveExperience}>- Remove</Button>
          <Button
            onClick={AddNewExperince}
            variant="outline"
            className="text-primary"
          >
            + Add More
          </Button>
        </div>

        <Button>Save</Button>
      </div>
    </div>
  );
};

export default Experience;
