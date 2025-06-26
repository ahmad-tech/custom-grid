import { IPagination } from "@/types/grid";
import React from "react";
import {
  ChevronRight,
  ChevronLeft,
  ChevronLast,
  ChevronFirst,
} from "lucide-react";

interface IServerPaginationProps {
  paginationProps: IPagination;
  data?: Record<string, unknown>[];
}

const ServerPagination: React.FC<IServerPaginationProps> = ({
  paginationProps,
  data = [],
}) => {
  const {
    paginationPageSize = 10,
    paginationPageSizeSelector = [10],
    paginationInfo,
    onPageChange,
    onPageSizeChange,
  } = paginationProps || {};

  // to handle navigation between pages
  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  // to handle navigation between page size
  const handlePageSizeChange = (size: number) => {
    if (onPageSizeChange) {
      onPageSizeChange(size);
    }
  };

  const pageSize = paginationInfo?.pageSize || paginationPageSize;
  const currentPage = paginationInfo?.page || 1;
  const totalPages = paginationInfo?.totalPages || 1;

  return (
    <>
      {paginationProps && data?.length && (
        <div className="w-full py-1 pr-4 bg-white mt-2 bg flex items-center gap-6 justify-end">
          <div className="flex items-center gap-2">
            <h2>Page Size</h2>

            <select
              className="border rounded px-2"
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            >
              {paginationPageSizeSelector?.map((size: number) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <h2>
            {data.length === 0
              ? "0"
              : `${((currentPage - 1) * pageSize + 1).toLocaleString()} to ${(
                  (currentPage - 1) * pageSize +
                  data.length
                ).toLocaleString()} of `}
            <strong>
              {paginationInfo?.totalCount?.toLocaleString() ??
                data.length?.toLocaleString()}
            </strong>
          </h2>

          <div className="flex items-center gap-1">
            <button
              disabled={currentPage === 1}
              className={`cursor-pointer ${
                currentPage === 1 ? "text-gray-500" : ""
              }`}
              onClick={() => handlePageChange(1)}
            >
              <ChevronFirst size={15} />
            </button>

            <button
              disabled={currentPage === 1}
              className={`cursor-pointer ${
                currentPage === 1 ? "text-gray-500" : ""
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <ChevronLeft size={15} />
            </button>

            <h2>
              Page {currentPage?.toLocaleString()} of{" "}
              {totalPages?.toLocaleString()}
            </h2>

            <button
              disabled={currentPage === totalPages}
              className={`cursor-pointer ${
                currentPage === totalPages ? "text-gray-500" : ""
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <ChevronRight size={15} />
            </button>

            <button
              disabled={currentPage === totalPages}
              className={`cursor-pointer ${
                currentPage === totalPages ? "text-gray-500" : ""
              }`}
              onClick={() => handlePageChange(totalPages || 1)}
            >
              <ChevronLast size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ServerPagination;
