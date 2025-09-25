// FRONT-END (CLIENT) JAVASCRIPT HERE
const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();

  const form = document.querySelector("#myForm");
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const formData = new FormData(form);
  const json = Object.fromEntries(formData.entries());
  const body = JSON.stringify(json);

  const response = await fetch( "/submit", {
    method:"POST",
    headers: { "Content-Type": "application/json" },
    body
  })

  const newData = await response.json()

  console.log( "All Data:", newData );
  form.reset();
  await loadData();
}

window.onload = function() {
  const button = document.getElementById("submitButton");
  button.onclick = submit;
  loadData();
}

async function loadData() {
  const response = await fetch("/results");
  const data = await response.json();

  const table = document.querySelector('#dataTable');
  table.innerHTML = "";

  const header = document.createElement('tr');
  header.innerHTML = `
                <th>Format</th>
                <th>Title</th>
                <th>Genre</th>
                <th>Rating</th>
                <th>Watched</th>
                <th>Episodes</th>
                <th>Progress</th>
                <th></th>`;
  table.appendChild(header);

  data.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
                  <td contenteditable="true" data-id="${item._id}" data-field="format">${item.format}</td>
                  <td contenteditable="true" data-id="${item._id}" data-field="title">${item.title}</td>
                  <td contenteditable="true" data-id="${item._id}" data-field="genre">${item.genre}</td>
                  <td class="aligned" contenteditable="true" data-id="${item._id}" data-field="rating">${item.rating}</td>
                  <td class="aligned" contenteditable="true" data-id="${item._id}" data-field="watched">${item.watched}</td>
                  <td class="aligned" contenteditable="true" data-id="${item._id}" data-field="episodes">${item.episodes}</td>
                  <td class="aligned">${item.progress}</td>
                  <td><button class="deleteButton">Delete</button></td>`;

    table.appendChild(row);
    row.querySelector(".deleteButton").addEventListener("click", async() => {
      await fetch('/delete', {
        method:"POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: item._id }),
      })
      await loadData();
    })
  })
}

document.addEventListener("blur", async (e) => {
  const edit = e.target;
  if (!edit.matches('td[contenteditable="true"]')) {
    console.log("Failed to edit.")
    return;
  }

  const row = edit.closest("tr");
  const _id = edit.dataset.id;
  const field = edit.dataset.field;
  const newInfo = edit.textContent.trim();
  const watched = row.querySelector('[data-field="watched"]').textContent.trim();
  const episodes = row.querySelector('[data-field="episodes"]').textContent.trim();
  const body = JSON.stringify({_id, field, newInfo, watched, episodes});

  await fetch("/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body,
  })

  await loadData();
}, true)