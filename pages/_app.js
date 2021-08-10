import "../styles/globals.css";
import Layout from "../Components/Layout.js";
// https://github.com/vercel/next.js/discussions/18176 - CHECK NAMING DISCREPANCIES NEXT TIME YOU DUMBASS. ALL IMPORTS MUST MATCH. THEN YOU WONT HAVE TO WASTE 2 HOURS ON THIS

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
