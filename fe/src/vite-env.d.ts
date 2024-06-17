/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_APP_S3_BUCKET_NAME: string;
    readonly VITE_APP_S3_REGION: string;
    readonly VITE_APP_S3_ACCESS_KEY_ID: string;
    readonly VITE_APP_S3_SECRET_ACCESS_KEY: string;
    readonly VITE_BECKET_PATH: string;
}
interface ImportMeta {
    readonly env: ImportMetaEnv;
}