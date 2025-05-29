import { useState, useEffect, createContext } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";

// Import the content from each onboarding page
import OnboardPage2Content from "./onboarding/OnboardPage2Content";
import OnboardPage3Content from "./onboarding/OnboardPage3Content";
import OnboardPage4Content from "./onboarding/OnboardPage4Content";

// Create a context for sharing form data between components
export type FormDataType = {
  // Page 2 - Personal Details
  dateOfBirth?: string;
  nationality?: string;
  residence?: string;
  city?: string;
  maritalStatus?: string;
  age?: string;
  childCount?: string;
  height?: string;
  weight?: string;
  bodyType?: string;
  beard?: string;
  eyeColor?: string;
  skinColor?: string;
  
  // Page 3 - Religion & Education
  devotion?: string;
  sect?: string;
  revert?: string;
  practicingSince?: string;
  prayerPattern?: string;
  educationEmployment?: string;
  idealPartner?: string;
  
  // Page 4 - About Me
  hobbiesLifestyle?: string;
  dressingCovering?: string;
  personalityTraits?: string[];
};

type OnboardingContextType = {
  formData: FormDataType;
  updateFormData: (field: string, value: any) => void;
};

export const OnboardingContext = createContext<OnboardingContextType>({
  formData: {},
  updateFormData: () => {}
});

const OnboardingModalReact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("step2");
  const [formData, setFormData] = useState<FormDataType>({});
  
  useEffect(() => {
    // Listen for the event from the Astro component
    const handleOpenModal = (event: CustomEvent<{ isOpen: boolean, activeTab?: string }>) => {
      setIsOpen(true);
      
      // Set the active tab if provided
      if (event.detail && event.detail.activeTab) {
        setActiveTab(event.detail.activeTab);
      }
    };

    // Add event listener
    document.addEventListener('openOnboardingModalReact', handleOpenModal as EventListener);
    
    // Clean up
    return () => {
      document.removeEventListener('openOnboardingModalReact', handleOpenModal as EventListener);
    };
  }, []);
  
  // Load saved form data from localStorage when component mounts
  useEffect(() => {
    const savedData = localStorage.getItem('onboardingFormData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (error) {
        console.error('Error parsing saved form data:', error);
      }
    }
  }, []);
  
  // Function to update form data and save to localStorage
  const updateFormData = (field: string, value: any) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    localStorage.setItem('onboardingFormData', JSON.stringify(updatedData));
  };

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
  const handleNext = async () => {
    if (activeTab === "step2") {
      setActiveTab("step3");
    } else if (activeTab === "step3") {
      setActiveTab("step4");
    } else if (activeTab === "step4") {
      try {
        // Show loading state
        setIsOpen(false);
        
        // Get gender from localStorage (set in onboardpage1.astro)
        const gender = localStorage.getItem('selectedGender') || '';
        
        // Combine all form data
        const completeUserData = {
          ...formData,
          gender
        };
        
        // Call API to mark onboarding as complete and save user data
        const response = await fetch('/api/complete-onboarding', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(completeUserData)
        });
        
        if (!response.ok) {
          throw new Error('Failed to complete onboarding');
        }
        
        // Save form data to localStorage for persistence
        localStorage.setItem('onboardingFormData', JSON.stringify(formData));
        
        // Redirect to dashboard
        window.location.href = "profile";
      } catch (error) {
        console.error('Error completing onboarding:', error);
        alert('There was an error completing your onboarding. Please try again.');
        setIsOpen(true);
      }
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
      setIsOpen(false);
      // No need to navigate, just close the modal to return to page 1
    }
  };

  return (
    <OnboardingContext.Provider value={{ formData, updateFormData }}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-4xl lg:max-w-6xl h-[calc(100vh-10rem)] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl lg:text-4xl font-bold p-4 uppercase text-primary">
              Sign Up
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-black text-sm font-semibold lg:text-lg">Profile Setup</h4>
            <img src="/welcome-uncle.svg" alt="uncle" className="hidden lg:block h-16" />
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
    </OnboardingContext.Provider>
  );
};

export default OnboardingModalReact;
