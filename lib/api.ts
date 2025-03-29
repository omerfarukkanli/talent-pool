import type { Candidate } from '@/lib/types';

// Mock data for candidates
const mockCandidates: Candidate[] = Array.from({ length: 100 }).map(
  (_, index) => ({
    id: `candidate-${index}`,
    name: 'Lara Steiner',
    email: 'mail@example.com',
    stage: ['Applied', 'Interview', 'Evaluation', 'Offer', 'Contacted'][
      Math.floor(Math.random() * 5)
    ],
    rating: Math.floor(Math.random() * 5) + 1,
    appliedJob: [
      'Frontend Dev',
      'Software Engineering',
      'Operations',
      'Design',
      'Finance',
    ][Math.floor(Math.random() * 5)],
    avatar: null,
    resume: true,
    aiFitScore: Math.floor(Math.random() * 100),
    source: ['LinkedIn', 'Indeed', 'Referral', 'Direct', 'Job Board'][
      Math.floor(Math.random() * 5)
    ],
    dateAdded: new Date(
      Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    ).toLocaleDateString(),
  })
);

// Function to fetch candidates with pagination and search
export async function fetchCandidates(
  page: number,
  searchQuery = ''
): Promise<Candidate[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const pageSize = 10;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Filter by search query if provided
  const filteredCandidates = searchQuery
    ? mockCandidates.filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          candidate.appliedJob.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockCandidates;

  // Return paginated results
  return filteredCandidates.slice(startIndex, endIndex);
}
