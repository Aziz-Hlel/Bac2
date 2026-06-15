import { CalendarProvider } from "../contexts/calendar-context";
import { getEvents, getUsers } from "../requests";
import type { TCalendarView } from "../types";
import { ClientContainer } from "./client-container";



export default function CalendarMain({ view }: { view: TCalendarView }) {
    const [events, users] = [getEvents(), getUsers()]
    return (
        <>
            <CalendarProvider users={users} events={events}>
                <div className=" p-8">

                    <ClientContainer view={view} />
                </div>
            </CalendarProvider>
        </>
    )
}