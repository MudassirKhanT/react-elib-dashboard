import { Card } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { CardDescription } from "@/components/ui/card";
import { CardFooter } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/http/api";
import { LoaderCircle } from "lucide-react";

const Loginpage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  //mutation
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      console.log("Login Successfull");
      //redirect to dashboard
      navigate("/dashboard/home");
    },
  });
  const handleLoginSubmit = () => {
    const email = emailRef.current?.value;
    const password = passRef.current?.value;
    //console.log("Data:", { email, password });
    if (!email || !password) {
      return alert("please enter email and password");
    }
    // make server call using axios and react query
    mutation.mutate({ email, password });
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account.</CardDescription>
          {mutation.isError && <span className="text-red-500 text-sm">{"Incorrect Email or Password"}</span>}
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input ref={emailRef} id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input ref={passRef} id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <Button onClick={handleLoginSubmit} className="w-full " disabled={mutation.isPending}>
              {mutation.isPending && <LoaderCircle className="animate-spin" />}

              <span className="ml-2">Sign in</span>
            </Button>
            <div className="mt-4 text-center text-sm ">
              Don't have an account?{" "}
              <Link to={"/auth/register"} className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Loginpage;
