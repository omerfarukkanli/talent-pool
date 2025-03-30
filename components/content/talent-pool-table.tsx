'use client';

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useAppSelector, useAppDispatch } from '@/hooks/use-app';
import { GET_CANDIDATES } from '@/lib/graphql/queries';
import { ApplicantsResponse } from '@/lib/types';
import { useQuery } from '@apollo/client';
import { Loader2, Plus } from 'lucide-react';
import { useEffect, useCallback, useRef, useMemo, useState } from 'react';
import {
  setApplicants,
  addApplicants,
  setPage,
  setLoading,
  setError,
} from '@/lib/store/slices/talent-pool-slice';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/use-media-query';
import ApplicantCard from './applicant-card';
import ApplicantTableCell from './applicant-table-cell';
import ApplicantTableHeader from './applicant-table-header';

const EmptyRow = () => (
  <TableRow>
    <TableCell colSpan={8} className='h-24 text-center text-muted-foreground'>
      No applicants found
    </TableCell>
  </TableRow>
);

const TalentPoolTable = () => {
  const dispatch = useAppDispatch();

  const {
    page,
    applicants,
    total,
    loading: storeLoading,
    error: storeError,
  } = useAppSelector((state) => state.talentPool);

  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const tableContainerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<HTMLDivElement>(null);
  const hasMoreData = useRef(true);
  const isInitialLoad = useRef(true);

  const queryVariables = useMemo(
    () => ({
      page: 1,
      sort: { createdAt: 'desc' },
      pageSize: 20,
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

  const { fetchMore } = useQuery<ApplicantsResponse>(GET_CANDIDATES, {
    variables: queryVariables,
    onCompleted: (data) => {
      if (page === 1) {
        dispatch(
          setApplicants({
            applicants: data.getCompanyApplicantList.applicants,
            total: data.getCompanyApplicantList.total,
          })
        );
      }
      dispatch(setError(null));
      isInitialLoad.current = false;
    },
    onError: (error) => {
      dispatch(setError(error.message));
      isInitialLoad.current = false;
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });

  const loadMore = useCallback(async () => {
    if (storeLoading || !hasMoreData.current || applicants.length >= total)
      return;

    const nextPage = page + 1;
    dispatch(setLoading(true));

    try {
      await fetchMore({
        variables: {
          ...queryVariables,
          page: nextPage,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          const newApplicants =
            fetchMoreResult.getCompanyApplicantList.applicants;
          if (newApplicants.length === 0) {
            hasMoreData.current = false;
            return prev;
          }

          dispatch(addApplicants(newApplicants));
          return {
            getCompanyApplicantList: {
              ...fetchMoreResult.getCompanyApplicantList,
              applicants: [
                ...prev.getCompanyApplicantList.applicants,
                ...newApplicants,
              ],
            },
          };
        },
      });
      dispatch(setPage(nextPage));
    } catch (err) {
      console.error('Error fetching more data:', err);
      hasMoreData.current = false;
      dispatch(setError((err as Error).message));
    } finally {
      dispatch(setLoading(false));
    }
  }, [
    dispatch,
    storeLoading,
    page,
    fetchMore,
    applicants.length,
    total,
    queryVariables,
  ]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !storeLoading && hasMoreData.current) {
          loadMore();
        }
      },
      {
        root: tableContainerRef.current,
        rootMargin: '200px',
        threshold: 0.1,
      }
    );

    const currentObserver = observerRef.current;
    if (currentObserver) observer.observe(currentObserver);

    return () => {
      if (currentObserver) observer.unobserve(currentObserver);
      observer.disconnect();
    };
  }, [loadMore, storeLoading]);

  useEffect(() => {
    hasMoreData.current = true;
    isInitialLoad.current = true;
    return () => {
      dispatch(setPage(1));
      dispatch(setApplicants({ applicants: [], total: 0 }));
    };
  }, [queryVariables, dispatch]);

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedApplicants(applicants.map((a) => a.id));
    } else {
      setSelectedApplicants([]);
    }
  };

  const handleSelectApplicant = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedApplicants((prev) => [...prev, id]);
    } else {
      setSelectedApplicants((prev) => prev.filter((appId) => appId !== id));
    }
  };
  useEffect(() => {
    if (
      applicants.length > 0 &&
      selectedApplicants.length === applicants.length
    ) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedApplicants, applicants]);

  // Mobile loading state
  if (
    isMobile &&
    storeLoading &&
    isInitialLoad.current &&
    applicants.length === 0
  ) {
    return (
      <div className='w-full p-4 flex justify-center'>
        <Loader2 className='w-8 h-8 animate-spin' />
      </div>
    );
  }

  if (storeError) {
    return (
      <div className='p-4 rounded-md bg-red-50 text-red-500 border border-red-200'>
        <p className='font-medium'>Error loading applicants</p>
        <p className='text-sm'>{storeError}</p>
      </div>
    );
  }

  // Define column widths

  if (isMobile) {
    return (
      <div className='w-full border rounded-md overflow-hidden'>
        <div className='border-b p-3 flex items-center'>
          <Checkbox
            checked={selectAll}
            onCheckedChange={handleSelectAll}
            className='mr-3'
          />
          <span className='font-medium'>Select All</span>
          <span className='ml-auto text-sm text-muted-foreground'>
            {applicants.length} applicants
          </span>
        </div>
        <div
          ref={tableContainerRef}
          className='p-3 max-h-[600px] overflow-auto'
        >
          {applicants.length === 0 && !storeLoading ? (
            <div className='text-center py-8 text-muted-foreground'>
              No applicants found
            </div>
          ) : (
            applicants.map((applicant) => (
              <ApplicantCard
                key={applicant.id}
                applicant={applicant}
                isSelected={selectedApplicants.includes(applicant.id)}
                onSelect={(checked) =>
                  handleSelectApplicant(applicant.id, checked as boolean)
                }
              />
            ))
          )}
          {storeLoading && !isInitialLoad.current && (
            <div className='flex justify-center py-4'>
              <Loader2 className='w-6 h-6 animate-spin' />
            </div>
          )}
          <div ref={observerRef} className='h-1 w-full' aria-hidden='true' />
        </div>
        <div className='py-3 px-4 border-t'>
          <Button variant='ghost' size='sm' className='text-primary p-0 h-auto'>
            <Plus className='mr-1 h-4 w-4' />
            Add Talent
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full overflow-hidden'>
      <div
        ref={tableContainerRef}
        className='relative w-full h-[570px] overflow-auto'
      >
        <Table className='w-full overflow-x-scroll'>
          <ApplicantTableHeader
            selectAll={selectAll}
            handleSelectAll={handleSelectAll}
          />
          <TableBody>
            {applicants.length === 0 && !storeLoading ? (
              <EmptyRow />
            ) : (
              applicants.map((applicant) => (
                <ApplicantTableCell
                  id={applicant.id}
                  applicant={applicant}
                  key={applicant.id}
                  handleSelectApplicant={handleSelectApplicant}
                  selectedApplicants={selectedApplicants}
                />
              ))
            )}
          </TableBody>
        </Table>

        {storeLoading && !isInitialLoad.current && (
          <div className='flex justify-center py-4'>
            <Loader2 className='w-6 h-6 animate-spin' />
          </div>
        )}

        <div ref={observerRef} className='h-1 w-full' aria-hidden='true' />
      </div>

      <div className='py-0 border-t'>
        <button className='w-60 rounded-none border-t-0 flex justify-center items-center gap-2 px-8 h-10 border text-xs'>
          <Plus className='mr-1 h-4 w-4' />
          Add Talent
        </button>
      </div>
    </div>
  );
};

export default TalentPoolTable;
