import { useLoggedInUser } from "@/hooks/use-loggedIn-user";
import ChangePassword from "../_components/change-password";
import ContactInfo from "../_components/contact-info";
import PersonalDetails from "../_components/personal-details";

async function Profile() {
  const LoggedInUser = await useLoggedInUser();

  if (!LoggedInUser) {
    return null; 
  }



  return (
    <>
      <PersonalDetails userinfo={LoggedInUser}  />
      <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900 mt-[30px]">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <ContactInfo email={LoggedInUser?.email} phone={LoggedInUser?.phone} socialMedia={LoggedInUser?.socialMedia}  />
          <ChangePassword email={LoggedInUser?.email} /> 
        </div>
      </div>
    </>
  );
}

export default Profile;
