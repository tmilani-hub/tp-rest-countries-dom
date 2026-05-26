const $theme_change = document.querySelector(".theme-changer");

let theme_ligth = true;

$theme_change.addEventListener("click", () => {
	if (theme_ligth) {
		document.documentElement.style.setProperty(
			"--background-color",
			"rgba(32, 44, 54, 1)",
		);
		document.documentElement.style.setProperty(
			"--text-color",
			"rgba(255, 255, 255, 1)",
		);
		document.documentElement.style.setProperty(
			"--elements-color",
			"rgba(43, 56, 68, 1)",
		);
		theme_ligth = false;
	} else {
		document.documentElement.style.setProperty(
			"--background-color",
			"rgba(255, 255, 255, 1)",
		);
		document.documentElement.style.setProperty(
			"--text-color",
			"rgba(17, 21, 23, 1)",
		);
		document.documentElement.style.setProperty(
			"--elements-color",
			"rgba(255, 255, 255, 1)",
		);
		theme_ligth = true;
	}
});

/*

document.documentElement.style.setProperty("--border-color", "#434343");

*/
