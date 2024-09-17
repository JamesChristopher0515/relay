export default function idOrFromObj(objorId) {
    return typeof objorId === 'string'
        ? objorId
        : '_id' in objorId
            ? objorId._id.toString()
            : objorId.toJSON()._id;
}
//# sourceMappingURL=idOrFromObj.js.map