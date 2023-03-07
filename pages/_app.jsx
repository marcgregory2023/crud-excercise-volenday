import { Provider } from "react-redux";
import Head from "next/head";

import MainLayout from "../components/MainLayout";

import { store } from "../store/store";

export default function EmployeeCrud({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Employee Crud</title>
      </Head>
      <Provider store={store}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </Provider>
    </>
  );
}
