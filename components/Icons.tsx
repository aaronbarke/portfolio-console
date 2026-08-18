import type { SVGProps } from "react";

/**
 * Original geometric glyphs. These deliberately do not copy any console
 * manufacturer's iconography — they borrow the visual language (thin strokes,
 * simple primitives, generous negative space) and nothing more.
 */
type IconProps = SVGProps<SVGSVGElement>;

function Glyph({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ProfileIcon = (p: IconProps) => (
  <Glyph {...p}>
    <circle cx="12" cy="8.5" r="3.5" />
    <path d="M4.5 19.5a7.5 7.5 0 0 1 15 0" />
  </Glyph>
);

export const NotificationIcon = (p: IconProps) => (
  <Glyph {...p}>
    <path d="M12 4.5a5.5 5.5 0 0 0-5.5 5.5v3.2L5 16.5h14l-1.5-3.3V10A5.5 5.5 0 0 0 12 4.5Z" />
    <path d="M10 19.2a2.2 2.2 0 0 0 4 0" />
  </Glyph>
);

export const MessageIcon = (p: IconProps) => (
  <Glyph {...p}>
    <path d="M4.5 6.5h15v10h-9L6 20v-3.5H4.5Z" />
  </Glyph>
);

export const PartyIcon = (p: IconProps) => (
  <Glyph {...p}>
    <circle cx="9" cy="9" r="2.8" />
    <circle cx="16.5" cy="10.5" r="2.2" />
    <path d="M3.5 18.5a5.5 5.5 0 0 1 11 0" />
    <path d="M15 15.2a4.4 4.4 0 0 1 5.5 3.3" />
  </Glyph>
);

export const CalendarIcon = (p: IconProps) => (
  <Glyph {...p}>
    <rect x="4" y="5.5" width="16" height="14" rx="1.5" />
    <path d="M4 10h16M9 3.5v4M15 3.5v4" />
  </Glyph>
);

export const TrophyIcon = (p: IconProps) => (
  <Glyph {...p}>
    <path d="M8 4.5h8v4a4 4 0 0 1-8 0Z" />
    <path d="M8 6H5.5v1.5A3 3 0 0 0 8 10.4M16 6h2.5v1.5a3 3 0 0 1-2.5 2.9" />
    <path d="M12 12.5v3.5M9 19.5h6M10 16.5h4l.6 3h-5.2Z" />
  </Glyph>
);

export const SettingsIcon = (p: IconProps) => (
  <Glyph {...p}>
    <path d="M4 8h10M18 8h2M4 16h4M12 16h8" />
    <circle cx="16" cy="8" r="2" />
    <circle cx="10" cy="16" r="2" />
  </Glyph>
);

export const PlusRingIcon = (p: IconProps) => (
  <Glyph {...p}>
    <circle cx="12" cy="12" r="7.5" />
    <path d="M12 8.5v7M8.5 12h7" />
  </Glyph>
);

export const FolderIcon = (p: IconProps) => (
  <Glyph {...p}>
    <path d="M3.5 7.5h6l1.6 2h9.4v9.5h-17Z" />
  </Glyph>
);

export const LockIcon = (p: IconProps) => (
  <Glyph {...p}>
    <rect x="5.5" y="10.5" width="13" height="9" rx="1.6" />
    <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
  </Glyph>
);

export const ExternalIcon = (p: IconProps) => (
  <Glyph {...p}>
    <path d="M14 5h5v5M19 5l-7.5 7.5" />
    <path d="M18 14v4.5H5.5V6H10" />
  </Glyph>
);

export const DownloadIcon = (p: IconProps) => (
  <Glyph {...p}>
    <path d="M12 4.5v10M8 11l4 3.5 4-3.5" />
    <path d="M4.5 18.5h15" />
  </Glyph>
);

export const CloseIcon = (p: IconProps) => (
  <Glyph {...p}>
    <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />
  </Glyph>
);

export const MenuIcon = (p: IconProps) => (
  <Glyph {...p}>
    <path d="M4 7.5h16M4 12h16M4 16.5h16" />
  </Glyph>
);

export const ChevronIcon = (p: IconProps) => (
  <Glyph {...p}>
    <path d="M9 6l6 6-6 6" />
  </Glyph>
);
