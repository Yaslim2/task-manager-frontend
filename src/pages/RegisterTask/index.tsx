import { StatusEnum } from "@/components/table-tasks";
import { TaskCard } from "@/components/task-card";
import { Button } from "@/components/ui/button";
import { createTask } from "@/shared/services/tasks-service";
import { ChevronLeft } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const RegisterTask = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<StatusEnum>();

  const [isValid, setIsValid] = useState<boolean>(false);

  const handleCreateTask = async () => {
    const request = { title, description, status: status! };
    await createTask(request);

    goBack();
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
        onSave={handleCreateTask}
        titlePage="Register Task"
        descriptionPage="Create the task that you want to manage."
        buttonLabel="Create"
      />
    </>
  );
};
