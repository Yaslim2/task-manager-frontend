import { RegisterCard } from "@/components/register-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col justify-center items-center gap-[15px]">
      <div>
        <div className="relative">
          <Button
            className="absolute top-[-60px] left-[-15px]"
            variant="outline"
            size="icon"
            onClick={goBack}
          >
            <ChevronLeft />
          </Button>
          <h1 className="mb-1 font-bold">Task Manager</h1>
        </div>
        <h2 className="text-lg">
          Your tasks organized like you've never seen before!
        </h2>
      </div>
      <RegisterCard />
    </div>
  );
};
