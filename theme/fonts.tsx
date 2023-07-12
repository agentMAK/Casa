import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
    @font-face {
      font-family: "Basier Square";
      src: url("/fonts/basiersquare-regular-webfont.woff2") format("woff2");
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: "Basier Square";
      src: url("/fonts/basiersquare-medium-webfont.woff2") format("woff2");
      font-weight: 500;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: "Basier Square";
      src: url("/fonts/basiersquare-semibold-webfont.woff2") format("woff2");
      font-weight: 600;
      font-style: normal;
      font-display: swap;
    }
      `}
  />
);

export default Fonts;
