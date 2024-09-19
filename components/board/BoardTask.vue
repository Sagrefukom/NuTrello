<script setup>
	import { useBoardStore } from "~/stores/boardStore";

	const boardStore = useBoardStore();
	const router = useRouter();

	const props = defineProps({
		task: {
			type: Object,
			required: true,
		},
		taskIndex: {
			type: Number,
			required: true,
		},
		column: {
			type: Object,
			required: true,
		},
		columnIndex: {
			type: Number,
			required: true,
		},
	});

	const taskBorderColor = computed(() => {
		const colors = {
			high: "ring-red-400 dark:ring-red-400",
			medium: "ring-amber-400 dark:ring-amber-400",
			low: " ring-green-400 dark:ring-green-400",
		};
		return colors[props.task.priority];
	});

	function goToTask(taskId) {
		router.push(`/tasks/${taskId}`);
	}

	function pickupTask(event, { fromColumnIndex, fromTaskIndex }) {
		event.dataTransfer.effectAllowed = "move";
		event.dataTransfer.dropEffect = "move";
		event.dataTransfer.setData("type", "task");
		event.dataTransfer.setData("from-column-index", fromColumnIndex);
		event.dataTransfer.setData("from-task-index", fromTaskIndex);
	}
	function dropItem(event, { toColumnIndex, toTaskIndex }) {
		const type = event.dataTransfer.getData("type");
		const fromColumnIndex = event.dataTransfer.getData("from-column-index");

		if (type === "task") {
			const fromTaskIndex = event.dataTransfer.getData("from-task-index");

			boardStore.moveTask({
				fromTaskIndex,
				toTaskIndex,
				fromColumnIndex,
				toColumnIndex,
			});
		} else if (type === "column") {
			boardStore.moveColumn({
				fromColumnIndex,
				toColumnIndex,
			});
		}
	}
</script>

<template>
	<UCard
		class="mb-4 relative"
		:class="taskBorderColor"
		:ui="{
			background: 'bg-stone-100 dark:bg-gray-700',
			body: {
				padding: 'px-4 py-9 sm:p-6',
			},
			base: 'min-h-[90px] flex items-center',
		}"
		@click="goToTask(props.task.id)"
		draggable="true"
		@dragstart="
			pickupTask($event, {
				fromColumnIndex: props.columnIndex,
				fromTaskIndex: props.taskIndex,
			})
		"
		@drop.stop="
			dropItem($event, {
				toColumnIndex: props.columnIndex,
				toTaskIndex: props.taskIndex,
			})
		"
	>
		<p class="text-clip overflow-hidden text-nowrap">{{ props.task.name }}</p>
		<TaskProirity
			:priority="task.priority"
			:taskId="task.id"
			:type="'small'"
			class="absolute top-0 left-1/2 -translate-x-1/2"
		/>
		<UAvatar
			v-if="task.responsible"
			:alt="task.responsible"
			size="sm"
			:ui="{
				background: 'bg-amber-600 dark:bg-amber-600',
				placeholder: 'text-white dark:text-white',
			}"
			class="absolute top-[5px] right-[5px]"
		/>
		<div
			v-if="task.participants.length > 0"
			class="flex absolute bottom-[10px] right-[10px] w-fit"
		>
			<UAvatar
				v-for="participant in task.participants"
				:key="participant.id"
				:alt="participant.name"
				size="xs"
				:ui="{
					background: 'bg-blue-600 dark:bg-blue-600',
					placeholder: 'text-white dark:text-white',
				}"
			/>
		</div>
		<UIcon
			v-if="task.description.length > 0"
			name="i-heroicons-bars-3-bottom-left"
			class="w-5 h-5 absolute bottom-[10px] left-[15px]"
		/>
	</UCard>
</template>
