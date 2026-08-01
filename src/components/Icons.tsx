interface IconProps {
  name:
    | "arrow"
    | "chart"
    | "check"
    | "copy"
    | "external"
    | "gamepad"
    | "menu"
    | "shield"
    | "spark"
    | "wallet"
    | "x"
    | "xBrand";
  size?: number;
}

export function Icon({ name, size = 18 }: IconProps) {
  const paths = {
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    chart: <path d="M4 18V9m5 9V5m5 13v-7m5 7V3" />,
    check: <path d="m5 12 4 4L19 6" />,
    copy: (
      <>
        <rect x="8" y="8" width="11" height="11" rx="2" />
        <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
      </>
    ),
    external: (
      <>
        <path d="M14 4h6v6M20 4l-9 9" />
        <path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />
      </>
    ),
    gamepad: (
      <>
        <path d="M8 8h8a6 6 0 0 1 5.7 7.9l-.7 2.2a2.3 2.3 0 0 1-4 1l-1.6-2.1H8.6L7 19.1a2.3 2.3 0 0 1-4-1l-.7-2.2A6 6 0 0 1 8 8Z" />
        <path d="M7 11v4M5 13h4m7-1h.01M18 14h.01" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    shield: <path d="M12 3 5 6v5c0 4.6 2.8 8 7 10 4.2-2 7-5.4 7-10V6l-7-3Zm-3 9 2 2 4-4" />,
    spark: <path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" />,
    wallet: (
      <>
        <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H19v16H6.5A2.5 2.5 0 0 1 4 17.5v-11Z" />
        <path d="M15 10h6v5h-6a2.5 2.5 0 0 1 0-5Z" />
      </>
    ),
    x: <path d="m6 6 12 12M18 6 6 18" />,
    xBrand: (
      <path
        d="M18.901 2H21.98L15.253 9.686L23.166 22H16.972L12.121 14.544L5.596 22H2.515L9.711 13.776L2.121 2H8.472L12.857 8.815L18.901 2ZM17.821 20.163H19.527L7.545 3.74H5.714L17.821 20.163Z"
        fill="currentColor"
        stroke="none"
      />
    ),
  };

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
