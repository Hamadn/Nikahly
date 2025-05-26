import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { Progress } from "../components/ui/progress";
import { Button } from "../components/ui/button";

// Import the content from each onboarding page
import OnboardPage2Content from "../components/onboarding/OnboardPage2Content";
import OnboardPage3Content from "../components/onboarding/OnboardPage3Content";
import OnboardPage4Content from "../components/onboarding/OnboardPage4Content";

interface OnboardingModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialStep?: "step2" | "step3" | "step4";
}

const OnboardingModal = ({ 
  isOpen, 
  onOpenChange, 
  initialStep = "step2" 
}: OnboardingModalProps) => {
  const [activeTab, setActiveTab] = useState<string>(initialStep);
  
  // Calculate progress based on active tab
  const getProgress = () => {
    switch (activeTab) {
      case "step2":
        return 33;
      case "step3":
        return 66;
      case "step4":
        return 100;
      default:
        return 33;
    }
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Handle next step
  const handleNext = () => {
    if (activeTab === "step2") {
      setActiveTab("step3");
    } else if (activeTab === "step3") {
      setActiveTab("step4");
    } else if (activeTab === "step4") {
      // Complete onboarding
      onOpenChange(false);
      window.location.href = "/dashboard"; // Redirect to dashboard or wherever needed
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    if (activeTab === "step3") {
      setActiveTab("step2");
    } else if (activeTab === "step4") {
      setActiveTab("step3");
    } else if (activeTab === "step2") {
      // Go back to first page
      onOpenChange(false);
      window.location.href = "/onboardoath";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl lg:max-w-6xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl lg:text-4xl font-bold p-4 uppercase text-primary">
            Sign Up
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-black text-sm font-semibold lg:text-lg">Profile Setup</h4>
          <h4 className="text-black text-sm font-semibold lg:text-lg">
            Step {activeTab === "step2" ? "2" : activeTab === "step3" ? "3" : "4"} of 4
          </h4>
        </div>
        
        <Progress value={getProgress()} className="mb-6" />
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="step2">Personal Details</TabsTrigger>
            <TabsTrigger value="step3">Religion & Education</TabsTrigger>
            <TabsTrigger value="step4">About Me</TabsTrigger>
          </TabsList>
          
          <TabsContent value="step2">
            <OnboardPage2Content />
          </TabsContent>
          
          <TabsContent value="step3">
            <OnboardPage3Content />
          </TabsContent>
          
          <TabsContent value="step4">
            <OnboardPage4Content />
          </TabsContent>
        </Tabs>
        
        <div id="btns" className="flex flex-col lg:flex-row gap-5 justify-between px-20 mt-10">
          <Button 
            className="lg:px-16 lg:py-2 py-2 px-10 max-w-fit mx-auto bg-secondary border border-primary text-sm lg:text-lg text-primary rounded-xl font-semibold"
            onClick={handlePrevious}
          >
            Back
          </Button>
          <Button 
            className="lg:px-16 lg:py-2 py-2 px-10 max-w-fit mx-auto bg-primary text-sm lg:text-lg text-secondary rounded-xl font-semibold"
            onClick={handleNext}
          >
            {activeTab === "step4" ? "Complete" : "Next"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
