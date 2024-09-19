<script setup>
	import { useBoardStore } from "~/stores/boardStore";

	const boardStore = useBoardStore();
	const router = useRouter();
	const route = useRoute();

	const props = defineProps({
		columnName: {
			type: String,
			required: true,
		},
	});

	const emit = defineEmits(["closeModal"]);

	const task = computed(() => {
		return boardStore.getTask(route.params.id);
	});

	function deleteTask() {
		closeModal();
		router.push("/");
		boardStore.deleteTask(route.params.id);
	}

	function closeModal() {
		emit("closeModal");
	}
</script>

<template>
	<Head>
		<Title>Task: {{ route.params.id }}</Title>
		<Meta name="task" content="Task" />
	</Head>

	<div class="max-w-2xl bg-gray-200 rounded-[25px]">
		<div
			v-if="task"
			class="flex flex-col flex-grow items-start justify-between"
		>
			<UCard
				class="w-full"
				:ui="{
					rounded: 'rounded-[5px]',
					divide: 'divide-x-0 divide-y-0',
					background: 'bg-stone-100 dark:bg-gray-700',
					body: { padding: 'p-[10px] sm:p-[10px]' },
					header: { padding: 'p-[10px] sm:p-[10px]' },
					footer: { padding: 'p-[10px] sm:p-[10px]' },
				}"
			>
				<template #header>
					<div class="flex items-start justify-between gap-x-4 w-full">
						<div class="flex flex-col mb-2 w-full">
							<UInput
								type="text"
								v-model="task.name"
								class="w-full cursor-pointer"
								size="lg"
								:ui="{
									color: {
										white: {
											outline:
												'bg-stone-100 dark:bg-gray-700 ring-0 shadow-none focus:ring-gray-200 dark:focus:ring-gray-500',
										},
									},
									size: {
										lg: 'text-lg',
									},
									base: 'cursor-pointer',
								}"
							/>
						</div>
						<UButton
							icon="i-heroicons-x-mark"
							color="white"
							:ui="{
								color: {
									white: {
										solid: 'ring-0 shadow-none bg-stone-100 dark:bg-gray-700',
									},
								},
							}"
							@click="closeModal"
						>
						</UButton>
					</div>
				</template>
				<div class="flex flex-col px-3">
					<div class="flex align-center justify-between">
						<div class="flex flex-col items-start mb-2">
							<span class="mb-1 mr-2 text-xs">Status:</span>
							<UBadge
								class="max-w-fit"
								color="primary"
								variant="subtle"
								size="md"
								:label="props.columnName"
							/>
						</div>
						<div class="flex flex-col items-start mb-2">
							<span class="mb-1 mr-2 text-xs text-right w-full"
								>Priority:
							</span>
							<TaskProirity
								:priority="task.priority"
								:taskId="task.id"
								:type="'big'"
							/>
						</div>
					</div>
					<div class="flex align-center justify-between">
						<TaskResponsible />
						<TaskParticipants />
					</div>
				</div>
				<div class="flex flex-col items-start px-3">
					<span class="mb-[3px]">Description:</span>
					<UTextarea
						v-model="task.description"
						class="w-full mb-4 cursor-pointer"
						placeholder="Write here..."
						autoresize
						:ui="{
							color: {
								white: {
									outline:
										'bg-stone-100 dark:bg-gray-700 ring-0 shadow-none focus:ring-gray-200 dark:focus:ring-gray-500',
								},
							},
							base: 'cursor-pointer',
						}"
					/>
				</div>

				<template #footer>
					<UButton
						class="w-full justify-center"
						icon="i-heroicons-trash"
						color="gray"
						@click="deleteTask"
					>
						Delete task
					</UButton>
				</template>
			</UCard>
		</div>
		<div v-else>
			<p>Task not found.</p>
		</div>
	</div>
</template>
