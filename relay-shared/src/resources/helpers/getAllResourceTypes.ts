export type ResourceType = 'questionnaire' | 'content' | 'thinking-points'
export default function getAllResourceTypes(): readonly ResourceType[] {
    return [
        'questionnaire',
        'content',

        /**
         * Refers to a specific client milestone stop, which in turn refers to a
         * specific stop in a journey of type 'thinking-points'
         */
        'thinking-points',
    ] as const
}
