const $theme_change = document.querySelector(".theme-changer");

let theme_ligth = true;

function change_them(true_or_false) {
	if (true_or_false) {
		ligth_them();
		true_or_false = false;
	} else {
		black_them();
		true_or_false = true;
	}
	return true_or_false;
}

function black_them() {
	document.documentElement.style.setProperty("--background-color", "rgba(32, 44, 54, 1)");
	document.documentElement.style.setProperty("--text-color", "rgba(255, 255, 255, 1)");
	document.documentElement.style.setProperty("--elements-color", "rgba(43, 56, 68, 1)");
}

function ligth_them() {
	document.documentElement.style.setProperty("--background-color", "rgba(255, 255, 255, 1)");
	document.documentElement.style.setProperty("--text-color", "rgba(17, 21, 23, 1)");
	document.documentElement.style.setProperty("--elements-color", "rgba(255, 255, 255, 1)");
}

async function get_theme() {
	const url = await new URL(location.href);
	let point = url.searchParams.get("theme");
	point = point == "true" ? false : true;
	return point;
}

$theme_change.addEventListener("click", () => {
	theme_ligth = change_them(theme_ligth);
});
