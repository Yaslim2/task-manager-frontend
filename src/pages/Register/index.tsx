import { RegisterCard } from "@/components/register-card";
import { Button } from "@/components/ui/button";
import { createUser } from "@/shared/services/user-service";
import { isValidEmail } from "@/shared/utils/isValidEmail";
import { ChevronLeft } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleCreateUser = async () => {
    const request = { email, password, name };
    await createUser(request);

    navigate("/login");
  };

  const checkValid = useCallback(() => {
    const isEmail = isValidEmail(email);

    setIsValid(
      !!(name.length > 0 && email.length > 0 && password.length > 0 && isEmail)
    );
  }, [name, email, password]);

  useEffect(() => {
    checkValid();
  }, [checkValid]);

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
      <RegisterCard
        email={email}
        isValid={isValid}
        name={name}
        onSave={handleCreateUser}
        password={password}
        setEmail={setEmail}
        setName={setName}
        setPassword={setPassword}
      />
    </div>
  );
};
