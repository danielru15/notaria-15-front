import { Table } from 'antd';
import { useState } from 'react'

const ReusableTable = ({columns, dataSource, rowClassName}:any) => {
    const [pageSize, setPageSize] = useState<number>(5);
    const [currentPage, setCurrentPage] = useState<number>(1);


  const handlePaginationChange = (page: number, newPageSize: number) => {
    setCurrentPage(page);
    if (newPageSize !== pageSize) {
      setPageSize(newPageSize);
      setCurrentPage(1); // Reset to first page when page size changes
    }
  }
  const paginationConfig = {
    current: currentPage,
    pageSize: pageSize,
    total: dataSource?.length || 0,
    showSizeChanger: true,
    pageSizeOptions: ['5', '10', '20', '50'],
    showTotal: (total: number) => `Total ${total} casos`,
    onChange: handlePaginationChange,
    onShowSizeChange: handlePaginationChange, // Specifically handles size changes
  }
  return (
    <Table
    columns={columns}
    dataSource={dataSource}
    rowKey={(record) => record.id}
    scroll={{ x: "max-content" }}
    pagination={dataSource?.length > 2 ? paginationConfig : false}
    rowClassName={rowClassName}
    />
  )
}

export default ReusableTable