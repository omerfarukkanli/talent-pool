'use client';

import React, {
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
} from 'react';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useAppSelector, useAppDispatch } from '@/hooks/use-app';
import { GET_CANDIDATES } from '@/lib/graphql/queries';
import type { ApplicantsResponse } from '@/lib/types';
import { useQuery } from '@apollo/client';
import { Loader2, Plus } from 'lucide-react';
import {
  setApplicants,
  addApplicants,
  setPage,
  setLoading,
  setError,
} from '@/lib/store/slices/talent-pool-slice';
import TalentPoolTableHeader from './TalentPoolTableHeader';
import TalentPoolTableCell from './TalentPoolTableCell';

const EmptyRow = React.memo(() => (
  <TableRow>
    <TableCell colSpan={8} className='h-24 text-center text-muted-foreground'>
      No applicants found
    </TableCell>
  </TableRow>
));

EmptyRow.displayName = 'EmptyRow';

const TalentPoolTable = () => {
  const dispatch = useAppDispatch();
  const {
    page,
    applicants,
    total,
    loading: storeLoading,
    error: storeError,
    sort,
    filter,
  } = useAppSelector((state) => state.talentPool);

  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const tableContainerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<HTMLDivElement>(null);
  const hasMoreData = useRef(true);
  const isInitialLoad = useRef(true);

  const queryVariables = useMemo(
    () => ({
      page: 1,
      sort,
      pageSize: 20,
      filter,
    }),
    [sort, filter]
  );
  const { fetchMore } = useQuery<ApplicantsResponse>(GET_CANDIDATES, {
    variables: queryVariables,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      if (page === 1) {
        dispatch(
          setApplicants({
            applicants: data.getCompanyApplicantList.applicants,
            total: data.getCompanyApplicantList.total,
          })
        );
      } else {
        hasMoreData.current =
          data.getCompanyApplicantList.applicants.length >= queryVariables.page;
      }
      dispatch(setError(null));
      isInitialLoad.current = false;
    },
    onError: (error) => {
      dispatch(setError(error.message));
      isInitialLoad.current = false;
    },
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
    storeLoading,
    applicants.length,
    total,
    page,
    dispatch,
    fetchMore,
    queryVariables,
  ]);

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      setSelectAll(checked);
      setSelectedApplicants(checked ? applicants.map((a) => a.id) : []);
    },
    [applicants]
  );

  const handleSelectApplicant = useCallback((id: string, checked: boolean) => {
    setSelectedApplicants((prev) =>
      checked ? [...prev, id] : prev.filter((appId) => appId !== id)
    );
  }, []);

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

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && !storeLoading && hasMoreData.current) {
        loadMore();
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: tableContainerRef.current,
      rootMargin: '200px',
      threshold: 0.1,
    });

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

  if (storeError) {
    return (
      <div className='p-4 rounded-md bg-red-50 text-red-500 border border-red-200'>
        <p className='font-medium'>Error loading applicants</p>
        <p className='text-sm'>{storeError}</p>
      </div>
    );
  }

  return (
    <div className='w-full'>
      <div
        ref={tableContainerRef}
        style={{ maxHeight: 'calc(100vh - 300px)', minHeight: '400px' }}
        className='overflow-auto'
      >
        <div className='inline-block min-w-full'>
          <div className='overflow-hidden'>
            <Table className='min-w-full'>
              <TalentPoolTableHeader
                selectAll={selectAll}
                handleSelectAll={handleSelectAll}
              />
              <TableBody>
                {applicants.length === 0 && !storeLoading ? (
                  <EmptyRow />
                ) : (
                  applicants.map((applicant) => (
                    <TalentPoolTableCell
                      key={applicant.id}
                      id={applicant.id}
                      applicant={applicant}
                      handleSelectApplicant={handleSelectApplicant}
                      selectedApplicants={selectedApplicants}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

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
