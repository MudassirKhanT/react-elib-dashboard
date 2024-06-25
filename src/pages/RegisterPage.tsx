import { Card } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { CardDescription } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/http/api";
import { LoaderCircle } from "lucide-react";

const RegisterPage = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  //mutation
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      console.log("Login Successfull");
      //redirect to dashboard
      navigate("/dashboard/home");
    },
  });
  const handleRegisterSubmit = () => {
    const email = emailRef.current?.value;
    const password = passRef.current?.value;
    const name = nameRef.current?.value;
    //console.log("Data:", { email, password });
    if (!email || !password || !name) {
      return alert("please enter email and password");
    }
    // make server call using axios and react query
    mutation.mutate({ name, email, password });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
          {mutation.isError && <span className="text-red-500 text-sm">{"Something Went Wrong"}</span>}
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name"> Name</Label>
              <Input ref={nameRef} id="name" placeholder="Max" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input ref={emailRef} id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input ref={passRef} id="password" type="password" />
            </div>
            <Button onClick={handleRegisterSubmit} className="w-full " disabled={mutation.isPending}>
              {mutation.isPending && <LoaderCircle className="animate-spin" />}

              <span className="ml-2">Create an account</span>
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to={"/auth/login"} className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
