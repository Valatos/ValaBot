export interface IEventInfo {
    /**
     * @description The event name triggering the function.
     * @since 1.0.0
     */
    trigger_name: string,

    /**
     * @description If this event is enabled, and should
     *              thus respond to events.
     * @since 1.0.0
     */
    enabled: boolean
}