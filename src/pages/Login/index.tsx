import { LoginCard } from "@/components/login-card";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/shared/context/auth";
import { authenticate } from "@/shared/services/auth-service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login } = useAuth();

  const navigate = useNavigate();

  const redirectToRegisterPage = () => {
    navigate("/register");
  };

  const handleLogin = async () => {
    try {
      const { access_token } = await authenticate({ password, email });

      login(access_token);

      navigate("/tasks", { replace: true });
    } catch (e) {
      console.error(e);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description:
          "The credentials that you are trying to login are invalid, try again.",
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-[15px]">
      <div>
        <h1 className="mb-1 font-bold">Task Manager</h1>
        <h2 className="text-lg">
          Your tasks organized like you've never seen before!
        </h2>
      </div>
      <LoginCard
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        loginCallback={handleLogin}
        registerCallback={redirectToRegisterPage}
      />
    </div>
  );
};
