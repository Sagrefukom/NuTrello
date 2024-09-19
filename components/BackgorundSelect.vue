<script setup>
	import { useBackgroundStore } from "~/stores/backgroundStore";

	const backgroundStore = useBackgroundStore();

	const backgroundImagesArr = ref([
		{ id: 0, image: "trello-bg-1.jpg" },
		{ id: 1, image: "trello-bg-2.jpg" },
		{ id: 2, image: "trello-bg-3.jpg" },
		{ id: 3, image: "trello-bg-4.jpg" },
		{ id: 4, image: "trello-bg-5.jpg" },
		{ id: 5, image: "trello-bg-6.jpg" },
	]);
	const isOpen = ref(false);

	function changeBackground(src) {
		backgroundStore.changeBackgroundImage(src);
	}

	function deleteBackground() {
		backgroundStore.changeBackgroundImage("");
		isOpen.value = false;
	}
</script>

<template>
	<div>
		<UButton
			icon="i-heroicons-photo"
			color="gray"
			variant="solid"
			@click="isOpen = true"
		/>

		<USlideover v-model="isOpen">
			<div class="p-4 flex-1 flex flex-col h-full">
				<span class="mb-2">Select Background: </span>
				<div
					class="flex justify-center flex-wrap gap-4 max-md:flex-grow overflow-y-auto"
				>
					<div
						v-for="image in backgroundImagesArr"
						:key="image.id"
						class="flex items-center justify-center"
					>
						<UButton color="gray" class="w-auto" @click="isOpen = false">
							<template #leading>
								<NuxtImg
									:src="`../public/${image.image}`"
									width="180px"
									height="180px"
									quality="20"
									placeholder
									@click="changeBackground(image.image)"
								/>
							</template>
						</UButton>
					</div>
				</div>
				<UButton
					label="Leave without background"
					color="gray"
					class="w-full mt-2 justify-center"
					@click="deleteBackground"
				/>
			</div>
		</USlideover>
	</div>
</template>
