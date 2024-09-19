import { defineStore } from "pinia";

export const useBackgroundStore = defineStore("backgroundStore", () => {
	const backgroundImage = ref("");

	function changeBackgroundImage(imageSrc: string) {
		backgroundImage.value = imageSrc;
	}

	return {
		/* State */
		backgroundImage,
		/* Actions */
		changeBackgroundImage,
	};
});
