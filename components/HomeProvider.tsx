"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { homeTiles, initialFocusIndex } from "@/lib/sections";
import type { Tile } from "@/lib/types";

interface HomeState {
  /** Index into `homeTiles` of the currently focused tile. */
  focusIndex: number;
  /** Id of the card whose detail panel is expanded, if any. */
  expandedId: string | null;
  /** Id of the folder tile that is open in place, if any. */
  openFolderId: string | null;
  /** Focus index inside the open folder's grid. */
  folderFocusIndex: number;
  /** Card selected from inside a folder. */
  folderSelectedId: string | null;
}

type HomeAction =
  | { type: "focus"; index: number }
  | { type: "move"; delta: number }
  | { type: "activate" }
  | { type: "activateTile"; index: number }
  | { type: "back" }
  | { type: "focusFolderItem"; index: number }
  | { type: "moveFolder"; delta: number }
  | { type: "selectFolderItem"; index: number };

const initialState: HomeState = {
  focusIndex: initialFocusIndex,
  expandedId: null,
  openFolderId: null,
  folderFocusIndex: 0,
  folderSelectedId: null,
};

function clamp(value: number, max: number): number {
  return Math.max(0, Math.min(max, value));
}

function tileAt(index: number): Tile | undefined {
  return homeTiles[index];
}

/** Opening a tile means different things for projects and folders. */
function activate(state: HomeState, index: number): HomeState {
  const tile = tileAt(index);
  if (!tile) return state;

  // System tiles take focus and grow like the rest, but open nothing.
  if (tile.kind === "system") {
    return { ...state, focusIndex: index, expandedId: null, openFolderId: null, folderSelectedId: null };
  }

  if (tile.kind === "folder") {
    const alreadyOpen = state.openFolderId === tile.id;
    return {
      ...state,
      focusIndex: index,
      expandedId: null,
      openFolderId: alreadyOpen ? null : tile.id,
      folderFocusIndex: 0,
      folderSelectedId: null,
    };
  }

  const alreadyExpanded = state.expandedId === tile.card.id;
  return {
    ...state,
    focusIndex: index,
    openFolderId: null,
    folderSelectedId: null,
    expandedId: alreadyExpanded ? null : tile.card.id,
  };
}

function reducer(state: HomeState, action: HomeAction): HomeState {
  switch (action.type) {
    case "focus": {
      if (state.focusIndex === action.index) return state;
      return {
        ...state,
        focusIndex: clamp(action.index, homeTiles.length - 1),
        expandedId: null,
        openFolderId: null,
        folderSelectedId: null,
      };
    }

    case "move": {
      const next = clamp(state.focusIndex + action.delta, homeTiles.length - 1);
      if (next === state.focusIndex) return state;
      // Moving along the row closes whatever the previous tile had open.
      return {
        ...state,
        focusIndex: next,
        expandedId: null,
        openFolderId: null,
        folderSelectedId: null,
      };
    }

    case "activate": {
      // Inside an open folder, "open" means the highlighted item in that
      // folder. Without this it applied to the row tile instead, which just
      // closed the folder you were standing in.
      if (state.openFolderId) {
        return reducer(state, { type: "selectFolderItem", index: state.folderFocusIndex });
      }
      return activate(state, state.focusIndex);
    }

    case "activateTile":
      return activate(state, action.index);

    case "back": {
      if (state.folderSelectedId) return { ...state, folderSelectedId: null };
      if (state.openFolderId) return { ...state, openFolderId: null, folderFocusIndex: 0 };
      if (state.expandedId) return { ...state, expandedId: null };
      return state;
    }

    case "focusFolderItem":
      return { ...state, folderFocusIndex: action.index };

    case "moveFolder": {
      const tile = tileAt(state.focusIndex);
      if (!tile || tile.kind !== "folder") return state;
      const next = clamp(state.folderFocusIndex + action.delta, tile.cards.length - 1);
      return next === state.folderFocusIndex ? state : { ...state, folderFocusIndex: next };
    }

    case "selectFolderItem": {
      const tile = tileAt(state.focusIndex);
      if (!tile || tile.kind !== "folder") return state;
      const card = tile.cards[action.index];
      if (!card) return state;
      return {
        ...state,
        folderFocusIndex: action.index,
        folderSelectedId: state.folderSelectedId === card.id ? null : card.id,
      };
    }

    default:
      return state;
  }
}

interface HomeContextValue extends HomeState {
  tiles: Tile[];
  /** The tile the row is currently on, so hints can reflect what it does. */
  focusedTile: Tile | undefined;
  dispatch: (action: HomeAction) => void;
  /** True when nothing is expanded, open or overlaid. */
  isIdle: boolean;
}

const HomeContext = createContext<HomeContextValue | null>(null);

export function HomeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo<HomeContextValue>(
    () => ({
      ...state,
      tiles: homeTiles,
      focusedTile: homeTiles[state.focusIndex],
      dispatch,
      isIdle: !state.expandedId && !state.openFolderId,
    }),
    [state],
  );

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
}

export function useHome(): HomeContextValue {
  const context = useContext(HomeContext);
  if (!context) throw new Error("useHome must be used inside <HomeProvider>");
  return context;
}

/**
 * Global keyboard model: arrows move focus, Enter opens, Escape backs out one
 * level at a time. Typing in a field is never hijacked.
 */
export function useConsoleKeyboard(): void {
  const { dispatch, openFolderId } = useHome();

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // The event target is only an Element when focus is inside the document;
      // a key pressed with nothing focused targets the window itself.
      const target = event.target instanceof Element ? event.target : null;
      const isTextEntry =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        (target instanceof HTMLElement && target.isContentEditable);
      if (isTextEntry) return;

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          dispatch(openFolderId ? { type: "moveFolder", delta: -1 } : { type: "move", delta: -1 });
          break;
        case "ArrowRight":
          event.preventDefault();
          dispatch(openFolderId ? { type: "moveFolder", delta: 1 } : { type: "move", delta: 1 });
          break;
        case "Enter": {
          // Links keep their default behaviour. Everything else is handled
          // here, and preventDefault stops the focused button also firing a
          // native click, which is what made Enter's meaning depend on where
          // focus happened to be sitting.
          if (target?.closest("a")) return;
          event.preventDefault();
          dispatch({ type: "activate" });
          break;
        }
        case "ArrowDown":
          event.preventDefault();
          dispatch({ type: "activate" });
          break;
        case "ArrowUp":
        case "Escape":
          event.preventDefault();
          dispatch({ type: "back" });
          break;
        default:
          break;
      }
    },
    [dispatch, openFolderId],
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);
}
