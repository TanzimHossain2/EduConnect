"use client";

import { changePassword } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

const ChangePassword = ({ email }: { email: string }) => {
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    retypePassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.newPassword !== password.retypePassword) {
      toast.error("New password and retype password does not match"); 
      return;
    }


    try {
       const res = await changePassword(email, password.oldPassword, password.newPassword);
 
        if (res.error) {
          toast.error(res.error);
          return;
        } else {
          toast.success(res.message);
        }

    } catch (err) {
      
    }
  };

  return (
    <>
      <div>
        <h5 className="text-lg font-semibold mb-4">Change password :</h5>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-5">
            <div>
              <Label className="mb-2 block">Old password :</Label>
              <Input
                type="password"
                id = "oldPassword"
                name="oldPassword"
                onChange={handleChange}
                placeholder="Old password"
                required
              />
            </div>
            <div>
              <Label className="mb-2 block">New password :</Label>
              <Input
                type="password"
                id = "newPassword"
                placeholder="New password"
                name="newPassword"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label className="mb-2 block">Re-type New password :</Label>
              <Input
                type="password"
                id = "retypePassword"
                name="retypePassword"
                onChange={handleChange}
                placeholder="Re-type New password"
                required
              />
            </div>
          </div>

          <Button className="mt-5 cursor-pointer" type="submit">
            Save password
          </Button>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
