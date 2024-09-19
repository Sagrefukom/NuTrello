<script setup>
	import { useBoardStore } from "~/stores/boardStore";

	const boardStore = useBoardStore();
	const props = defineProps({
		type: {
			type: String,
			required: true,
		},
		priority: {
			type: String,
			required: true,
		},
		taskId: {
			type: String,
			required: true,
		},
	});

	const priorities = ref([
		{ name: "high", color: "red" },
		{ name: "medium", color: "amber" },
		{ name: "low", color: "green" },
	]);

	const selected = ref();

	const current = computed(() => {
		return priorities.value.find(
			(priority) => priority.name === props.priority
		);
	});

	function changeTaskPriority() {
		boardStore.changeTaskPriority(props.taskId, selected.value.name);
	}
</script>

<template>
	<USelectMenu
		v-model="selected"
		:options="priorities"
		@change="changeTaskPriority"
		v-if="props.type === 'big'"
	>
		<template #label>
			<UBadge :label="selected.name" :color="selected.color" v-if="selected" />
			<UBadge :label="current.name" :color="current.color" v-else />
		</template>
		<template #option="{ option: priority }">
			<UBadge :label="priority.name" :color="priority.color" />
		</template>
	</USelectMenu>
	<UBadge :label="current.name" :color="current.color" v-else />
</template>
