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

	const freeParticipatns = computed(() => {
		return teamMembers.value.filter((member) => {
			return !task.value.participants.some(
				(participant) => participant.id === member.id
			);
		});
	});

	function addTaskParticipant(participantId) {
		boardStore.addTaskParticipant(task.value.id, participantId);
	}

	function deleteTaskParticipant(participantId) {
		boardStore.deleteTaskParticipant(task.value.id, participantId);
	}

	function selectTaskParticipant(participantId, close) {
		addTaskParticipant(participantId);
		close();
	}
</script>
<template>
	<div class="flex flex-col">
		<span class="mb-1 mr-2 text-xs text-right w-full">Participants: </span>
		<div class="flex justify-end mt-2">
			<UPopover
				:popper="{ placement: 'left-start' }"
				v-for="participant in task.participants"
				:key="participant.id"
			>
				<UAvatar
					:alt="participant.name"
					size="sm"
					:ui="{
						background: 'bg-blue-600 dark:bg-blue-600',
						placeholder: 'text-white dark:text-white',
					}"
					class="mr-2"
				/>

				<template #panel>
					<div class="flex flex-col align-center">
						<div class="flex align-center p-4 gap-x-2">
							<UAvatar
								:alt="participant.name"
								size="xl"
								:ui="{
									background: 'bg-blue-600 dark:bg-blue-600',
									placeholder: 'text-white dark:text-white',
								}"
							/>
							<div class="flex flex-col align-center justify-center">
								<span class="text-xs"
									>Username: {{ participant.username }}</span
								>
								<span class="text-xs">Name: {{ participant.name }}</span>
								<span class="text-xs">Email: {{ participant.email }}</span>
							</div>
						</div>
						<UButton
							class="justify-center"
							color="gray"
							@click="deleteTaskParticipant(participant.id)"
						>
							Delete participant
						</UButton>
					</div>
				</template>
			</UPopover>

			<UPopover
				:popper="{ placement: 'left' }"
				v-if="freeParticipatns.length > 0"
			>
				<UButton
					icon="i-heroicons-plus"
					class=""
					color="gray"
					variant="outline"
				/>

				<template #panel="{ close }">
					<div class="p-[20px]">
						<div v-for="member in freeParticipatns" :key="member.id">
							<UButton
								:label="member.name"
								color="gray"
								class="w-[180px]"
								@click="selectTaskParticipant(member, close)"
							>
								<template #leading>
									<UAvatar
										:alt="member.name"
										size="2xs"
										:ui="{
											background: 'bg-amber-600 dark:bg-amber-600',
											placeholder: 'text-white dark:text-white',
										}"
										class="mr-2"
									/>
								</template>
							</UButton>
						</div>
					</div>
				</template>
			</UPopover>
		</div>
	</div>
</template>
