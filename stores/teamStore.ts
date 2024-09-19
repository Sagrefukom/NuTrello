import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import teamData from "~/data/team.json";

type TMember = {
	id: string;
	name: string;
	username: string;
	email: string;
};

export const useTeamStore = defineStore("teamStore", () => {
	const team = useStorage("team", teamData);

	const getTeamMember = computed(() => {
		return (teamMemberUsername: string): TMember | undefined => {
			const member = team?.value.members.find(
				(member) => member.username === teamMemberUsername
			);
			if (member) return member;
		};
	});

	return {
		/* State */
		team,
		/* Getters */
		getTeamMember,
	};
});
