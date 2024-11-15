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

export const RegisterCard = ({
  email,
  isValid,
  name,
  onSave,
  password,
  setEmail,
  setName,
  setPassword,
}: {
  email: string;
  setEmail: (email: string) => void;
  name: string;
  setName: (name: string) => void;
  password: string;
  setPassword: (password: string) => void;
  isValid: boolean;
  onSave: () => Promise<void>;
}) => {
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
              <Label className="text-left" htmlFor="name">
                Name
              </Label>
              <Input
                value={name}
                onChange={(ev) => {
                  setName(ev.target.value);
                }}
                type="name"
                id="name"
                placeholder="Name"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="text-left" htmlFor="email">
                Email
              </Label>
              <Input
                value={email}
                onChange={(ev) => {
                  setEmail(ev.target.value);
                }}
                type="email"
                id="email"
                placeholder="Email"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="text-left" htmlFor="password">
                Password
              </Label>
              <Input
                value={password}
                onChange={(ev) => {
                  setPassword(ev.target.value);
                }}
                type="password"
                id="password"
                placeholder="Password"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Button onClick={onSave} disabled={!isValid} className="w-full">
          Register
        </Button>
      </CardFooter>
    </Card>
  );
};
