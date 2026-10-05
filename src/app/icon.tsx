import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#101817",
        color: "#FF5A36",
        display: "flex",
        fontSize: 17,
        fontWeight: 900,
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      RS
    </div>,
    size,
  );
}
