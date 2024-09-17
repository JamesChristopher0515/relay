import * as later from '@breejs/later';
export default function scheduleFromString(str) {
    try {
        const replaced = (`every ` +
            str
                .trim()
                .replace(/fortnight/, `2 weeks`)
                .replace(/midnight/, `0:00`)
                .replace(/midday/, `12:00`)
                .replace(/^day/, `1 day`)
                .replace(/^week/, `1 week`)
                .replace(/^month/, `1 month`)
                // convert am/pm to 24 hour
                .replace(/([0-9:]+)(pm|am)/, (match, p1, p2) => {
                return match
                    .split(':')
                    .map((part, i, arr) => {
                    if (i === 0 && p2 === 'pm') {
                        return (12 + parseInt(p1, 10) + (i === arr.length - 1 ? `:00` : ''));
                    }
                    return part;
                })
                    .join(':')
                    .replace(/pm|am/, '');
            })).replace(/^every ([a-z]+day)/i, 'on $1');
        //
        const s = later.parse.text(replaced);
        if (s.error === -1) {
            return later.schedule(s);
        }
    }
    catch (e) {
        console.error(e);
    }
    return null;
}
//# sourceMappingURL=scheduleFromString.js.map