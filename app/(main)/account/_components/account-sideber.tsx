
import { useLoggedInUser } from "@/hooks/use-loggedIn-user";
import Image from "next/image";
import { redirect } from "next/navigation";
import Menu from "./account-menu";
import ProfilePicture from "./profile-pic";

const AccountSidebar = async () => {
  const LoggedInUser = await useLoggedInUser();

  if (!LoggedInUser) {
    redirect("/login");
  }

  return (
    <>
      {" "}
      <div className="lg:w-1/4 md:px-3">
        <div className="relative">
          <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
            <div className="profile-pic text-center mb-5">
              <div className="relative size-28 mx-auto">
               <ProfilePicture firstName={LoggedInUser?.firstName}  profilePicture={LoggedInUser?.profilePicture} email={LoggedInUser?.email}  />
              </div>

              <div>
                <div className="mt-4">
                  <h5 className="text-lg font-semibold">
                    {LoggedInUser?.firstName} {LoggedInUser?.lastName}
                  </h5>
                  <p className="text-slate-400">{LoggedInUser?.email}</p>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-100 dark:border-gray-700">
              <Menu />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSidebar;
