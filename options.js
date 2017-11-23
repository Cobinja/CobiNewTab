let types = [
  "Default",
  "Empty page",
  "Custom"
];

function saveSettings(e) {
  e.preventDefault();
  browser.storage.local.set({
    type: document.querySelector("#type").value,
    url: document.querySelector("#url").value
  });
}

function onTypeChanged(e) {
  e.preventDefault();
  saveSettings(e);
  let type = document.querySelector("#type").value;
  document.querySelector("#url").disabled = type != 2;
}

function loadSettings() {
  
  let cb = document.querySelector("#type");
  
  function setType(result) {
    let type = result.type || 0;
    let cb = document.querySelector("#type");
    cb.value = type;
    cb.addEventListener("change", onTypeChanged);
    document.querySelector("#url").disabled = type != 2;
  }
  
  function setUrl(result) {
      document.querySelector("#url").value = result.url || null;
      document.querySelector("#url").addEventListener("change", saveSettings);
  }
  
  function onError(error) {
    console.log(`Error: ${error}`);
  }
  
  for (let i = 0; i < types.length; i++) {
    let option = document.createElement("option");
    option.text = types[i];
    option.value = i;
    cb.appendChild(option);
  }
  
  var type = browser.storage.local.get("type");
  type.then(setType, onError);
  
  var url = browser.storage.local.get("url");
  url.then(setUrl, onError);
}

document.addEventListener("DOMContentLoaded", loadSettings);
