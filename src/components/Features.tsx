import { cn } from "@/lib/utils";
export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Custom Matchmaking",
      icon: <img src="/ring-services-section.svg" alt="ring-services-section" />,
      description: "Custom matchmaking tailored to your spouse preferences through a personalized questionnaire."
    },
    {
      title: "Quran and Sunnah Access",
      icon: <img src="/quran-services-section.svg" alt="quran-services-section" />,
      description: "Provides access to articles and video guides based on the Quran and Sunnah.",
    },
    {
      title: "Privacy and Security",
      icon: <img src="/security-services-section.svg" alt="security-services-section" />,
      description: "Ensures privacy by blurring images and limiting chat with access only unlocked upon wali approval.",
    },
    {
      title: "Dedicated Video Chat Support",
      icon: <img src="/videoicon.svg" alt="videoicon" />,
      description:
        "Implements a dedicated video chat support feature to help with finding the perfect match.",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  icon,
  description,
  index,
}: {
  title: string;
  icon: React.ReactNode;
  description: string;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col py-10 relative group/feature items-center",
        index < 4 && "dark:border-neutral-800"
      )}
    >
      <div className="w-28 h-28 flex items-center justify-center mb-4 rounded-full bg-primary/10 dark:bg-primary/20">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10 text-center">
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-primary dark:text-primary">
          {title}
        </span>
      </div>
      <p className="text-sm text-center self-center text-muted-foreground dark:text-muted-foreground max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
