import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const Layout = lazy(() => import("./components/layout/Layout"));
import { ThemeProvider } from "./context/theme-provider";
import Dashboard from "./components/pages/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CityPage from "./components/pages/CityPage";
import { Toaster } from "sonner";
import Loading from "./components/pages/Loading";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* shad cn ui theme provider */}
        <ThemeProvider defaultTheme='dark'>
          <Suspense fallback={<Loading/>}>
            <Layout>
              <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='city/:cityName' element={<CityPage />} />
              </Routes>
            </Layout>
          </Suspense>
          <Toaster richColors />
        </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
