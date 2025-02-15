import AboutUs from "@/app/_components/AboutUs";
import Main from "@/app/_components/Main";

export default function page() {
  return (
    <div className="font-mono flex flex-col min-h-screen">
      <Main />
      <AboutUs />
    </div>
  );
}
