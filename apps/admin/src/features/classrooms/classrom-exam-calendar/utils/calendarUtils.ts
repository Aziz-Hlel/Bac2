import dayjs from 'dayjs';
import type { TeacherResponse } from '@bac/contracts/schemas/teacher/teacherResponse';
import type { SupervisorRole } from '@bac/contracts/types/enums/enums';

export type SupervisorWithRole = TeacherResponse & { role: SupervisorRole };

export const CALENDAR_START_HOUR = 8; // 8 AM
export const CALENDAR_END_HOUR = 17; // 5 PM
export const TOTAL_MINUTES = (CALENDAR_END_HOUR - CALENDAR_START_HOUR) * 60; // 9 hours = 540 minutes

export const ROLE_ORDER: Record<SupervisorRole, number> = {
  PRIMARY_MALE: 1,
  PRIMARY_FEMALE: 2,
  SECONDARY: 3,
};

export const ROLE_LABELS: Record<SupervisorRole, string> = {
  PRIMARY_MALE: 'Primary Male',
  PRIMARY_FEMALE: 'Primary Female',
  SECONDARY: 'Secondary',
};

export const ROLE_COLORS: Record<SupervisorRole, { badge: string; text: string; dot: string }> = {
  PRIMARY_MALE: {
    badge: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    text: 'text-blue-600 dark:text-blue-400',
    dot: 'bg-blue-500',
  },
  PRIMARY_FEMALE: {
    badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    text: 'text-rose-600 dark:text-rose-400',
    dot: 'bg-rose-500',
  },
  SECONDARY: {
    badge: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
    text: 'text-slate-600 dark:text-slate-400',
    dot: 'bg-slate-500',
  },
};

/**
 * Sorts supervisors: PRIMARY_MALE -> PRIMARY_FEMALE -> SECONDARY
 */
export function sortSupervisors(supervisors: SupervisorWithRole[] = []): SupervisorWithRole[] {
  return [...supervisors].sort((a, b) => {
    const orderA = ROLE_ORDER[a.role] ?? 99;
    const orderB = ROLE_ORDER[b.role] ?? 99;
    if (orderA !== orderB) return orderA - orderB;
    return `${a.lastName} ${a.firstName}`.localeCompare(`${b.lastName} ${b.firstName}`);
  });
}

/**
 * Formats a subject enum to a human-readable title (e.g. COMPUTER_SCIENCE -> Computer Science)
 */
export function formatSubject(subject: string): string {
  if (!subject) return '';
  return subject
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Parses time string (e.g. "08:30", "08:30:00", or ISO string) to minutes from midnight
 */
export function parseTimeToMinutes(timeStr: string): number {
  if (!timeStr) return 0;
  if (timeStr.includes('T')) {
    const d = dayjs(timeStr);
    return d.hour() * 60 + d.minute();
  }
  const parts = timeStr.split(':');
  const hours = parseInt(parts[0], 10) || 0;
  const minutes = parseInt(parts[1], 10) || 0;
  return hours * 60 + minutes;
}

/**
 * Computes top and height percentages for an event within the 8am - 5pm range
 */
export function computeEventPosition(startTime: string, endTime: string): { topPct: number; heightPct: number } {
  const startMin = parseTimeToMinutes(startTime);
  const endMin = parseTimeToMinutes(endTime);

  const calStartMin = CALENDAR_START_HOUR * 60; // 480
  const calEndMin = CALENDAR_END_HOUR * 60; // 1020

  const clampedStart = Math.max(calStartMin, Math.min(startMin, calEndMin));
  const clampedEnd = Math.max(clampedStart, Math.min(endMin, calEndMin));

  const topPct = ((clampedStart - calStartMin) / TOTAL_MINUTES) * 100;
  const heightPct = Math.max(((clampedEnd - clampedStart) / TOTAL_MINUTES) * 100, 4); // min 4% for visibility

  return { topPct, heightPct };
}

/**
 * Returns the 6 days (Monday to Saturday) for the week of a given date
 */
export function getWeekDays(referenceDate: Date | string | dayjs.Dayjs): dayjs.Dayjs[] {
  const ref = dayjs(referenceDate);
  // dayjs: 0=Sunday, 1=Monday, ..., 6=Saturday
  const dayOfWeek = ref.day();
  // We want Monday (day 1) as start of week
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = ref.add(diffToMonday, 'day');

  const days: dayjs.Dayjs[] = [];
  for (let i = 0; i < 6; i++) {
    days.push(monday.add(i, 'day'));
  }
  return days;
}
