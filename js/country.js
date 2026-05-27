const API = "https://restcountries.com/v3.1/";

async function get_info_country() {
	const url = await new URL(location.href);
	let country = url.searchParams.get("cny");
	return country;
}

async function get_ALL() {
	const reponse = await fetch(API + "all?fields=flags,languages,population,region,subregion,name,capital,currencies,borders");
	const data = await reponse.json();
	return data;
}

async function get_name(name) {
	const data = await get_ALL();
	let salt = 1;
	for (let i = 0; i < data.length; i++) {
		if (data[i]["name"]["common"].includes(name)) {
			salt = data[i];
		}
	}
	return salt;
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
		a.href = `/html/country.html?theme=${theme_ligth}&cny=${"France"}`
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
console.log(data)
	let alt_srcs = [data.flags.alt, data.flags.png];
	let texts = [data.name.official, data.population, data.region, data.subregion, data.capital?.[0], "jsp j'vien pa dici", data.currencies, data.languages];

	actualise(alt_srcs, texts, data.name.common, data.borders);
});


