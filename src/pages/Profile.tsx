
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { UserCircle2, Upload } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    name: "John",
    age: "",
    email: "",
    bio: "",
    profileImage: null as string | null
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserDetails(prev => ({
          ...prev,
          profileImage: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving user details:", userDetails);
  };

  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className={`min-h-screen ${isMobile ? 'w-full px-4' : 'w-[80vw] ml-auto mr-[10vw] px-8'} pt-[calc(80px+5vh)] pb-8`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold text-primary dark:text-white mb-8`}>Profile Settings</h1>
          
          <Card className="max-w-2xl mx-auto p-6 dark:bg-[#1A1F2C] dark:border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-32 h-32 mb-4">
                  {userDetails.profileImage ? (
                    <img
                      src={userDetails.profileImage}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-muted flex items-center justify-center">
                      <UserCircle2 className="w-16 h-16 text-muted-foreground dark:text-white/70" />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="profile-image"
                  />
                  <Label
                    htmlFor="profile-image"
                    className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Photo
                  </Label>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-foreground dark:text-white">Full Name</Label>
                  <Input
                    id="name"
                    value={userDetails.name}
                    onChange={(e) => setUserDetails(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                    className="dark:bg-background dark:text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="age" className="text-foreground dark:text-white">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={userDetails.age}
                    onChange={(e) => setUserDetails(prev => ({ ...prev, age: e.target.value }))}
                    placeholder="Enter your age"
                    className="dark:bg-background dark:text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-foreground dark:text-white">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userDetails.email}
                    onChange={(e) => setUserDetails(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email"
                    className="dark:bg-background dark:text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="bio" className="text-foreground dark:text-white">Bio</Label>
                  <textarea
                    id="bio"
                    value={userDetails.bio}
                    onChange={(e) => setUserDetails(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell us about yourself"
                    className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background text-sm dark:bg-background dark:text-white"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </form>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default Profile;
