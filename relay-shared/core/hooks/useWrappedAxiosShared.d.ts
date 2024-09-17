import { AxiosResponse } from 'axios';
export type WrappedAxios = {
    get: (url: string, config?: any) => Promise<AxiosResponse>;
    post: (url: string, data?: any, config?: any) => Promise<AxiosResponse>;
    put: (url: string, data?: any, config?: any) => Promise<AxiosResponse>;
    delete: (url: string, config?: any) => Promise<AxiosResponse>;
    patch: (url: string, data?: any, config?: any) => Promise<AxiosResponse>;
};
export default function useWrappedAxiosShared(): any;
//# sourceMappingURL=useWrappedAxiosShared.d.ts.map