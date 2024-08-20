"use client";

import { updateUserInfo } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { IUser } from "@/interface/courses";
import { useState } from "react";

interface PersonalDetailsProps {
  userinfo: IUser;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ userinfo }) => {
  const [infoState, setInfoState] = useState({
    firstName: userinfo.firstName || '',
    lastName: userinfo.lastName || '',
    email: userinfo.email || '',
    designation: userinfo.designation || '',
    bio: userinfo.bio || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setInfoState({
      ...infoState,
      [name]: value,
    });

  };

  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
    try {
      const res =  await updateUserInfo(infoState.email, infoState);

      if (res.code ===200) {
        toast.success(res.message, {duration: 2000});
      } else {
        toast.error(res.error);
      }
      
    } catch (err) {
      console.log(err);
    }


  }

  return (
    <>
      <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
        <h5 className="text-lg font-semibold mb-4">Personal Detail :</h5>
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
            <div>
              <Label className="mb-2 block">
                First Name : <span className="text-red-600">*</span>
              </Label>
              <Input
                type="text"
                placeholder="First Name:"
                id="firstname"
                name="firstName"
                value={infoState.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label className="mb-2 block">
                Last Name : <span className="text-red-600">*</span>
              </Label>
              <Input
                type="text"
                placeholder="Last Name:"
                name="LastName"
                onChange={handleChange}
                value={infoState.lastName}
                required
              />
            </div>
            <div>
              <Label className="mb-2 block">
                Your Email : <span className="text-red-600">*</span>
              </Label>
              <Input
                type="email"
                placeholder="Email"
                name="email"
                value={infoState.email}
                disabled
              />
            </div>
            <div>
              <Label className="mb-2 block">Occupation :</Label>
              <Input
                name="designation"
                id="occupation"
                type="text"
                onChange={handleChange}
                value={infoState.designation}
                placeholder="Occupation :"
              />
            </div>
          </div>

          <div className="grid grid-cols-1">
            <div className="mt-5">
              <Label className="mb-2 block">Bio :</Label>
              <Textarea
                id="bio"
                name="bio"
                onChange={handleChange}
                value={infoState.bio}
                placeholder="Enter your Bio :"
              />
            </div>
          </div>

          <Button className="mt-5 cursor-pointer" asChild>
            <input type="submit" name="send" value="Save Changes" />
          </Button>
        </form>
      </div>
    </>
  );
};

export default PersonalDetails;
