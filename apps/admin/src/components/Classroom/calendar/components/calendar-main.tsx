import classroomService from "@/Api/service/classroomService";
import type { IEvent } from "@/calendar/interfaces";
import { useCurrentSchool } from "@/contexts/CurrentSchoolContext";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Navigate, useParams } from "react-router";
import z from "zod";
import { CalendarProvider } from "../contexts/calendar-context";
import { getEvents, getUsers } from "../requests";
import type { TCalendarView } from "../types";
import { ClientContainer } from "./client-container";



export default function CalendarMainMain({ view }: { view: TCalendarView }) {
    // const schoolId = useCurrentSchool();
    // const { classroomId } = useParams();
    // const paramsSchema = z.uuid().safeParse(classroomId);
    // const validatedClassroomId = paramsSchema.success ? paramsSchema.data : "";

    // const { data } = useQuery({
    //     queryKey: ["classrooms", validatedClassroomId, "exams"],
    //     queryFn: () => classroomService.getExams({ schoolId, id: validatedClassroomId }),
    //     enabled: validatedClassroomId !== "",
    // })

    // if (!paramsSchema.success) {
    //     return <Navigate to='/classrooms' replace />;
    // }
    const [eventsMocks, users] = [getEvents(), getUsers()]
    console.log('mokc = ', eventsMocks)
    // const eventsResponse = data?.data

    // const events: IEvent[] = eventsResponse?.map((examSession) => {
    //     return {
    //         id: examSession.exam.id,
    //         startDate: dayjs(`${examSession.exam.date} ${examSession.exam.startTime}`).toISOString(),
    //         endDate: dayjs(`${examSession.exam.date} ${examSession.exam.endTime}`).toISOString(),
    //         title: examSession.exam.subject,
    //         backgroundColor: "bg-blue-500",
    //         textColor: "text-white",
    //         color: "blue",
    //         description: "",
    //         user: {
    //             id: 'string',
    //             name: 'string',
    //             picturePath: 'string',
    //         }
    //     }
    // }) || []

    // console.log('events = ', events)

    return (
        <>
            <CalendarProvider users={users} events={eventsMocks}>
                <div className=" p-8">

                    <ClientContainer view={view} />
                </div>
            </CalendarProvider>
        </>
    )
}