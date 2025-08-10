import HeroThesis from "@/components/HeroThesis";
import MiniExplainer from "@/components/MiniExplainer";
import { HOME } from "@/content/copy";

export default function Home() {
  return (
    <>
      <HeroThesis 
        title={HOME.title}
        subtitle={HOME.subtitle}
        stakes={HOME.stakes}
        uwHook={HOME.uwHook}
        ctas={HOME.ctas}
      />
      <MiniExplainer />
    </>
  );
}
