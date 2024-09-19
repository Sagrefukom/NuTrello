<script setup>
	import { useBoardStore } from "../stores/boardStore";

	const boardStore = useBoardStore();

	const newColumnName = ref("");

	function addColumn() {
		boardStore.addColumn(newColumnName.value);
		newColumnName.value = "";
	}
</script>

<template>
	<Head>
		<Title>Homepage</Title>
		<Meta name="Homepage" content="Homepage" />
	</Head>

	<div class="p-4 h-full overflow-auto board-wrapper">
		<div class="flex flex-row items-start">
			<BoardColumn
				v-for="(column, columnIndex) in boardStore.board.columns"
				:key="column.id"
				:column="column"
				:columnIndex="columnIndex"
			/>
			<UContainer class="flex-1 mr-4 rounded min-w-[350px]">
				<UInput
					v-model="newColumnName"
					type="text"
					placeholder="Create new column"
					icon="i-heroicons-plus-circle-solid"
					@keyup.enter="addColumn"
				/>
			</UContainer>
		</div>
	</div>
</template>

<style>
	.board-wrapper {
		height: calc(100dvh - 100px);
		scrollbar-width: thin;
	}
</style>
