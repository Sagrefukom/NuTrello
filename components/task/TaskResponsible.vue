<script setup>
	import { useBoardStore } from "~/stores/boardStore";
	import { useTeamStore } from "~/stores/teamStore";

	const boardStore = useBoardStore();
	const teamStore = useTeamStore();

	const route = useRoute();

	const task = computed(() => {
		return boardStore.getTask(route.params.id);
	});

	const teamMembers = computed(() => {
		return teamStore.team.members;
	});

	const teamMember = computed(() => {
		return teamStore.getTeamMember(task.value.responsible);
	});

	const selected = ref(teamMembers.value[0]);

	function deleteTaskResponsible() {
		boardStore.deleteTaskResponsible(task.value.id);
	}
	function addTaskResponsible(responsible) {
		boardStore.addTaskResponsible(task.value.id, responsible);
	}
</script>

<template>
	<div class="flex flex-col">
		<span class="mb-1 mr-2 text-xs">Responsible: </span>
		<div class="flex flex-col items-start mb-2" v-if="task.responsible">
			<UPopover :popper="{ placement: 'right-start' }">
				<div class="flex flex-col items-start">
					<UAvatar
						:alt="teamMember?.name"
						size="md"
						:ui="{
							background: 'bg-amber-600 dark:bg-amber-600',
							placeholder: 'text-white dark:text-white',
						}"
					/>
				</div>

				<template #panel>
					<div class="flex flex-col align-center">
						<div class="flex align-center p-4 gap-x-2">
							<UAvatar
								:alt="teamMember?.name"
								size="xl"
								:ui="{
									background: 'bg-amber-600 dark:bg-amber-600',
									placeholder: 'text-white dark:text-white',
								}"
							/>
							<div class="flex flex-col align-center justify-center">
								<span class="text-xs"
									>Username: {{ teamMember?.username }}</span
								>
								<span class="text-xs">Name: {{ teamMember?.name }}</span>
								<span class="text-xs">Email: {{ teamMember?.email }}</span>
							</div>
						</div>
						<UButton
							class="justify-center"
							color="gray"
							@click="deleteTaskResponsible"
						>
							Delete responsible
						</UButton>
					</div>
				</template>
			</UPopover>
		</div>
		<div v-else>
			<USelectMenu
				v-model="selected"
				:options="teamMembers"
				:ui="{ base: 'w-[250px]' }"
			>
				<template #leading>
					<UAvatar
						:alt="selected.name"
						size="2xs"
						:ui="{
							background: 'bg-amber-600 dark:bg-amber-600',
							placeholder: 'text-white dark:text-white',
						}"
						class="mr-2"
					/>
					<span class="truncate">{{ selected.name }}</span>
				</template>
				<template #option="{ option: member }">
					<UAvatar
						:alt="member.name"
						size="2xs"
						:ui="{
							background: 'bg-amber-600 dark:bg-amber-600',
							placeholder: 'text-white dark:text-white',
						}"
						class="mr-2"
					/>
					<span class="truncate">{{ member.name }}</span>
				</template>
			</USelectMenu>
			<UButton
				class="mt-1"
				color="gray"
				@click="addTaskResponsible(selected.username)"
			>
				Add responsible
			</UButton>
		</div>
	</div>
</template>
