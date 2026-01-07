import { twMerge } from "tailwind-merge";

import { useState } from "react";
import ChevronIcon from "../icons/ChevronIcon";
import ChevronArrowLeftIcon from "../icons/ChevronArrowLeftIcon";

interface PaginationProps {
  currentPage: number;
  onChanged: (page: number, limit: number) => void;
  maxVisible?: number;
  itemsPerPage: number;
  totalItems: number;
  isLoading?: boolean;
}

interface PageItem {
  type: "number" | "dots";
  value: number;
  label: string | number;
}

export const Pagination = ({
  currentPage,
  onChanged,
  maxVisible = 8,
  itemsPerPage,
  totalItems,
  isLoading,
}: PaginationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [page, setPage] = useState<number>(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handleChangedPage = (page: number) => {
    onChanged(page, itemsPerPage);
  };
  const handleChangedLimit = (limit: number) => {
    onChanged(currentPage, limit);
  };
  const getPageNumbers = (): PageItem[] => {
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => ({
        type: "number",
        value: i + 1,
        label: i + 1,
      }));
    }

    const sideItems = Math.floor((maxVisible - 3) / 2);
    const leftLimit = Math.max(2, currentPage - sideItems);
    const rightLimit = Math.min(totalPages - 1, currentPage + sideItems);

    const pages: PageItem[] = [];
    pages.push({ type: "number", value: 1, label: 1 });

    if (leftLimit > 2) {
      const leftJump = Math.floor((leftLimit + 1) / 2);
      pages.push({ type: "dots", value: leftJump, label: "..." });
    }

    for (let i = leftLimit; i <= rightLimit; i++) {
      pages.push({ type: "number", value: i, label: i });
    }

    if (rightLimit < totalPages - 1) {
      const rightJump = Math.floor((rightLimit + totalPages) / 2);
      pages.push({ type: "dots", value: rightJump, label: "..." });
    }

    if (totalPages > 1) {
      pages.push({ type: "number", value: totalPages, label: totalPages });
    }

    return pages;
  };

  if (totalItems === 0 || totalItems < itemsPerPage) {
    return <></>;
  }

  return (
    <div
      className={twMerge(
        "flex justify-between py-4 text-sm pb-10",
        isLoading && "hidden"
      )}
    >
      <div className="flex items-center gap-1.5 text-agent-dashboard-primary font-inter text-xs">
        <p>Afficher</p>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="relative h-7 w-[52px] bg-white rounded-lg pr-3 flex items-center justify-end gap-x-1 cursor-pointer"
        >
          <p className="font-medium">{itemsPerPage}</p>
          <ChevronIcon className="rotate-180 w-1.5 h-1 shrink-0" />
          {isOpen && (
            <ul className="absolute bottom-[100%] inset-x-0 mx-auto overflow-y-auto bg-white w-full h-[100px] text-agent-dashboard-primary shadow-agent-card">
              {[10, 20, 30, 40, 50].map((_, i) => (
                <li
                  key={i}
                  onClick={() => handleChangedLimit(_)}
                  className={twMerge(
                    "px-2 py-1 text-center hover:bg-agent-dashboard-secondaryText/50 transition-all",
                    itemsPerPage === _ && "bg-agent-dashboard-secondaryText/50"
                  )}
                >
                  {_}
                </li>
              ))}
            </ul>
          )}
        </div>
        <p>par page</p>
      </div>
      <div className="flex items-center gap-x-1">
        <button
          onClick={() => currentPage > 1 && handleChangedPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={twMerge(
            "w-8 h-8 flex items-center justify-center rounded-full text-agent-dashboard-primary bg-white border border-[#E2E8F0]",
            "hover:bg-bgTabBar disabled:hover:bg-transparent outline-none"
          )}
          aria-label="Page précédente"
        >
          <ChevronArrowLeftIcon
            className="w-4 h-4"
            color={currentPage === 1 ? "#D1D5DB" : "#000"}
          />
        </button>

        {getPageNumbers().map((page, index) => (
          <button
            key={`pagination-component-${index}`}
            onClick={() => handleChangedPage(page.value)}
            className={twMerge(
              "w-8 h-8 flex items-center justify-center rounded-full",
              "text-agent-dashboard-primary bg-white border border-[#E2E8F0] hover:bg-bgTabBar",
              currentPage === page.value ? "bg-[#F1F5F9]" : "",
              page.type === "dots"
                ? "text-agent-dashboard-primary hover:bg-bgTabBar"
                : ""
            )}
            title={
              page.type === "dots"
                ? `Aller à la page ${page.value}`
                : `Page ${page.value}`
            }
          >
            {page.label}
          </button>
        ))}

        <button
          onClick={() =>
            currentPage < totalPages && handleChangedPage(currentPage + 1)
          }
          disabled={currentPage === totalPages}
          className={twMerge(
            "w-8 h-8 flex items-center justify-center rounded-full text-agent-dashboard-primary bg-white border border-[#E2E8F0]",
            "hover:bg-bgTabBar disabled:hover:bg-transparent"
          )}
          aria-label="Page suivante"
        >
          <ChevronArrowLeftIcon
            className="-rotate-180 w-4 h-4"
            color={currentPage === totalPages ? "#D1D5DB" : "#000"}
          />
        </button>
      </div>
    </div>
  );
};
