export default function nextDateFromSchedule(schedule, firstDue = new Date()) {
    // eslint-disable-next-line prefer-const
    let [next, nextNext] = schedule.next(2, firstDue);
    if (next.getTime() === firstDue.getTime()) {
        // If later has a non-specifc spec, like "every 1 day" or "every 1 month" it will generate a time the same as given. So move to the next one
        next = nextNext;
    }
    return next;
}
//# sourceMappingURL=nextDateFromSchedule.js.map