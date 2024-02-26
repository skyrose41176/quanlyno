import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
// import { ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";

// import theme from "../styles/theme";

// export default function MyApp({ Component, pageProps }) {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Component {...pageProps} />
//     </ThemeProvider>
//   );
// }
