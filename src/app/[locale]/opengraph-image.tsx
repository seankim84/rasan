import { ImageResponse } from "next/og";

export const alt = "RA SÂN — Find a futsal match in Ho Chi Minh City";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#101817",
        color: "white",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          border: "48px solid #FF5A36",
          borderRadius: "999px",
          height: 390,
          position: "absolute",
          right: -80,
          top: -150,
          width: 390,
        }}
      />
      <div style={{ display: "flex", fontSize: 88, fontWeight: 900, letterSpacing: "-4px" }}>
        RA <span style={{ color: "#FF5A36", marginLeft: 18 }}>SÂN</span>
      </div>
      <div style={{ color: "#DDE3DF", display: "flex", fontSize: 34, marginTop: 24 }}>
        Pick a match. Save your spot. Play.
      </div>
    </div>,
    size,
  );
}
