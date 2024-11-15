import { DeleteTaskDialog } from "@/components/delete-task-dialog";
import { StatusEnum, TableTasks, Tasks } from "@/components/table-tasks";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/shared/context/auth";
import { deleteTask, getTasks } from "@/shared/services/tasks-service";
import { LogOutIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const TasksPage = () => {
  const { logout } = useAuth();

  const [error, setError] = useState<boolean>(false);

  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Tasks[]>([]);

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const [idToDelete, setIdToDelete] = useState<string>();

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
    if (!error) {
      setIsLoading(true);
      timeoutId.current = setTimeout(async () => {
        try {
          const data = await getTasks({
            page,
            status: filterStatus,
            title: filterName,
          });

          setCanNextPage(data.currentPage < data.totalPages);
          setCanPrevPage(data.currentPage > 1);

          setTasks(data.tasks);
          setIsLoading(false);
        } catch (e) {
          setError(true);
          setIsLoading(false);
          console.error(e);
          toast({
            variant: "destructive",
            title: "Something went wrong",
            description:
              "An error occurred while fetching the tasks. Please try again later.",
          });
        }
      }, 500);
    }
  }, [page, filterStatus, filterName, error]);

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

  const handleRedirectRegisterTask = () => {
    navigate("/register-task");
  };

  const handleRedirectUpdateTask = (task: Tasks) => {
    navigate("/update-task", { state: { task } });
  };

  const handleDeleteTask = (id: string) => {
    setDialogOpen(true);
    setIdToDelete(id);
  };

  const onCancelDialog = () => {
    setIdToDelete(undefined);
    setDialogOpen(false);
  };

  const onSaveDialog = async () => {
    try {
      if (idToDelete) {
        await deleteTask(+idToDelete);
        setIdToDelete(undefined);
        setDialogOpen(false);
        await handleGetTasks();
      }
    } catch (e) {
      console.error(e);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description:
          "An error occurred while deleting the task. Please try again later.",
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    handleGetTasks();
  }, [handleGetTasks]);

  return (
    <>
      <div className="relative">
        <h1 className="font-bold">Welcome to Task Manager</h1>
        <Button
          className="absolute top-[-50px] right-0"
          variant="outline"
          size="icon"
          onClick={handleLogout}
        >
          <LogOutIcon />
        </Button>
      </div>
      <DeleteTaskDialog
        onSave={onSaveDialog}
        onCancel={onCancelDialog}
        open={dialogOpen}
      />
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
          handleCreateTask={handleRedirectRegisterTask}
          handleEditTask={handleRedirectUpdateTask}
          handleDeleteTask={handleDeleteTask}
        />
      </Card>
    </>
  );
};
