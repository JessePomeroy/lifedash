import { CoMap, CoList, co } from 'jazz-tools';

// ---- Habits ----

export class Habit extends CoMap {
	name = co.string;
	frequency = co.string; // 'daily' | 'weekly' | 'custom'
	color = co.string;
	createdAt = co.string; // ISO date
}

export class HabitEntry extends CoMap {
	habitId = co.string;
	date = co.string; // YYYY-MM-DD
	completed = co.boolean;
	note = co.optional.string;
}

export class HabitEntryList extends CoList.Of(co.ref(HabitEntry)) {}
export class HabitList extends CoList.Of(co.ref(Habit)) {}

// ---- Tasks ----

export class Task extends CoMap {
	title = co.string;
	description = co.optional.string;
	priority = co.string; // 'low' | 'medium' | 'high'
	dueDate = co.optional.string; // ISO date
	completed = co.boolean;
	createdAt = co.string;
}

export class TaskList extends CoList.Of(co.ref(Task)) {}

// ---- Journal ----

export class JournalEntry extends CoMap {
	date = co.string; // YYYY-MM-DD
	mood = co.number; // 1-5
	content = co.string;
	tags = co.optional.string; // comma-separated for now
}

export class JournalEntryList extends CoList.Of(co.ref(JournalEntry)) {}

// ---- Goals ----

export class Milestone extends CoMap {
	title = co.string;
	completed = co.boolean;
}

export class MilestoneList extends CoList.Of(co.ref(Milestone)) {}

export class Goal extends CoMap {
	title = co.string;
	description = co.optional.string;
	targetDate = co.optional.string;
	progress = co.number; // 0-100
	milestones = co.ref(MilestoneList);
}

export class GoalList extends CoList.Of(co.ref(Goal)) {}

// ---- Schedule ----

export class ScheduleEvent extends CoMap {
	title = co.string;
	startTime = co.string; // HH:MM
	endTime = co.string;
	date = co.string; // YYYY-MM-DD
	recurring = co.optional.string; // 'daily' | 'weekly' | 'monthly' | null
	category = co.optional.string;
}

export class ScheduleEventList extends CoList.Of(co.ref(ScheduleEvent)) {}

// ---- Root Account Schema ----

export class LifeDashRoot extends CoMap {
	habits = co.ref(HabitList);
	habitEntries = co.ref(HabitEntryList);
	tasks = co.ref(TaskList);
	journalEntries = co.ref(JournalEntryList);
	goals = co.ref(GoalList);
	scheduleEvents = co.ref(ScheduleEventList);
}
