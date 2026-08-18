"use client";

import { motion } from "framer-motion";
import { HomeProvider, useConsoleKeyboard, useHome } from "./HomeProvider";
import { TopBar } from "./TopBar";
import { TileRow } from "./TileRow";
import { ControllerHints } from "./ControllerHints";
import { ReferenceOverlay } from "./ReferenceOverlay";

function Screen() {
  useConsoleKeyboard();
  const { isIdle } = useHome();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-4 sm:px-6 lg:px-8"
    >
      <TopBar />

      <motion.main
        id="main"
        className="flex flex-1 flex-col pb-6"
        animate={{ paddingTop: isIdle ? "14vh" : "1.5rem" }}
        transition={{ type: "spring", stiffness: 190, damping: 30 }}
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

export function HomeScreen() {
  return (
    <HomeProvider>
      <Screen />
    </HomeProvider>
  );
}
