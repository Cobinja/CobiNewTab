async function relocate(result) {
  let type = result.type;
  let url = result.url;
  let target = null;
  switch (type) {
    case "0":
      target = "about:home";
      break;
    case "1":
      target = "about:blank";
      break;
    case "2":
      target = url;
      break;
  }
  if (target) {
    await browser.tabs.getCurrent((tab) => {
      browser.tabs.update(tab.id, {url : target, loadReplace : true});
      browser.history.deleteUrl({url : browser.extension.getURL("newtab.html")});
    });
  }
}

function onError(error) {
  console.log(`Error: ${error}`);
}

let type = browser.storage.local.get(null);
type.then(relocate, onError);
