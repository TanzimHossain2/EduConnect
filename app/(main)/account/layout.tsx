import AccountSidebar from "./_components/account-sideber";

function Layout({ tabs }: { tabs: any }) {
  return (
    <section className="relative pb-16">
      <div className="container relative mt-10">
        <div className="lg:flex">
          <AccountSidebar />
          <div className="lg:w-3/4 md:px-3 mt-[30px] lg:mt-0">{tabs}</div>
        </div>
      </div>
    </section>
  );
}

export default Layout;
