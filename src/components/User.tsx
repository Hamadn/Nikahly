import { useStore } from "@nanostores/react"
import { $userStore } from "@clerk/astro/client"
import { useState, useEffect } from "react"

interface UserMetadata {
  gender?: string;
  dateOfBirth?: string;
  nationality?: string;
  countryEmoji?: string;
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
  devotion?: string;
  sect?: string;
  revert?: string;
  practicingSince?: string;
  prayerPattern?: string;
  educationEmployment?: string;
  idealPartner?: string;
  hobbiesLifestyle?: string;
  dressingCovering?: string;
  personalityTraits?: string[];
  onboardingComplete?: boolean;
  onboardingCompletedAt?: string;
}

export default function User() {
  const user = useStore($userStore);
  const [userData, setUserData] = useState<UserMetadata>({});
  
  useEffect(() => {
    if (user && user.publicMetadata) {
      setUserData(user.publicMetadata as UserMetadata);
    }
  }, [user]);

  return (
    <>
    <div className="container mt-20 flex flex-col gap-2">

        <div className="flex justify-center items-center text-center lg:text-left lg:justify-between">
            <h2 className="text-2xl md:text-4xl text-primary lg:pt-28 font-bold">
            Profile Details
            </h2>

            <img src="/pfp-avatar.svg" alt="pfpdetails" className="h-full w-40 rounded-full hidden lg:block"/>
        </div>
    </div>

    {/* div for the profile details card */}

    <div className="container bg-accent rounded-xl md:mx-lg">

        {/* div for the profile details & btns start */}

        <div className="p-5 flex flex-col gap-2 justify-center items-center lg:justify-between lg:flex-row">

            <div id="namestuff" className="flex flex-col gap-2">
                <h2 className = "uppercase text-2xl lg:text-5xl font-semibold text-primary text-center lg:text-left">
                    {user?.fullName}
                 </h2>

                 <div className="flex flex-col text-center lg:flex-row lg:gap-2">
                    <p className="text-md text-muted-foreground lg:text-xl">
                        @{user?.username}
                    </p>
                    {userData?.gender && (
                      <p className="text-md text-muted-foreground lg:text-xl">
                        {userData.gender === 'male' ? '♂️ Male' : '♀️ Female'}
                      </p>
                    )}
                 </div>
            </div>

            <div className="btns flex gap-5 p-2">
                <button className="text-md lg:text-2xl">
                    <a href="/chat">
                        <i className="fa-solid fa-message bg-primary text-white rounded-full p-2"></i>
                    </a>
                </button>
                <button className="text-md lg:text-2xl">
                    <a href="/report">
                        <i className="fa-solid fa-triangle-exclamation bg-primary text-white rounded-full p-2"></i>
                    </a>
                </button>
                <button className="text-md lg:text-2xl">
                    <a href="/bookmark">
                        <i className="fa-solid fa-bookmark bg-primary text-white rounded-full p-2"></i>
                    </a>
                </button>
                <button className="text-md lg:text-2xl">
                    <a href="/heart">
                        <i className="fa-solid fa-heart bg-primary text-white rounded-full p-2"></i>
                    </a>
                </button>
            </div>
        </div>

        {/* div for the profile details & btns end */}

        {/* div for the age, flag, location, nationality start */}

        <div id="age-flag-location-nation" className="p-5 flex flex-col gap-5 mt-5 lg:mt-24 justify-center items-center lg:justify-between lg:flex-row">
            <div id="nationality" className="flex gap-2 flex-wrap items-center">
                {userData?.countryEmoji ? (
                  <>
                    <span className="text-xl" role="img" aria-label={userData.nationality || 'Nationality'}>
                      {userData.countryEmoji}
                    </span>
                    {userData.nationality && (
                      <span className="text-md lg:text-xl">
                        {userData.nationality}
                      </span>
                    )}
                  </>
                ) : userData?.nationality ? (
                  <span className="text-md lg:text-xl">
                    {userData.nationality}
                  </span>
                ) : (
                  <span className="text-md lg:text-xl">Nationality not specified</span>
                )}
            </div>

            <div id="location" className="flex gap-2 flex-wrap">
                <i className="fa-solid fa-location-dot text-md lg:text-xl"></i>
                <p className="text-md lg:text-xl">
                  {userData?.city && userData?.residence ? 
                    `${userData.city}, ${userData.residence}` : 
                    'Location not specified'}
                </p>
            </div>

            <p className="text-md lg:text-xl">
              {userData?.maritalStatus ? 
                userData.maritalStatus.charAt(0).toUpperCase() + userData.maritalStatus.slice(1) : 
                'Marital status not specified'}
            </p>

            <p className="text-md lg:text-xl">
              {userData?.age ? 
                `${userData.age} Years Old` : 
                userData?.dateOfBirth ? 
                  `Born on ${new Date(userData.dateOfBirth).toLocaleDateString()}` : 
                  'Age not specified'}
            </p>

        </div>

        {/* div for the age, flag, location, nationality end */}

        {/* div for personality traits start */}

        <div id="traits" className="flex flex-wrap gap-2 p-2 mt-5 justify-center items-center lg:justify-start">
            {userData?.personalityTraits && userData.personalityTraits.length > 0 ? (
              userData.personalityTraits.map((trait, index) => (
                <p key={index} className="text-primary text-md lg:text-xl border border-primary rounded-xl p-2 hover:bg-primary hover:text-white transition-all duration-100">
                  {trait}
                </p>
              ))
            ) : (
              <>
                <p>Not specified</p>
              </>
            )}
        </div>

        {/* div for personality traits end */}

        {/* div for thedeen traits start */}

        <div id="religion-traits" className="flex flex-wrap gap-2 p-2 mt-5 justify-center items-center lg:justify-start">
            {userData?.devotion && (
              <p className="text-primary text-md lg:text-xl border border-primary rounded-xl p-2 hover:bg-primary hover:text-white transition-all duration-100">
                  🕋 {userData.devotion.charAt(0).toUpperCase() + userData.devotion.slice(1)}
              </p>
            )}

            {userData?.sect && (
              <p className="text-primary text-md lg:text-xl border border-primary rounded-xl p-2 hover:bg-primary hover:text-white transition-all duration-100">
                  🧑🏻‍🎓 {userData.sect.charAt(0).toUpperCase() + userData.sect.slice(1)} Muslim
              </p>
            )}

            {userData?.prayerPattern && (
              <p className="text-primary text-md lg:text-xl border border-primary rounded-xl p-2 hover:bg-primary hover:text-white transition-all duration-100">
                  📖 Prays {userData.prayerPattern}
              </p>
            )}

            {userData?.revert === 'yes' && (
              <p className="text-primary text-md lg:text-xl border border-primary rounded-xl p-2 hover:bg-primary hover:text-white transition-all duration-100">
                  🕋 Revert to Islam
              </p>
            )}

            {!userData?.devotion && !userData?.sect && !userData?.prayerPattern && !userData?.revert && !userData?.practicingSince && (
              <>
              <p>Not specified</p>
              </>
            )}


        </div>

        {/* div for thedeen traits end */}

        <br></br><br></br><br></br>

        <h4 className="text-center lg:text-left text-primary text-xl lg:text-2xl font-semibold">
            My Looks & Appearance
        </h4>

        <div className="flex flex-wrap justify-center items-center lg:justify-between gap-5 p-10">
            <div className="flex flex-col gap-2 p-4">
                <h5 className="text-md lg:text-xl font-semibold">Skin Color</h5>
                <p className="text-md lg:text-xl">{userData?.skinColor ? userData.skinColor.charAt(0).toUpperCase() + userData.skinColor.slice(1) : 'Not specified'}</p>
            </div>
            <div className="flex flex-col gap-2 p-4">
                <h5 className="text-md lg:text-xl font-semibold">Height</h5>
                <p className="text-md lg:text-xl">{userData?.height ? `${userData.height} cm` : 'Not specified'}</p>
            </div>
            <div className="flex flex-col gap-2 p-4">
                <h5 className="text-md lg:text-xl font-semibold">Weight</h5>
                <p className="text-md lg:text-xl">{userData?.weight ? `${userData.weight} kg` : 'Not specified'}</p>
            </div>
            <div className="flex flex-col gap-2 p-4">
                <h5 className="text-md lg:text-xl font-semibold">Body Type</h5>
                <p className="text-md lg:text-xl">{userData?.bodyType ? userData.bodyType.charAt(0).toUpperCase() + userData.bodyType.slice(1) : 'Not specified'}</p>
            </div>
            <div className="flex flex-col gap-2 p-4">
                <h5 className="text-md lg:text-xl font-semibold">Eye Color</h5>
                <p className="text-md lg:text-xl">{userData?.eyeColor ? userData.eyeColor.charAt(0).toUpperCase() + userData.eyeColor.slice(1) : 'Not specified'}</p>
            </div>
            <div className="flex flex-col gap-2 p-4">
                <h5 className="text-md lg:text-xl font-semibold">Beard</h5>
                <p className="text-md lg:text-xl">{userData?.beard ? userData.beard.charAt(0).toUpperCase() + userData.beard.slice(1) : 'Not specified'}</p>
            </div>
            {userData?.childCount && userData.childCount !== '0' && (
              <div className="flex flex-col gap-2 p-4">
                <h5 className="text-md lg:text-xl font-semibold">Children</h5>
                <p className="text-md lg:text-xl">{userData.childCount}</p>
              </div>
            )}
        </div>

        <br></br><br></br><br></br>

        <h4 className="text-center lg:text-left text-primary text-xl lg:text-2xl font-semibold">
            My Religion
        </h4>

        <div className="flex flex-wrap justify-center items-center lg:justify-between gap-5 p-10">
            <div className="flex flex-col gap-2 p-4">
                <h5 className="text-md lg:text-xl font-semibold">Devotion</h5>
                <p className="text-md lg:text-xl">{userData?.devotion ? userData.devotion.charAt(0).toUpperCase() + userData.devotion.slice(1) : 'Not specified'}</p>
            </div>
            <div className="flex flex-col gap-2 p-4">
                <h5 className="text-md lg:text-xl font-semibold">Sect</h5>
                <p className="text-md lg:text-xl">{userData?.sect ? userData.sect.charAt(0).toUpperCase() + userData.sect.slice(1) : 'Not specified'}</p>
            </div>
            <div className="flex flex-col gap-2 p-4">
                <h5 className="text-md lg:text-xl font-semibold">Revert</h5>
                <p className="text-md lg:text-xl">{userData?.revert === 'yes' ? 'Yes' : userData?.revert === 'no' ? 'No' : 'Not specified'}</p>
            </div>
            <div className="flex flex-col gap-2 p-4">
                <h5 className="text-md lg:text-xl font-semibold">Practicing Since</h5>
                <p className="text-md lg:text-xl">{userData?.practicingSince ? userData.practicingSince.charAt(0).toUpperCase() + userData.practicingSince.slice(1) : 'Not specified'}</p>
            </div>
            <div className="flex flex-col gap-2 p-4">
                <h5 className="text-md lg:text-xl font-semibold">Prayer Pattern</h5>
                <p className="text-md lg:text-xl">{userData?.prayerPattern ? userData.prayerPattern.charAt(0).toUpperCase() + userData.prayerPattern.slice(1) : 'Not specified'}</p>
            </div>
            <div className="flex flex-col gap-2 p-4">
                <h5 className="text-md lg:text-xl font-semibold">Nationality</h5>
                <div className="flex items-center gap-2">
                  {userData?.countryEmoji && (
                    <span className="text-xl" role="img" aria-label={userData.nationality || 'Nationality'}>
                      {userData.countryEmoji}
                    </span>
                  )}
                  <span>{userData?.nationality || 'Not specified'}</span>
                </div>
            </div>
        </div>

        <br></br><br></br><br></br>

        <h4 className="text-center lg:text-left text-primarzy text-xl lg:text-2xl font-semibold">
            My Education & Employment
        </h4>

        <p className="text-center lg:text-left text-md lg:text-xl text-wrap pt-5 pb-5">
            {userData?.educationEmployment || 'No education or employment information provided.'}
        </p>

        <br></br><br></br><br></br>

        <h4 className="text-center lg:text-left text-primary text-xl lg:text-2xl font-semibold">
            What would my ideal partner be like?
        </h4>

        <p className="text-center lg:text-left text-md lg:text-xl text-wrap pt-5">
            {userData?.idealPartner || 'No ideal partner information provided.'}    
        </p>

        <br></br><br></br><br></br>

        <h4 className="text-center lg:text-left text-primary text-xl lg:text-2xl font-semibold">
            My Hobbies & Interests
        </h4>

        <p className="text-center lg:text-left text-md lg:text-xl text-wrap pt-5">
            {userData?.hobbiesLifestyle || 'No hobbies or interests information provided.'}
        </p>

        <br></br><br></br><br></br>

        <h4 className="text-center lg:text-left text-primary text-xl lg:text-2xl font-semibold">
            How do I dress/cover myself?
        </h4>

        <p className="text-center lg:text-left text-md lg:text-xl text-wrap pt-5">
            {userData?.dressingCovering || 'No dress or cover information provided.'}
        </p>

        <br></br><br></br><br></br>

        <div className="btns flex gap-5 p-2 justify-center items-center">
            <button className="text-md lg:text-2xl">
                <a href="/chat">
                    <i className="fa-solid fa-message bg-primary text-white rounded-full p-2"></i>
                </a>
            </button>
            <button className="text-md lg:text-2xl">
                <a href="/report">
                    <i className="fa-solid fa-triangle-exclamation bg-primary text-white rounded-full p-2"></i>
                </a>
            </button>
            <button className="text-md lg:text-2xl">
                <a href="/bookmark">
                    <i className="fa-solid fa-bookmark bg-primary text-white rounded-full p-2"></i>
                </a>
            </button>
            <button className="text-md lg:text-2xl">
                <a href="/heart">
                    <i className="fa-solid fa-heart bg-primary text-white rounded-full p-2"></i>
                </a>
            </button>
        </div>

        <br></br><br></br><br></br>
    </div>
    </>
  )
}
