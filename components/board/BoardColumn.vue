<script setup>
	import { useBoardStore } from "~/stores/boardStore";

	const props = defineProps({
		column: {
			type: Object,
			required: true,
		},
		columnIndex: {
			type: Number,
			required: true,
		},
	});

	const boardStore = useBoardStore();

	const router = useRouter();

	const editNameState = ref(false);
	const newTaskName = ref("");

	function addTask() {
		boardStore.addTask({
			taskName: newTaskName.value,
			columnIndex: props.columnIndex,
		});
		newTaskName.value = "";
	}

	function deleteColumn(columnIndex) {
		boardStore.deleteColumn(columnIndex);
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
	function pickupColumn(event, fromColumnIndex) {
		event.dataTransfer.effectAllowed = "move";
		event.dataTransfer.dropEffect = "move";
		event.dataTransfer.setData("type", "column");
		event.dataTransfer.setData("from-column-index", fromColumnIndex);
	}

	const isModalOpen = ref(false);

	function openModal() {
		isModalOpen.value = true;
	}
	function closeModal() {
		isModalOpen.value = false;
		router.push("/");
	}
</script>

<template>
	<UContainer
		class="flex-1 p-4 mr-4 rounded bg-gray-200 dark:bg-gray-700 bg-opacity-30 dark:bg-opacity-70 min-w-[350px] cursor-pointer"
		draggable="true"
		@dragstart.self="pickupColumn($event, columnIndex)"
		@dragenter.prevent
		@dragover.prevent
		@drop.stop="dropItem($event, { toColumnIndex: columnIndex })"
	>
		<div class="flex items-center justify-between mb-3 font-bold mb-4">
			<div>
				<UInput v-if="editNameState" type="text" v-model="column.name" />
				<h2 v-else>{{ column.name }}</h2>
			</div>
			<UButton
				icon="i-heroicons-trash"
				color="white"
				@click="deleteColumn(columnIndex)"
			/>
		</div>
		<ul>
			<li v-for="(task, taskIndex) in column.tasks" :key="task.id">
				<BoardTask
					@click="openModal"
					:task="task"
					:taskIndex="taskIndex"
					:columnIndex="columnIndex"
					:column="column"
				/>
			</li>
		</ul>
		<UInput
			v-model="newTaskName"
			type="text"
			placeholder="Create new task"
			icon="i-heroicons-plus-circle-solid"
			@keyup.enter="addTask"
		/>
		<UModal v-model="isModalOpen" preventClose>
			<NuxtPage :columnName="props.column.name" @closeModal="closeModal" />
		</UModal>
	</UContainer>
</template>
