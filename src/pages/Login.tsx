import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "Vimarsh" && password === "Vimarshpos3") {
      // Set a flag in localStorage to maintain login state
      localStorage.setItem("isAuthenticated", "true");
      toast({
        title: "Success",
        description: "Successfully logged in!"
      });
      navigate("/");
    } else {
      toast({
        title: "Error",
        description: "Invalid credentials. Please try again.",
        variant: "destructive"
      });
    }
  };
  return <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md p-8 space-y-6 dark:bg-[#1A1F2C] dark:border-white/10 py-[26px] px-[44px]">
        <div className="text-center">
          <h1 className="text-3xl font-bold dark:text-white">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium dark:text-white">
              Username
            </label>
            <Input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter your username" className="dark:bg-background dark:text-white" />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium dark:text-white">
              Password
            </label>
            <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" className="dark:bg-background dark:text-white" />
          </div>

          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </Card>
    </div>;
};
export default Login;