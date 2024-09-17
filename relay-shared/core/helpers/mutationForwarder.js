export default function mutationForwarder(mutation) {
    return async (...args) => {
        return mutation(...args).unwrap();
    };
}
//# sourceMappingURL=mutationForwarder.js.map