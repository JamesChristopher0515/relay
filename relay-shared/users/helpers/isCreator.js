export default function isCreator(user, document) {
    console.log(user._id, document?.creator);
    return user._id.toString() === document?.creator;
}
//# sourceMappingURL=isCreator.js.map