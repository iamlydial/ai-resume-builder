import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../../service/GlobalApi.js";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const skillField = {
  name: "",
  rating: 0,
};

const Skills = () => {
  const [skillsList, setSkillsList] = useState([
    {
      name: "",
      rating: 0,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();

  const handleChange = (index, name, value) => {
    const newEntries = skillsList.slice();
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };

  const AddNewSkill = () => {
    setSkillsList([
      ...skillsList,
      {
        name: "",
        rating: 0,
      },
    ]);
  };
  const RemoveNewSkill = () => {
    setSkillsList((skillsList) => skillsList.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        skills: skillsList,
      },
    };

    GlobalApi.UpdateResumeDetail(params.resumeId, data).then(
      (resp) => {
        console.log(resp, "skills resp");
        setLoading(false);
        toast("Skills updated!");
      },
      (error) => {
        setLoading(false);
        toast("Server error, try again.");
      }
    );
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      Skills: skillsList,
    });
  }, [skillsList]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add your professional skills</p>

      <div>
        {skillsList.map((item, index) => (
          <div
            key={index}
            className="flex justify-between mb-2 border rounded-lg p-3 "
          >
            <div className="">
              <label className="text-xs">Name</label>
              <Input
                className="w-full"
                onChange={(e) => handleChange(index, "name", e.target.value)}
              />
            </div>
            <Rating
              style={{ maxWidth: 120 }}
              value={item.rating}
              onChange={(v) => handleChange(index, "rating", v)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button onClick={RemoveNewSkill}>- Remove</Button>
          <Button
            onClick={AddNewSkill}
            variant="outline"
            className="text-primary"
          >
            + Add More
          </Button>
        </div>

        <Button disabled={loading} onClick={() => onSave()}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default Skills;
