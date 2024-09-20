import { Appbar } from "../components/Appbar";
import FirstSection from "../components/FirstPage";
import { FourthPage } from "../components/FourthPage";
import HeroSection from "../components/HeroSection";
import { SecondPage } from "../components/SecondPage";
import { ThirdPage } from "../components/ThirdPage";

export default async function Page() {
  return (
    <div>
      <Appbar></Appbar>
      <FirstSection></FirstSection>
      <SecondPage></SecondPage>
      <ThirdPage></ThirdPage>
      <FourthPage></FourthPage>
      <HeroSection></HeroSection>
    </div>
  );
}
