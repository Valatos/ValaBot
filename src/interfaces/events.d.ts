export interface IEventInfo {
    /**
     * @description The event name triggering the function.
     */
    trigger_name: string,

    /**
     * @description If this event is enabled, and should
     *              thus respond to events.
     */
    enabled: boolean
}