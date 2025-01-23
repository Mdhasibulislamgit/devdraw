'use client';

import React, { useRef } from 'react';
import DashboardHeader from '@/app/(routes)/dashboard/_components/DashboardHeader';
import DashboardTable from '@/app/(routes)/dashboard/_components/DashboardTable';

interface DashboardTableRef {
  handleSearch: (query: string) => void;
}

const DashboardClient = () => {
  const tableRef = useRef<DashboardTableRef>(null);

  const handleSearch = (query: string) => {
    if (tableRef.current) {
      tableRef.current.handleSearch(query);
    }
  };

  return (
    <div className="text-white">
      <DashboardHeader onSearch={handleSearch} />
      <DashboardTable ref={tableRef} />
    </div>
  );
};

export default DashboardClient;