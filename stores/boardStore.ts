import { v4 as uuid } from "uuid";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import boardData from "~/data/board.json";

type TTask = {
	id: string;
	name: string;
	description: string;
	priority: string;
};

type TMoveTask = {
	fromTaskIndex: number;
	toTaskIndex: number;
	fromColumnIndex: number;
	toColumnIndex: number;
};

type TAddTask = {
	columnIndex: number;
	taskName: string;
};

type TMoveColumn = {
	fromColumnIndex: number;
	toColumnIndex: number;
};
type TParticipant = {
	id: string;
	name: string;
	username: string;
	email: string;
};

export const useBoardStore = defineStore("boardStore", () => {
	const board = useStorage("board", boardData);

	/**
	 * Tasks
	 */
	const getTask = computed(() => {
		return (taskId: string): TTask | undefined => {
			for (const column of board.value.columns) {
				const task = column.tasks.find((task) => task.id === taskId);
				if (task) return task;
			}
			return undefined;
		};
	});

	function addTask({ columnIndex, taskName }: TAddTask): void {
		board.value.columns[columnIndex].tasks.push({
			id: uuid(),
			name: taskName,
			description: "",
			priority: "medium",
			responsible: "",
			participants: [],
		});
	}

	function deleteTask(taskId: string): void {
		for (const column of board.value.columns) {
			const taskIndex = column.tasks.findIndex((task) => task.id === taskId);

			if (taskIndex !== -1) {
				column.tasks.splice(taskIndex, 1);
				return;
			}
		}
	}

	function moveTask({
		fromTaskIndex,
		toTaskIndex,
		fromColumnIndex,
		toColumnIndex,
	}: TMoveTask): void {
		const task = board.value.columns[fromColumnIndex].tasks.splice(
			fromTaskIndex,
			1
		)[0];

		board.value.columns[toColumnIndex].tasks.splice(toTaskIndex, 0, task);
	}

	function changeTaskPriority(taskId: string, priority: string): void {
		for (const column of board.value.columns) {
			const task = column.tasks.find((task) => task.id === taskId);
			if (task) {
				task.priority = priority;
				return;
			}
		}
	}

	function deleteTaskResponsible(taskId: string): void {
		for (const column of board.value.columns) {
			const task = column.tasks.find((task) => task.id === taskId);
			if (task) {
				task.responsible = "";
				return;
			}
		}
	}
	function addTaskResponsible(taskId: string, responsible: string): void {
		for (const column of board.value.columns) {
			const task = column.tasks.find((task) => task.id === taskId);
			if (task) {
				task.responsible = responsible;
				return;
			}
		}
	}

	function addTaskParticipant(taskId: string, participant: TParticipant): void {
		for (const column of board.value.columns) {
			const task = column.tasks.find((task) => task.id === taskId);
			if (task) {
				task.participants.push(participant);
				return;
			}
		}
	}

	function deleteTaskParticipant(taskId: string, participantId: string): void {
		for (const column of board.value.columns) {
			const task = column.tasks.find((task) => task.id === taskId);
			if (task) {
				task.participants = task.participants.filter(
					(participant) => participant.id !== participantId
				);
				return;
			}
		}
	}

	/**
	 * Columns
	 */
	function addColumn(columnName: string): void {
		board.value.columns.push({
			id: uuid(),
			name: columnName,
			tasks: [],
		});
	}

	function deleteColumn(columnIndex: number): void {
		board.value.columns.splice(columnIndex, 1);
	}

	function moveColumn({ fromColumnIndex, toColumnIndex }: TMoveColumn): void {
		const column = board.value.columns.splice(fromColumnIndex, 1)[0];
		board.value.columns.splice(toColumnIndex, 0, column);
	}

	return {
		/* State */
		board,
		/* Getters */
		getTask,
		/* Actions*/
		addColumn,
		addTask,
		deleteColumn,
		deleteTask,
		moveColumn,
		moveTask,
		changeTaskPriority,
		deleteTaskResponsible,
		addTaskResponsible,
		addTaskParticipant,
		deleteTaskParticipant,
	};
});
