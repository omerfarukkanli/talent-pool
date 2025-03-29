'use client';
import React from 'react';
import { SidebarInset } from './ui/sidebar';
import TalentPoolHeader from '@/components/talent-pool-header';
import TalentPoolEdit from './content/talent-pool-edit';
import { useEffect, useRef, useCallback, useState } from 'react';

import {
  fetchCandidates,
  incrementPage,
  setSortColumn,
} from '@/lib/store/slices/candidate-slice';
import { TalentPoolTable } from './content/talent-pool-table';
import { useAppDispatch, useAppSelector } from '@/hooks/use-app';

const AppContent = () => {
  const dispatch = useAppDispatch();
  const {
    items: candidates,
    status,
    hasMore,
    page,
    searchQuery,
    sortColumn,
    sortDirection,
  } = useAppSelector((state) => state.candidates);

  const loading = status === 'loading';
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastCandidateRef = useCallback(
    (node: HTMLTableRowElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(incrementPage());
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, dispatch]
  );

  useEffect(() => {
    dispatch(fetchCandidates({ page, searchQuery }));
  }, [dispatch, page, searchQuery]);

  const handleSort = (column: string) => {
    dispatch(setSortColumn(column));
  };

  return (
    <SidebarInset className='flex flex-col'>
      <TalentPoolHeader />
      <TalentPoolEdit />
      <TalentPoolTable
        candidates={candidates}
        loading={loading}
        lastCandidateRef={lastCandidateRef}
        onSort={handleSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        isMobile={isMobile}
      />
    </SidebarInset>
  );
};

export default AppContent;
