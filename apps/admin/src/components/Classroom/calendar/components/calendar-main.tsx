import classroomService from "@/Api/service/classroomService";
import { useCurrentSchool } from "@/contexts/CurrentSchoolContext";
import BreadcrumbHeader from "@/pages/Header";
import { useClassroomStore } from "@/store/useClassroomStore";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Navigate, useParams } from "react-router";
import z from "zod";
import { CalendarProvider } from "../contexts/calendar-context";
import type { IEvent } from "../interfaces";
import { getEvents, getUsers } from "../requests";
import type { TCalendarView } from "../types";
import { ClientContainer } from "./client-container";



export default function CalendarMainMain({ view }: { view: TCalendarView }) {
    const schoolId = useCurrentSchool();
    const currentClassroom = useClassroomStore((state) => state.currentClassroom);
    const { classroomId } = useParams();
    const paramsSchema = z.uuid().safeParse(classroomId);
    const validatedClassroomId = paramsSchema.success ? paramsSchema.data : "";

    const { data } = useQuery({
        queryKey: ["classrooms", validatedClassroomId, "exams"],
        queryFn: () => classroomService.getExams({ schoolId, id: validatedClassroomId }),
        enabled: validatedClassroomId !== "",
    })

    if (!paramsSchema.success) {
        return <Navigate to='/classrooms' replace />;
    }
    const [_, users] = [getEvents(), getUsers()]
    const eventsResponse = data?.data

    const events: IEvent[] = eventsResponse?.map((examSession) => {
        return {
            id: examSession.exam.id,
            startDate: dayjs(`${examSession.exam.date} ${examSession.exam.startTime}`).toISOString(),
            endDate: dayjs(`${examSession.exam.date} ${examSession.exam.endTime}`).toISOString(),
            title: examSession.exam.subject,
            backgroundColor: "bg-blue-500",
            textColor: "text-white",
            color: "blue",
            description: "",
            user: {
                id: 'string',
                name: 'string',
                picturePath: 'string',
            }
        }
    }) || []


    const breadcrumbs = [
        { title: 'Classrooms', href: '/classrooms' },
        ...(currentClassroom ? [{ title: currentClassroom.name, }] : []),
        { title: 'Calendar', href: `/classrooms/${classroomId}/calendar` }
    ];

    return (
        <>
            <BreadcrumbHeader breadcrumbs={breadcrumbs} />
            <CalendarProvider users={users} events={events}>
                <div className=" p-8">

                    <ClientContainer view={view} />

                </div>
            </CalendarProvider>
        </>
    )
}