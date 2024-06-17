import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "./common/ErrorFallBack.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <div className="h-full my-auto transition-colors bg-gray-100 dark:bg-darkModeBG dark:text-white">
        <QueryClientProvider client={queryClient}>
            <ErrorBoundary FallbackComponent={ErrorFallBack}>
                <ReactQueryDevtools initialIsOpen={true} />
                <App />
            </ErrorBoundary>
        </QueryClientProvider>
    </div>
);
