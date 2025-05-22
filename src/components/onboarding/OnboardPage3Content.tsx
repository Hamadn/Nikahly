import React, { useContext } from "react";
import { OnboardingContext } from "../OnboardingModalReact";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Options arrays from the original onboardpage3.astro
const devotionOptions = [
  { label: "Complete devotion", value: "complete devotion" },
  { label: "Partial devotion", value: "partial devotion" },
];

const sectOptions = [
  { label: "Sunni", value: "sunni" },
  { label: "Shia", value: "shia" },
  { label: "Salafi", value: "salafi" },
  { label: "Ahl Hadees", value: "ahl-hadees" },
  { label: "Barelvi", value: "barelvi" },
  { label: "Deobandi", value: "deobandi" },
  { label: "Just Muslim", value: "just-muslim" },
  { label: "Prefer not to say", value: "prefer not to say" },
  { label: "Other", value: "other" },
];

const revertOptions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

const practicingSinceOptions = [
  { label: "Birth", value: "birth" },
  { label: "Other", value: "other" },
];

const prayerPatternOptions = [
  { label: "Always", value: "always" },
  { label: "Most of the time", value: "most of the time" },
  { label: "Sometimes", value: "sometimes" },
  { label: "Rarely", value: "rarely" },
  { label: "Never", value: "never" },
];

const OnboardPage3Content = () => {
  const { formData, updateFormData } = useContext(OnboardingContext);
  
  const handleSelectChange = (value: string, name: string) => {
    updateFormData(name, value);
  };
  
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>, field: string) => {
    updateFormData(field, e.target.value);
  };

  
  return (
    <div className="flex flex-col gap-12 p-4">
      <p className="text-secondary-foreground text-center lg:text-left text-xs lg:text-md font-semibold">My Religion</p>

      <div className="flex flex-wrap gap-6">
        <div className="flex-1 min-w-[150px]">
          <h6 className="text-primary text-sm lg:text-lg font-semibold mb-2">Devotion</h6>
          <Select 
            onValueChange={(value) => handleSelectChange(value, "devotion")} 
            defaultValue={formData.devotion || undefined}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="How devoted are you to your religion?" />
            </SelectTrigger>
            <SelectContent>
              {devotionOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <h6 className="text-primary text-sm lg:text-lg font-semibold mb-2">Sect</h6>
          <Select 
            onValueChange={(value) => handleSelectChange(value, "sect")} 
            defaultValue={formData.sect || undefined}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="What sect are you from?" />
            </SelectTrigger>
            <SelectContent>
              {sectOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <div className="flex-1 min-w-[150px]">
          <h6 className="text-primary text-sm lg:text-lg font-semibold mb-2">Revert</h6>
          <Select 
            onValueChange={(value) => handleSelectChange(value, "revert")} 
            defaultValue={formData.revert || undefined}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Did you revert to your religion?" />
            </SelectTrigger>
            <SelectContent>
              {revertOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <h6 className="text-primary text-sm lg:text-lg font-semibold mb-2">Practicing Since</h6>
          <Select 
            onValueChange={(value) => handleSelectChange(value, "practicingSince")} 
            defaultValue={formData.practicingSince || undefined}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="When did you start practicing your religion?" />
            </SelectTrigger>
            <SelectContent>
              {practicingSinceOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <div className="flex-1 min-w-[150px]">
          <h6 className="text-primary text-sm lg:text-lg font-semibold mb-2">Prayer Pattern</h6>
          <Select 
            onValueChange={(value) => handleSelectChange(value, "prayerPattern")} 
            defaultValue={formData.prayerPattern || undefined}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="What is your prayer pattern?" />
            </SelectTrigger>
            <SelectContent>
              {prayerPatternOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <p className="text-secondary-foreground text-center lg:text-left text-xs lg:text-md font-semibold">My Education & Employment</p>

      <div className="flex flex-wrap gap-6">
        <div className="flex-1 min-w-[150px]">
          <h6 className="text-primary text-sm lg:text-lg font-semibold mb-2">Education & Employment</h6>
          <Textarea 
            placeholder="Please provide your education and employment details" 
            className="h-20" 
            value={formData.educationEmployment || ''}
            onChange={(e) => handleTextareaChange(e, 'educationEmployment')}
          />
        </div>
      </div>

      <p className="text-secondary-foreground text-center lg:text-left text-xs lg:text-md font-semibold">My Ideal Partner</p>

      <div className="flex flex-wrap gap-6">
        <div className="flex-1 min-w-[150px]">
          <h6 className="text-primary text-sm lg:text-lg font-semibold mb-2">What would my ideal partner be like?</h6>
          <Textarea 
            placeholder="Please provide your ideal partner details" 
            className="h-20" 
            value={formData.idealPartner || ''}
            onChange={(e) => handleTextareaChange(e, 'idealPartner')}
          />
        </div>
      </div>
    </div>
  );
};

export default OnboardPage3Content;
