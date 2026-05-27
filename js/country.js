const API = "https://restcountries.com/v3.1/";

const back_btn = document.querySelector("#back");

back_btn.addEventListener("click", () => {
	document.location.assign(`/html/index.html?theme=${theme_ligth}`)
});

async function get_info_country() {
	const url = await new URL(location.href);
	let country = url.searchParams.get("cny");
	return country;
}

async function get_name(name) {
	const reponse = await fetch(API + "name/" + name);
	const data = await reponse.json();
	if (data.length > 1) {
		console.log("ERROR", data, name);
	}
	return data[0];
}

function actualise(alt_srcs, texts, title, borders) {
	const img = document.querySelector("img");
	img.alt = alt_srcs[0];
	img.src = alt_srcs[1];

	const spans = document.querySelectorAll("span");
	for (let i = 0; i < spans.length; i++) {
		spans[i].textContent = texts[i];
	}

	const h1 = document.querySelector("h1");
	h1.textContent = title;

	const container = document.querySelector(".border-countries");
	for (let i = 0; i < borders.length; i++) {
		let a = document.createElement("a");
		a.textContent = borders[i];
		a.href = `/html/country.html?theme=${theme_ligth}&cny=${borders[i]}`
		container.appendChild(a);
	}
	return "something";
}

document.addEventListener("DOMContentLoaded", async () => {
	console.log("Hello World " + document.location.toString());

	// de base : true
	theme_ligth = await get_theme(); 		// depend de la valeur precédante
	theme_ligth = change_them(theme_ligth); // inverse

	const data = await get_name(await get_info_country());
	let alt_srcs = [data.flags.alt, data.flags.png];
	let texts = [data.name.official, data.population, data.region, data.subregion, data.capital?.[0], "jsp j'vien pa dici", data.currencies, data.languages];

	actualise(alt_srcs, texts, data.name.common, data.borders);
});


