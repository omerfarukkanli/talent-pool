import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface CVPreviewProps {
  candidate: {
    name: string;
    email: string;
    avatar: string | null;
  };
  position?: { top: number; left: number };
  isMobile: boolean;
}

export function CVPreview({ candidate, position, isMobile }: CVPreviewProps) {
  // Mock resume data - in a real app, this would come from an API
  const resumeData = {
    fullName: candidate.name,
    title: 'Software Developer',
    summary:
      'Due to graduate in 2016, I have acquired technical knowledge and skills from my course as well as practical and business skills from my industrial year in a software company in the Netherlands. I have used a range of languages, operating systems and development tools as well as experiencing the system development life cycle. Specializing in mobile technology.',
    personalDetails: {
      address: '14 Tottenham Court Road, London, W1T 1JY',
      phone: '+44 20 7946 0638',
      email: candidate.email,
      website: 'john-williams.com',
      linkedin: 'linkedin.com/in/john-williams',
    },
    workExperience: [
      {
        period: '2015 - present',
        title: 'Junior software developer',
        company: 'Explore the Web ltd, London',
        description:
          'Used a range of languages, operating systems and development tools as well as experiencing the system development life cycle. Specializing in mobile technology, I am keen to develop as a graduate trainee in software development.',
      },
      {
        period: '2007 - 2010',
        title: 'Website analyst',
        company: 'Quality ltd, London',
        bullets: [
          'Creating online analyses',
          'Writing personal branding plans',
          'Online marketing/plan operation voor de diverse titels',
          'Content marketing en content management',
        ],
      },
      {
        period: '2010 - 2013',
        title: 'Online marketing',
        company: 'Advertise, Manchester',
        bullets: [
          'Analyse and optimize positions within different search engines',
          'Search engine optimization',
          'Leading large linkbuilding activities',
          'On-site SEO research and writing optimization rapports',
        ],
      },
    ],
    education: [
      {
        period: 'Sep 2002 - Jun 2007',
        degree: 'Computer Science and Software Engineering',
        institution: 'University of London',
        description:
          'BSc Computer Science and Software Engineering with industrial year. Predicted 2:1. Modules include object oriented programming, mobile applications, AI and systems development.',
      },
      {
        period: 'Sep 1996 - Jun 2002',
        degree: 'BTEC Level 3 ICT and A-level maths',
        institution: 'Hartscastle College',
      },
    ],
    interests: ['Sports', 'Cooking', 'Reading'],
    languages: [
      { name: 'English', level: 5 },
      { name: 'Dutch', level: 4 },
      { name: 'Spanish', level: 3 },
      { name: 'German', level: 3 },
    ],
  };

  // Style for the preview card based on position and mobile state
  const previewStyle = isMobile
    ? {
        position: 'fixed' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: '500px',
        maxHeight: '80vh',
        zIndex: 100,
        overflowY: 'auto' as const,
      }
    : {
        position: 'absolute' as const,
        top: position?.top ? `${position.top}px` : '0',
        left: position?.left ? `${position.left}px` : '0',
        width: '800px',
        zIndex: 100,
      };

  return (
    <Card className='shadow-xl border-gray-200' style={previewStyle}>
      <CardContent className='p-0'>
        <div className='flex flex-col md:flex-row'>
          {/* Left sidebar with photo and personal details */}
          <div className='bg-blue-800 text-white p-6 md:w-1/3'>
            <div className='flex flex-col items-center mb-6'>
              <Avatar className='h-24 w-24 mb-4'>
                {candidate.avatar ? (
                  <AvatarImage
                    src={candidate.avatar}
                    alt={resumeData.fullName}
                  />
                ) : (
                  <AvatarFallback className='text-2xl bg-blue-600'>
                    {resumeData.fullName.charAt(0)}
                  </AvatarFallback>
                )}
              </Avatar>
              <h2 className='text-xl font-bold text-center'>
                {resumeData.fullName}
              </h2>
              <p className='text-sm text-blue-200 text-center'>
                {resumeData.title}
              </p>
            </div>

            <div className='space-y-4 text-sm'>
              <h3 className='font-semibold uppercase tracking-wider text-blue-200 mb-2'>
                Personal Details
              </h3>

              <div>
                <p className='font-semibold'>Address</p>
                <p className='text-blue-200'>
                  {resumeData.personalDetails.address}
                </p>
              </div>

              <div>
                <p className='font-semibold'>Phone number</p>
                <p className='text-blue-200'>
                  {resumeData.personalDetails.phone}
                </p>
              </div>

              <div>
                <p className='font-semibold'>Email address</p>
                <p className='text-blue-200'>
                  {resumeData.personalDetails.email}
                </p>
              </div>

              <div>
                <p className='font-semibold'>Online website</p>
                <p className='text-blue-200'>
                  {resumeData.personalDetails.website}
                </p>
              </div>

              <div>
                <p className='font-semibold'>LinkedIn</p>
                <p className='text-blue-200'>
                  {resumeData.personalDetails.linkedin}
                </p>
              </div>
            </div>

            <div className='mt-6'>
              <h3 className='font-semibold uppercase tracking-wider text-blue-200 mb-2'>
                Interests
              </h3>
              <ul className='list-disc pl-5 text-blue-200'>
                {resumeData.interests.map((interest, index) => (
                  <li key={index}>{interest}</li>
                ))}
              </ul>
            </div>

            <div className='mt-6'>
              <h3 className='font-semibold uppercase tracking-wider text-blue-200 mb-2'>
                Languages
              </h3>
              {resumeData.languages.map((language, index) => (
                <div key={index} className='mb-2'>
                  <p className='font-semibold'>{language.name}</p>
                  <div className='flex'>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 w-2 rounded-full mr-1 ${
                          i < language.level ? 'bg-white' : 'bg-blue-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right content area */}
          <div className='p-6 md:w-2/3 bg-white'>
            <p className='text-gray-700 mb-6'>{resumeData.summary}</p>

            <div className='mb-6'>
              <div className='flex items-center mb-4'>
                <div className='bg-blue-800 rounded-full p-1 mr-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 text-white'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                    />
                  </svg>
                </div>
                <h3 className='text-lg font-bold'>WORK EXPERIENCE</h3>
              </div>

              {resumeData.workExperience.map((job, index) => (
                <div key={index} className='mb-4 flex'>
                  <div className='w-24 flex-shrink-0 text-gray-500 text-sm'>
                    {job.period}
                  </div>
                  <div className='flex-grow'>
                    <h4 className='font-bold'>{job.title}</h4>
                    <p className='text-gray-600 text-sm'>{job.company}</p>
                    {job.description && (
                      <p className='text-sm mt-1'>{job.description}</p>
                    )}
                    {job.bullets && (
                      <ul className='list-disc pl-5 text-sm mt-1'>
                        {job.bullets.map((bullet, i) => (
                          <li key={i}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className='flex items-center mb-4'>
                <div className='bg-blue-800 rounded-full p-1 mr-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 text-white'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path d='M12 14l9-5-9-5-9 5 9 5z' />
                    <path d='M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z' />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222'
                    />
                  </svg>
                </div>
                <h3 className='text-lg font-bold'>
                  EDUCATION AND QUALIFICATIONS
                </h3>
              </div>

              {resumeData.education.map((edu, index) => (
                <div key={index} className='mb-4 flex'>
                  <div className='w-24 flex-shrink-0 text-gray-500 text-sm'>
                    {edu.period}
                  </div>
                  <div className='flex-grow'>
                    <h4 className='font-bold'>{edu.degree}</h4>
                    <p className='text-gray-600 text-sm'>{edu.institution}</p>
                    {edu.description && (
                      <p className='text-sm mt-1'>{edu.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
