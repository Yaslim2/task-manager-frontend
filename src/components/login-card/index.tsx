import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FC, useState } from "react";

type LoginCardProps = {
  loginCallback: (data: { email: string; password: string }) => Promise<void>;
  registerCallback: () => void;
};

export const LoginCard: FC<LoginCardProps> = ({
  loginCallback,
  registerCallback,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <Card className="w-[410px]">
      <CardHeader>
        <CardTitle>Manage your tasks</CardTitle>
        <CardDescription>Organize your tasks very easily.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label className="text-left" htmlFor="email">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="text-left" htmlFor="password">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Button
          onClick={() => {
            loginCallback({ email, password });
          }}
          className="w-full"
        >
          Login
        </Button>
        <hr className="border-t-[1.5px] border-solid border-t-gray-300 w-full" />
        <p className="text-sm text-gray-500">Don't have an account?</p>
        <hr className="border-t-[1.5px] border-solid border-t-gray-300 w-full" />
        <Button onClick={registerCallback} className="w-full" variant="outline">
          Create account
        </Button>
      </CardFooter>
    </Card>
  );
};
