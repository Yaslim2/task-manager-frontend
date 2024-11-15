import { StatusEnum, TableTasks, Tasks } from "@/components/table-tasks";
import { Card } from "@/components/ui/card";
import { getTasks } from "@/shared/services/auth-service";
import { useCallback, useEffect, useRef, useState } from "react";

export const TasksPage = () => {
  const [tasks, setTasks] = useState<Tasks[]>([]);

  const [filterName, setFilterName] = useState<string>();

  const [filterStatus, setFilterStatus] = useState<StatusEnum>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);
  const [canNextPage, setCanNextPage] = useState<boolean>(false);

  const [canPrevPage, setCanPrevPage] = useState<boolean>(false);

  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const handleGetTasks = useCallback(async () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    setIsLoading(true);
    timeoutId.current = setTimeout(async () => {
      const data = await getTasks({
        page,
        status: filterStatus,
        title: filterName,
        limit: 1,
      });

      setCanNextPage(data.currentPage < data.totalPages);
      setCanPrevPage(data.currentPage > 1);

      setTasks(data.tasks);
      setIsLoading(false);
    }, 500);
  }, [page, filterStatus, filterName]);

  const handleNextPage = () => {
    setPage((value) => {
      return value + 1;
    });
  };

  const handlePrevPage = () => {
    setPage((value) => {
      return value - 1;
    });
  };

  useEffect(() => {
    handleGetTasks();
  }, [handleGetTasks]);

  return (
    <>
      <h1 className="font-bold">Welcome to Task Manager</h1>
      <Card className="w-[900px] p-4 mt-6">
        <TableTasks
          isLoading={isLoading}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          canNextPage={canNextPage}
          canPrevPage={canPrevPage}
          data={tasks}
          page={page}
          filterName={filterName}
          handleChangeFilterName={setFilterName}
          handleChangeStatus={setFilterStatus}
        />
      </Card>
    </>
  );
};
