import { StatusEnum, Tasks } from "@/components/table-tasks";
import { TaskCard } from "@/components/task-card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { updateTask } from "@/shared/services/tasks-service";
import { ChevronLeft } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const UpdateTask = () => {
  const location = useLocation();
  const {
    id,
    title: initialTitle,
    description: initialEmail,
    status: initialStatus,
  } = (location.state.task as Tasks) || {};

  const navigate = useNavigate();
  const [title, setTitle] = useState<string>(initialTitle);
  const [description, setDescription] = useState<string>(initialEmail);
  const [status, setStatus] = useState<StatusEnum | undefined>(initialStatus);

  const [isValid, setIsValid] = useState<boolean>(false);

  const handleUpdateTask = async () => {
    try {
      const request = { title, description, status: status! };
      await updateTask(+id, request);

      goBack();
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description:
          "An error occurred while updating the task. Please try again later.",
      });
    }
  };

  const goBack = () => {
    navigate("/tasks");
  };

  const checkValid = useCallback(() => {
    setIsValid(!!(title.length > 0 && description.length > 0 && status));
  }, [title, description, status]);

  useEffect(() => {
    checkValid();
  }, [checkValid]);

  return (
    <>
      <div className="relative">
        <Button
          className="absolute top-[-60px] left-[-15px]"
          variant="outline"
          size="icon"
          onClick={goBack}
        >
          <ChevronLeft />
        </Button>
        <h1 className="mb-4 font-bold">Task Manager</h1>
      </div>

      <TaskCard
        title={title}
        description={description}
        setDescription={setDescription}
        setStatus={setStatus}
        setTitle={setTitle}
        isValid={isValid}
        onSave={handleUpdateTask}
        status={status}
        descriptionPage="Update the task that you want to manage."
        titlePage="Update Task"
        buttonLabel="Update"
      />
    </>
  );
};
