"use client";

import { motion } from "framer-motion";
import { HomeProvider, useConsoleKeyboard } from "./HomeProvider";
import { TopBar } from "./TopBar";
import { TileRow } from "./TileRow";
import { SystemPanel } from "./SystemPanel";
import { ControllerHints } from "./ControllerHints";

function Screen() {
  useConsoleKeyboard();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-4 sm:px-6 lg:px-8"
    >
      <TopBar />

      <main id="main" className="flex flex-1 flex-col justify-center py-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <TileRow />
        </motion.div>
      </main>

      <ControllerHints />
      <SystemPanel />
    </motion.div>
  );
}

export function HomeScreen() {
  return (
    <HomeProvider>
      <Screen />
    </HomeProvider>
  );
}
