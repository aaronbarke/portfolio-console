import { HomeScreen } from "@/components/HomeScreen";
import { resolveCovers } from "@/lib/covers";

export default function Page() {
  return <HomeScreen covers={resolveCovers()} />;
}
