import { ImageResponse } from "next/og";
import { profile } from "@/lib/profile";

export const runtime = "nodejs";
export const alt = `${profile.name}, portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The card people see when this link is shared. Drawn rather than screenshotted
 * so it stays correct when the site changes, and it deliberately echoes the
 * home screen: the blue field, the sweeping arc, a row of tiles.
 */
export default async function OpengraphImage() {
  const tiles = ["FF", "UE", "SS", "PE", "ME"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(150deg, #1651a8 0%, #1b459c 32%, #122f83 66%, #04123f 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* the arc */}
        <div
          style={{
            position: "absolute",
            left: -160,
            bottom: -420,
            width: 1700,
            height: 900,
            borderRadius: "50%",
            border: "70px solid rgba(150, 205, 255, 0.16)",
            transform: "rotate(-14deg)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 7,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.62)",
            }}
          >
            {profile.onlineId}
          </div>
          <div
            style={{
              fontSize: 82,
              fontWeight: 700,
              color: "#ffffff",
              marginTop: 14,
              letterSpacing: -2,
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              fontSize: 34,
              color: "rgba(255,255,255,0.78)",
              marginTop: 18,
              maxWidth: 900,
              lineHeight: 1.35,
            }}
          >
            {profile.headline}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 18 }}>
          {tiles.map((monogram, index) => (
            <div
              key={monogram}
              style={{
                width: index === 0 ? 148 : 108,
                height: index === 0 ? 148 : 108,
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: index === 0 ? 46 : 34,
                fontWeight: 700,
                color: "#ffffff",
                background: "rgba(255,255,255,0.12)",
                border:
                  index === 0
                    ? "3px solid rgba(255,255,255,0.9)"
                    : "1px solid rgba(255,255,255,0.16)",
              }}
            >
              {monogram}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
