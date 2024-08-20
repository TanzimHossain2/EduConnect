import { useLoggedInUser } from "@/hooks/uese-loggedIn-user";
import Image from "next/image";
import { redirect } from "next/navigation";
import Menu from "./account-menu";

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
              <input
                id="pro-img"
                name="profile-image"
                type="file"
                className="hidden"
                // onchange="loadFile(event)"
              />
              <div>
                <div className="relative size-28 mx-auto">
                  <Image
                    src={LoggedInUser?.profile_picture}
                    className="rounded-full shadow dark:shadow-gray-800 ring-4 ring-slate-50 dark:ring-slate-800"
                    id="profile-banner"
                    alt={LoggedInUser?.first_name}
                    width={112}
                    height={112}
                  />
                  <label
                    className="absolute inset-0 cursor-pointer"
                    htmlFor="pro-img"
                  />
                </div>
                <div className="mt-4">
                  <h5 className="text-lg font-semibold">
                    {LoggedInUser?.first_name} {LoggedInUser?.last_name}
                  </h5>
                  <p className="text-slate-400">
                    {LoggedInUser?.email}
                  </p>
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
