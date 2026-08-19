import { HomeScreen } from "@/components/HomeScreen";
import { resolveCovers, resolveResume } from "@/lib/assets";

export default function Page() {
  return <HomeScreen covers={resolveCovers()} resumeHref={resolveResume()} />;
}
