const API = "https://restcountries.com/v3.1/";

const $form = document.querySelector("#form");
const $search = document.querySelector("#INPsearch");
const $countries_container = document.querySelector(".countries-container");

async function get_name(name) {
	const data = await get_ALL();
	let tab = [];
	for (let i = 0; i < data.length; i++) {
		if (data[i]["name"]["common"].includes(name)) {
			tab.push(data[i]);
		}
	}
	console.log(tab)
	return tab;
}

async function get_ALL() {
	const reponse = await fetch(
		API + "all?fields=name,capital,flags,region,population",
	);
	const data = await reponse.json();
	return data;
}

function create_card(png, alt, title, popu, reg, cap, cnty) {
	const div = document.createElement("div");
	const div_text = document.createElement("div");
	const img = document.createElement("img");
	const h5 = document.createElement("h5");
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
	h5.classList.add("card-title");

	h5.textContent = title;
	p_popu.textContent = "population: ";
	p_reg.textContent = "region: ";
	p_cap.textContent = "capital: ";
	span_popu.textContent = popu;
	span_reg.textContent = reg;
	span_cap.textContent = cap;

	p_popu.appendChild(span_popu);
	p_reg.appendChild(span_reg);
	p_cap.appendChild(span_cap);
	div_text.append(h5, p_popu, p_reg, p_cap);
	div.append(img, div_text);

	div.addEventListener("click", () => {
		document.location.assign(`/html/country.html?theme=${theme_ligth}&cny=${cnty}`);
	});

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
			data[i]["name"]["common"],
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

$form.addEventListener("input", async (e) => {
	e.preventDefault();
	clear_country();
	let fdata = new FormData($form);
	let search = fdata.get("search");
	let reg_select = fdata.get("reg-select");
	if (search.length != 0) {
		const data = await get_name(search);
		await set_country(data);
	} else {
		const data = await get_ALL();
		await set_country(data);
	}
});

document.addEventListener("DOMContentLoaded", async () => {
	console.log("Hello World " + document.location.toString());
	const data = await get_ALL();
	clear_country();
	await set_country(data);

	// de base : true
	theme_ligth = await get_theme(); 		// depend de la valeur precédante
	theme_ligth = change_them(theme_ligth); // inverse
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
