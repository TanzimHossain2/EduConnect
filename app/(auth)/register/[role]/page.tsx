import SignupForm from "../_components/SignupForm";

type role = "instructor" | "student";

const RegisterPage = ({ params: { role } }: { params: { role: role } }) => {
  return (
    <>
      <div className="w-full flex-col h-screen flex items-center justify-center">
        <div className="container">
          <SignupForm role={role} />
        </div>
      </div>
    </>
  );
};
export default RegisterPage;
