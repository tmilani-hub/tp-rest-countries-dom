const API = "https://restcountries.com/v3.1/";

const $search = document.querySelector("#INPsearch");
const $countries_container = document.querySelector(".countries-container");

async function get_name(name) {
	const reponse = await fetch(API + "name/" + name);
	const data = await reponse.json();
	return data;
}

async function get_ALL() {
	const reponse = await fetch(
		API + "all?fields=name,capital,flags,region,population",
	);
	const data = await reponse.json();
	return data;
}

function create_card(png, alt, title, popu, reg, cap) {
	const div = document.createElement("div");
	const div_text = document.createElement("div");
	const img = document.createElement("img");
	const h3 = document.createElement("h3");
	const p_popu = document.createElement("p");
	const span_popu = document.createElement("span");
	const p_reg = document.createElement("p");
	const span_reg = document.createElement("span");
	const p_cap = document.createElement("p");
	const span_cap = document.createElement("span");

	div.classList.add("country-card");
	div_text.classList.add("card-text");
	img.src = png;
	img.alt = alt;
	h3.classList.add("card-title");

	h3.textContent = title;
	p_popu.textContent = "population: ";
	p_reg.textContent = "region: ";
	p_cap.textContent = "capital: ";
	span_popu.textContent = popu;
	span_reg.textContent = reg;
	span_cap.textContent = cap;

	p_popu.appendChild(span_popu);
	p_reg.appendChild(span_reg);
	p_cap.appendChild(span_cap);
	div_text.append(h3, p_popu, p_reg, p_cap);
	div.append(img, div_text);

	return div;
}

async function set_country(data) {
	for (let i = 0; i < data.length; i++) {
		const card = create_card(
			data[i]["flags"]["png"],
			data[i]["flags"]["alt"],
			data[i]["name"]["common"],
			data[i]["population"],
			data[i]["region"],
			data[i]["capital"]?.[0],
		);
		$countries_container.appendChild(card);
	}
	let rtn = "initialisation de " + data.length + " pays";
	return rtn;
}

function clear_country() {
	const country = document.querySelectorAll(".country-card");
	for (let i = 0; i < country.length; i++) {
		country[i].remove();
	}
	$countries_container.innerHTML = "";
}

$search.addEventListener("input", async () => {
	clear_country();
	if ($search.value.length != 0) {
		console.log(true);
		const data = await get_name($search.value);
	} else {
		console.log(false);
		const data = await get_ALL();
		await set_country(data);
	}
});

document.addEventListener("DOMContentLoaded", async () => {
	console.log("Hello World index");
	const data = await get_ALL();
	clear_country();
	await set_country(data);
});

/*
<div class="country-card">
    <img src="https://flagcdn.com/w320/fr.png" alt="france flag" />
    <h3 class="card-title card-text">Germany</h3>
    <p class="card-text">population: <span class="thin">info</span></p>
    <p class="card-text">region: <span class="thin">info</span></p>
    <p class="card-text">capital: <span class="thin">info</span></p>
</div>
*/
