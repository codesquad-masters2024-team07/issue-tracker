import { FallbackProps } from "react-error-boundary";

const ErrorFallBack = ({ error, resetErrorBoundary }: FallbackProps) => {
    return (
        <div role="alert">
            <p>요청 실패!</p>
            <pre className="text-red-500">{error.message}</pre>
            <button onClick={resetErrorBoundary}>다시 시도</button>
        </div>
    );
};

export default ErrorFallBack;
