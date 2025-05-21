import React, { useState, useContext, useEffect } from "react";
import { OnboardingContext } from "../OnboardingModalReact";
import { Textarea } from "@/components/ui/textarea";

// Options from the original onboardpage4.astro
const waliOptions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

const handleSelectChange = (value: string, name: string) => {
  console.log(`${name}: ${value}`);
};

// Personality traits from the original onboardpage4.astro
const personalityTraits = [
  { emoji: "😂", text: "Humorous" },
  { emoji: "😉", text: "Playful" },
  { emoji: "🥰", text: "Pure-hearted" },
  { emoji: "❤️", text: "Loving" },
  { emoji: "🤪", text: "Crazy" },
  { emoji: "⚠️", text: "Cautious" },
  { emoji: "😡", text: "Angry" },
  { emoji: "🕵🏻", text: "Analytical" },
  { emoji: "😜", text: "Prankster" },
  { emoji: "🌹", text: "Romantic" },
  { emoji: "🕌", text: "Hafidh" },
  { emoji: "😎", text: "Confident" },
  { emoji: "🧠", text: "Sharp-minded" },
  { emoji: "💗", text: "Passionate" },
  { emoji: "👶🏻", text: "Loved by kids" },
  { emoji: "👨🏻‍💼", text: "Entrepreneur" },
  { emoji: "🥶", text: "Cold" },
  { emoji: "🎯", text: "Daring" },
  { emoji: "🗣️", text: "Good Talker" },
  { emoji: "💪🏻", text: "Strong" },
  { emoji: "🤩", text: "Uplifting" },
  { emoji: "😮", text: "Dramatic" },
  { emoji: "💎", text: "Elegant" },
  { emoji: "🥳", text: "Joyful" },
  { emoji: "🧑🏻‍⚕️", text: "Nurse" },
  { emoji: "👾", text: "Self Aware" },
  { emoji: "🗣️", text: "Talkative" },
  { emoji: "🎯", text: "Straightforward" },
  { emoji: "🐼", text: "Panda" },
  { emoji: "💌", text: "Exotic" },
  { emoji: "🥇", text: "Winner" },
  { emoji: "🌊", text: "Flowing" },
  { emoji: "🦉", text: "Wise" },
  { emoji: "💫", text: "Spiritual" },
  { emoji: "👨🏻‍⚖️", text: "Judge" },
];

const OnboardPage4Content = () => {
  const { formData, updateFormData } = useContext(OnboardingContext);
  const [selectedTraits, setSelectedTraits] = useState<string[]>(formData.personalityTraits || []);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>, field: string) => {
    updateFormData(field, e.target.value);
  };

  const toggleTrait = (trait: string) => {
    let newTraits: string[];
    if (selectedTraits.includes(trait)) {
      newTraits = selectedTraits.filter(t => t !== trait);
    } else {
      newTraits = [...selectedTraits, trait];
    }
    setSelectedTraits(newTraits);
    updateFormData('personalityTraits', newTraits);
  };
  
  // Sync with formData if it changes externally
  useEffect(() => {
    if (formData.personalityTraits) {
      setSelectedTraits(formData.personalityTraits);
    }
  }, [formData.personalityTraits]);

  return (
    <div className="flex flex-col gap-12 p-4">
      <p className="text-secondary-foreground text-center lg:text-left text-xs lg:text-md font-semibold">More About Me</p>

      <div className="flex flex-wrap gap-6">
        <div className="flex-1 min-w-[150px]">
          <h6 className="text-primary text-sm lg:text-lg font-semibold mb-2">My hobbies, lifestyle, interests & skills</h6>
          <Textarea 
            placeholder="Please provide your hobbies, lifestyle, interests & skills" 
            className="h-20" 
            value={formData.hobbiesLifestyle || ''}
            onChange={(e) => handleTextareaChange(e, 'hobbiesLifestyle')}
          />
        </div>
      </div>

      <p className="text-secondary-foreground text-center lg:text-left text-xs lg:text-md font-semibold">Dressing / Covering</p>

      <div className="flex flex-wrap gap-6">
        <div className="flex-1 min-w-[150px]">
          <h6 className="text-primary text-sm lg:text-lg font-semibold mb-2">My dressing / covering preferences</h6>
          <Textarea 
            placeholder="Please provide your dressing / covering preferences" 
            className="h-20" 
            value={formData.dressingCovering || ''}
            onChange={(e) => handleTextareaChange(e, 'dressingCovering')}
          />
        </div>
      </div>

      <p className="text-secondary-foreground text-center lg:text-left text-xs lg:text-md font-semibold">Personality Traits</p>

      <h6 className="text-primary text-sm lg:text-lg font-semibold mb-2">Select your personality traits</h6>

      <div id="traits" className="flex flex-wrap gap-2 p-2 mt-5 justify-center items-center lg:justify-start">
        {personalityTraits.map((trait, index) => (
          <button
            key={index}
            className={`text-primary text-md lg:text-xl border border-primary rounded-xl p-2 transition-all duration-100 ${
              selectedTraits.includes(trait.text) ? "bg-primary text-white" : "hover:bg-primary hover:text-white"
            }`}
            onClick={() => toggleTrait(trait.text)}
          >
            {trait.emoji} {trait.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OnboardPage4Content;
