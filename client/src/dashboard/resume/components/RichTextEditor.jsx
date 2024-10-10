import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Brain, Loader, LoaderCircle } from "lucide-react";
import React, { useContext, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { AIchatSession } from "../../../../service/AIModal.js";
import { toast } from "sonner";
import { Button } from "@/components/ui/button.jsx";

const PROMPT =
  "position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags";

const RichTextEditor = ({ onRichTextEditorChange, index, defaultValue }) => {
  const [value, setValue] = useState(defaultValue);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    if (!resumeInfo.experience[index].title) {
      toast("Please add Position Title");
      return;
    }
    const prompt = PROMPT.replace(
      "{positionTitle}",
      resumeInfo?.experience[index].title
    );

    try {
      const result = await AIchatSession.sendMessage(prompt);
      const responseText = result.response.text(); // Get the response as text
      console.log(responseText);

      // Clean the response (removing unwanted brackets or extra characters if needed)
      const cleanedText = responseText.replace(/[\[\]]/g, ""); // Example cleanup to remove brackets

      // Set the cleaned HTML content in the editor
      setValue(cleanedText);
    } catch (error) {
      console.error("Error generating summary from AI:", error);
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label htmlFor="text-xs">Summary</label>
        <Button
          variant="outline"
          className="flex gap-2 border-primary text-primary"
          size="sm"
          type="button"
          onClick={GenerateSummaryFromAI}
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain className="w-4 h-4" />
              Generate From AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;
