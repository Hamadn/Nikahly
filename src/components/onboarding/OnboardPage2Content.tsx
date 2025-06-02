import React, { useContext } from "react";
import { OnboardingContext } from "../OnboardingModalReact";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CountryDropdown } from "../ui/country-dropdown";
import { FormField, FormItem } from "../ui/form";
import { useForm } from "react-hook-form";

const nationalityOptions = [
  { label: "Pakistani", value: "pakistani" },
  { label: "Indian", value: "indian" },
  { label: "Bangladeshi", value: "bangladeshi" },
  { label: "British", value: "british" },
  { label: "Other", value: "other" },
];

const residenceOptions = [
  { label: "Pakistani", value: "pakistani" },
  { label: "Indian", value: "indian" },
  { label: "Bangladeshi", value: "bangladeshi" },
  { label: "British", value: "british" },
  { label: "Other", value: "other" },
];

const cityOptions = [
  { label: "Pakistani", value: "pakistani" },
  { label: "Indian", value: "indian" },
  { label: "Bangladeshi", value: "bangladeshi" },
  { label: "British", value: "british" },
  { label: "Other", value: "other" },
];

const maritalStatusOptions = [
  { label: "Single", value: "single" },
  { label: "Engaged", value: "engaged" },
  { label: "Married", value: "married" },
  { label: "Divorced", value: "divorced" },
  { label: "Widowed", value: "widowed" },
  { label: "Annulled", value: "annulled" },
];

const ageOptions = Array.from({ length: 83 }, (_, i) => ({
  label: `${18 + i}`,
  value: `${18 + i}`,
}));

const childCountOptions = [
  { label: "0", value: "0" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
];  

const weightOptions = Array.from({ length: 121 }, (_, i) => ({
  label: `${30 + i} kg`,
  value: `${30 + i}`,
}));

const heightOptions = Array.from({ length: 81 }, (_, i) => ({
  label: `${120 + i} cm`,
  value: `${120 + i}`,
}));

const bodyTypeOptions = [
  { label: "Skinny", value: "skinny" },
  { label: "Slim", value: "slim" },
  { label: "Average", value: "average" },
  { label: "Athletic", value: "athletic" },
  { label: "Heavy", value: "heavy" },
  { label: "Bulky", value: "bulky" },
  { label: "Thick", value: "thick" },
  { label: "Curvy", value: "curvy" },
  { label: "Chubby", value: "chubby" },
  { label: "Muscular", value: "muscular" },
];

const beardOptions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

const skinColorOptions = [
  { label: "Fair", value: "fair" },
  { label: "Medium", value: "medium" },
  { label: "Dark", value: "dark" },
];

const eyeColorOptions = [
  { label: "Brown", value: "brown" },
  { label: "Black", value: "black" },
  { label: "Blue", value: "blue" },
  { label: "Green", value: "green" },
];

const OnboardPage2Content = () => {
  const { formData, updateFormData } = useContext(OnboardingContext);
  
  // Initialize form with existing formData
  const form = useForm({
    defaultValues: {
      ...formData
    }
  });

  // Update context when form values change
  const onFormChange = (name: keyof typeof formData, value: any) => {
    updateFormData(name, value);
    // Also update the form state
    form.setValue(name as any, value);
  };
  
  const handleSelectChange = (value: string, name: string) => {
    updateFormData(name, value);
  };
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData('dateOfBirth', e.target.value);
  };

  return (
    <div className="flex flex-col gap-12 p-4">
      <p className="text-secondary-foreground text-center lg:text-left text-xs lg:text-md font-semibold">Personal Details</p>

      <div className="flex flex-col gap-2">
        <h6 className="text-primary text-sm lg:text-lg font-semibold">Date of Birth</h6>
        <Input 
          type="date" 
          placeholder="Please Select Your Date of Birth" 
          className="border rounded-xl p-2" 
          value={formData.dateOfBirth || ''}
          onChange={handleDateChange}
        />
      </div>

      <p className="text-secondary-foreground text-center lg:text-left text-xs lg:text-md font-semibold">Nationality & Residence</p>

      <div className="flex flex-wrap gap-6">
        <div className="flex-1 min-w-[150px]">
          <h6 className="text-primary text-sm lg:text-lg font-semibold mb-2">Nationality</h6>
          <FormField
            name="nationality"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <CountryDropdown
                    placeholder="Nationality"
                    defaultValue={field.value}
                    onChange={(country: any) => {
                      const alpha3 = country.alpha3;
                      onFormChange("nationality", alpha3);
                      field.onChange(alpha3);
                    }}
                  />
                </FormItem>
              );
            }}
          />
        </div>

        <div className="flex-1 min-w-[150px]">
          <h6 className="text-primary text-sm lg:text-lg font-semibold mb-2">Residence</h6>
          <FormField
            name="residence"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Select 
                  onValueChange={(value) => {
                    onFormChange("residence", value);
                    field.onChange(value);
                  }}
                  defaultValue={formData.residence || undefined}
                  value={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Residence" />
                  </SelectTrigger>
                  <SelectContent>
                    {residenceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <div className="flex-1 min-w-[150px]">
          <h6 className="text-primary text-sm lg:text-lg font-semibold mb-2">City</h6>
          <FormField
            name="city"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Select 
                  onValueChange={(value) => {
                    onFormChange("city", value);
                    field.onChange(value);
                  }}
                  defaultValue={formData.city || undefined}
                  value={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                  <SelectContent>
                    {cityOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
      </div>

      <p className="text-secondary-foreground text-center lg:text-left text-xs lg:text-md font-semibold">Marital Status</p>
      <div className="flex flex-wrap gap-6">
        <div className="flex-1 min-w-[150px]">
          <h6 className="text-primary text-sm lg:text-lg font-semibold mb-2">Marital Status</h6>
          <Select 
            onValueChange={(value) => handleSelectChange(value, "maritalStatus")} 
            defaultValue={formData.maritalStatus || undefined}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Marital Status" />
            </SelectTrigger>
            <SelectContent>
              {maritalStatusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <h6 className="text-primary text-sm lg:text-lg font-semibold mb-2">Age</h6>
          <Select 
            onValueChange={(value) => handleSelectChange(value, "age")} 
            defaultValue={formData.age || undefined}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Age" />
            </SelectTrigger>
            <SelectContent>
              {ageOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <h6 className="text-primary text-sm lg:text-lg font-semibold mb-2">Child Count</h6>
          <Select 
            onValueChange={(value) => handleSelectChange(value, "childCount")} 
            defaultValue={formData.childCount || undefined}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Child Count" />
            </SelectTrigger>
            <SelectContent>
              {childCountOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <p className="text-secondary-foreground text-center lg:text-left text-xs lg:text-md font-semibold">Looks & Appearance</p>

      {/* First row */}
      <div className="flex flex-wrap gap-6">
        <div className="flex-1 min-w-[150px]">
          <h6 className="text-primary text-sm lg:text-lg font-semibold mb-2">Height</h6>
          <Select 
            onValueChange={(value) => handleSelectChange(value, "height")} 
            defaultValue={formData.height || undefined}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Height" />
            </SelectTrigger>
            <SelectContent>
              {heightOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <h6 className="text-primary text-sm lg:text-lg font-semibold mb-2">Weight</h6>
          <Select 
            onValueChange={(value) => handleSelectChange(value, "weight")} 
            defaultValue={formData.weight || undefined}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Weight" />
            </SelectTrigger>
            <SelectContent>
              {weightOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <h6 className="text-primary text-sm lg:text-lg font-semibold mb-2">Body Type</h6>
          <Select 
            onValueChange={(value) => handleSelectChange(value, "bodyType")} 
            defaultValue={formData.bodyType || undefined}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Body Type" />
            </SelectTrigger>
            <SelectContent>
              {bodyTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Second row */}
      <div className="flex flex-wrap gap-6">
        <div className="flex-1 min-w-[150px]">
          <h6 className="text-primary text-sm lg:text-lg font-semibold mb-2">Beard</h6>
          <Select 
            onValueChange={(value) => handleSelectChange(value, "beard")} 
            defaultValue={formData.beard || undefined}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Beard" />
            </SelectTrigger>
            <SelectContent>
              {beardOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <h6 className="text-primary text-sm lg:text-lg font-semibold mb-2">Eye Color</h6>
          <Select 
            onValueChange={(value) => handleSelectChange(value, "eyeColor")} 
            defaultValue={formData.eyeColor || undefined}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Eye Color" />
            </SelectTrigger>
            <SelectContent>
              {eyeColorOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <h6 className="text-primary text-sm lg:text-lg font-semibold mb-2">Skin Color</h6>
          <Select 
            onValueChange={(value) => handleSelectChange(value, "skinColor")} 
            defaultValue={formData.skinColor || undefined}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Skin Color" />
            </SelectTrigger>
            <SelectContent>
              {skinColorOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default OnboardPage2Content;

