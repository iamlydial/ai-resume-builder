import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Brain, LoaderCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { toast } from "sonner";
import { AIchatSession } from "./../../../../../service/AIModal";

const prompt =
  "Job Title: ${jobTitle}, Depends on job title give me summary for my resume summary within 4-5 lines in JSON format with field exprience level and summary with Experience level for Fresher, Mid-level, Experienced";

const Summary = ({ enabledNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summary, setSummary] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState([]);

  useEffect(() => {
    summary &&
      setResumeInfo({
        ...resumeInfo,
        summary: summary,
      });
  }, [summary]);

  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
    console.log(PROMPT, ">>>PROMPT");

    try {
      const result = await AIchatSession.sendMessage(PROMPT);
      const rawResponse = result.response.text(); // Get raw text response
      console.log(rawResponse, "RAW RESPONSE"); // Log raw response

      // Try parsing the response
      const parsedResult = JSON.parse(rawResponse);

      console.log(parsedResult, "PARSED RESULT");

      if (parsedResult) {
        const summariesArray = Object.values(parsedResult); // Convert object to array
        setAiGeneratedSummaryList(summariesArray);
      }
    } catch (error) {
      console.error("Error generating summary:", error);
      setAiGeneratedSummaryList([]);
    }

    setLoading(false);
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        summary: summary,
      },
    };
    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (resp) => {
        console.log(resp);
        enabledNext(true);
        setLoading(false);
        toast("Summary updated");
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add Summary for your Job Title</p>
        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summary</label>
            <Button
              variant="outline"
              className="border-primary text-primary"
              size="sm"
              type="button"
              onClick={GenerateSummaryFromAI}
            >
              <Brain className="w-4 h-4" />

              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Generate From AI"
              )}
            </Button>
          </div>
          <Textarea
            required
            className="mt-5"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummaryList && (
        <div className="my-5">
          <h2 className="font-bold text-lg">Suggestions</h2>
          {Array.isArray(aiGeneratedSummaryList) &&
            aiGeneratedSummaryList?.map((item, index) => (
              <div
                key={index}
                onClick={() => setSummary(item?.summary)}
                className="p-5 shadow-lg my-4 rounded-lg cursor-pointer"
              >
                <h2 className="font-bold my-1 text-primary">
                  Level: {item?.experience_level}
                </h2>
                <p>{item?.summary}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Summary;
