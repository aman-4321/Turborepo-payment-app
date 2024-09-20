import { Appbar } from "../components/Appbar";
import FirstSection from "../components/FirstSection";
import { SecondPage } from "../components/SecondPage";

export default async function Page() {
  return (
    <div>
      <Appbar></Appbar>
      <FirstSection></FirstSection>
      <SecondPage></SecondPage>
    </div>
  );
}
