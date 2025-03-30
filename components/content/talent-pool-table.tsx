import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAppSelector } from '@/hooks/use-app';
import { GET_CANDIDATES } from '@/lib/graphql/queries';
import { Applicant, ApplicantsResponse } from '@/lib/types';
import { useQuery } from '@apollo/client';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { useEffect, useState, useCallback, useRef, useMemo, memo } from 'react';

const LoadingRow = () => (
  <TableRow>
    <TableCell colSpan={9} className='h-24 text-center'>
      <Loader2 className='w-6 h-6 mx-auto animate-spin' />
    </TableCell>
  </TableRow>
);

const EmptyRow = () => (
  <TableRow>
    <TableCell colSpan={9} className='h-24 text-center text-muted-foreground'>
      No applicants found
    </TableCell>
  </TableRow>
);

const TalentPoolTable = () => {
  const { columnVisibility } = useAppSelector((state) => state.ui);
  const [page, setPage] = useState(1);
  const observerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const hasMoreData = useRef(true);
  const isInitialLoad = useRef(true);
  const loadingMore = useRef(false);

  // Query variables memoized to prevent unnecessary re-renders
  const queryVariables = useMemo(
    () => ({
      page: 1,
      sort: { createdAt: 'desc' },
      pageSize: 24,
      filter: {
        isFavoriteApplicant: false,
        filterParameters: [
          {
            filterVariable: '',
            logicalOperator: 'AND',
            name: 'fullName',
            operator: 'contains',
          },
        ],
      },
    }),
    []
  );

  const { data, loading, error, fetchMore } = useQuery<ApplicantsResponse>(
    GET_CANDIDATES,
    {
      variables: queryVariables,
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    }
  );

  // Memoize applicants array to prevent unnecessary re-renders
  const applicants = useMemo(
    () => data?.getCompanyApplicantList?.applicants || [],
    [data?.getCompanyApplicantList?.applicants]
  );

  const totalApplicants = data?.getCompanyApplicantList?.total || 0;
  const hasReachedEnd = applicants.length >= totalApplicants;

  // Optimized load more function with debounce protection
  const loadMore = useCallback(async () => {
    if (
      loading ||
      loadingMore.current ||
      !data?.getCompanyApplicantList ||
      !hasMoreData.current ||
      applicants.length >= totalApplicants
    ) {
      return;
    }

    loadingMore.current = true;
    const nextPage = page + 1;

    try {
      await fetchMore({
        variables: {
          ...queryVariables,
          page: nextPage,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          // Check if we've reached the end of the data
          if (fetchMoreResult.getCompanyApplicantList.applicants.length === 0) {
            hasMoreData.current = false;
            return prev;
          }

          // Merge previous and new applicants
          return {
            getCompanyApplicantList: {
              ...fetchMoreResult.getCompanyApplicantList,
              applicants: [
                ...prev.getCompanyApplicantList.applicants,
                ...fetchMoreResult.getCompanyApplicantList.applicants,
              ],
            },
          };
        },
      });
      setPage(nextPage);
    } catch (err) {
      console.error('Error fetching more data:', err);
      hasMoreData.current = false;
    } finally {
      loadingMore.current = false;
    }
  }, [
    data,
    loading,
    page,
    fetchMore,
    applicants.length,
    totalApplicants,
    queryVariables,
  ]);

  // Reset pagination when query parameters change
  useEffect(() => {
    setPage(1);
    hasMoreData.current = true;
    isInitialLoad.current = true;
  }, [queryVariables]);

  // Optimized intersection observer setup
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !loading && hasMoreData.current) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: '200px', // Load earlier for smoother experience
        threshold: 0.1,
      }
    );

    const currentObserver = observerRef.current;
    if (currentObserver) {
      observer.observe(currentObserver);
    }

    return () => {
      if (currentObserver) {
        observer.unobserve(currentObserver);
      }
      observer.disconnect();
    };
  }, [loadMore, loading]);

  const ApplicantRow = memo(({ applicant }: { applicant: Applicant }) => (
    <TableRow className='group hover:bg-muted/50 data-[state=selected]:bg-muted'>
      <TableCell>{`${applicant.firstName} ${applicant.lastName}`}</TableCell>
      <TableCell>{applicant.email}</TableCell>
      <TableCell>{applicant.activeApplication.stage.name}</TableCell>
      <TableCell>{applicant.activeApplication.aiFit ?? 'N/A'}</TableCell>
      <TableCell>-</TableCell>
      <TableCell>{applicant.rating}</TableCell>
      <TableCell>
        {format(new Date(applicant.createdAt), 'dd.MM.yyyy HH:mm')}
      </TableCell>
      <TableCell>
        <div className='flex items-center gap-2'>
          <div
            className='w-2 h-2 rounded-full'
            style={{
              backgroundColor: applicant.activeApplication.jobListing.color,
            }}
          />
          {applicant.activeApplication.jobListing.name}
        </div>
      </TableCell>
      <TableCell>
        {applicant.activeApplication.resume ? (
          <a
            href={applicant.activeApplication.resume.url}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-500 hover:underline'
          >
            View
          </a>
        ) : (
          'N/A'
        )}
      </TableCell>
    </TableRow>
  ));
  ApplicantRow.displayName = 'ApplicantRow';
  if (loading && isInitialLoad.current && applicants.length === 0) {
    return (
      <div className='w-full'>
        <Table>
          <TableHeader className='sticky top-0 bg-white z-10 border-b'>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Ai Fit Score</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead>Applied Job</TableHead>
              <TableHead>Resume</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <LoadingRow />
          </TableBody>
        </Table>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className='p-4 rounded-md bg-red-50 text-red-500 border border-red-200'>
        <p className='font-medium'>Error loading applicants</p>
        <p className='text-sm'>{error.message}</p>
      </div>
    );
  }

  // After first successful load, set isInitialLoad to false
  if (applicants.length > 0 && isInitialLoad.current) {
    isInitialLoad.current = false;
  }

  return (
    <div className='relative w-full' ref={parentRef}>
      <div className='overflow-x-auto'>
        <Table>
          <TableHeader className='sticky top-0 bg-white z-10 border-b'>
            <TableRow>
              <TableHead className='whitespace-nowrap'>Name</TableHead>
              <TableHead className='whitespace-nowrap'>Email</TableHead>
              <TableHead className='whitespace-nowrap'>Stage</TableHead>
              <TableHead className='whitespace-nowrap'>Ai Fit Score</TableHead>
              <TableHead className='whitespace-nowrap'>Source</TableHead>
              <TableHead className='whitespace-nowrap'>Rating</TableHead>
              <TableHead className='whitespace-nowrap'>Date Added</TableHead>
              <TableHead className='whitespace-nowrap'>Applied Job</TableHead>
              <TableHead className='whitespace-nowrap'>Resume</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {applicants.length === 0 && !loading ? (
              <EmptyRow />
            ) : (
              applicants.map((applicant) => (
                <ApplicantRow key={applicant.id} applicant={applicant} />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Loading indicator for subsequent loads */}
      {loading && !isInitialLoad.current && (
        <div className='flex justify-center py-4'>
          <Loader2 className='w-6 h-6 animate-spin' />
        </div>
      )}

      {/* Intersection observer target */}
      {!hasReachedEnd && (
        <div ref={observerRef} className='h-10 w-full' aria-hidden='true' />
      )}

      {/* End of results message */}
      {hasReachedEnd && applicants.length > 0 && (
        <div className='text-center py-4 text-muted-foreground'>
          Tüm adaylar yüklendi
        </div>
      )}
    </div>
  );
};

export default TalentPoolTable;
