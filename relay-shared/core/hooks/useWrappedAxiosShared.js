import useRContext from './useRContext';
export default function useWrappedAxiosShared() {
    const context = useRContext();
    return context.platformHooks.useWrappedAxios();
}
//# sourceMappingURL=useWrappedAxiosShared.js.map