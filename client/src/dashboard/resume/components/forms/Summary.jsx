import { Button } from "@/components/ui/button";
import React from "react";

const Summary = () => {
  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add Summary for your Job Title</p>
        <div className="mt-7">
          <div className="flex justify-between items-end">
            <label>Add Summary</label>
            <Button
              variant="outline"
              className="border-primary text-primary"
              size="sm"
            >
              Generate From AI
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
