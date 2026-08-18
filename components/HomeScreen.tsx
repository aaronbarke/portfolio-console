"use client";

import { motion } from "framer-motion";
import { HomeProvider, useConsoleKeyboard, useHome } from "./HomeProvider";
import { TopBar } from "./TopBar";
import { TileRow } from "./TileRow";
import { ControllerHints } from "./ControllerHints";
import { ReferenceOverlay } from "./ReferenceOverlay";
import { CoverProvider } from "./CoverProvider";
import type { CoverMap } from "@/lib/covers";

function Screen() {
  useConsoleKeyboard();
  const { isIdle } = useHome();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex min-h-dvh w-full flex-col"
    >
      <TopBar />

      <motion.main
        id="main"
        className="flex flex-1 flex-col pb-6"
        animate={{ paddingTop: isIdle ? "5.5vh" : "0rem" }}
        transition={{ duration: 0.34, ease: [0.32, 0.72, 0.24, 1] }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <TileRow />
        </motion.div>
      </motion.main>

      <ControllerHints />
      {process.env.NODE_ENV === "development" && <ReferenceOverlay />}
    </motion.div>
  );
}

export function HomeScreen({ covers }: { covers: CoverMap }) {
  return (
    <CoverProvider covers={covers}>
      <HomeProvider>
        <Screen />
      </HomeProvider>
    </CoverProvider>
  );
}
