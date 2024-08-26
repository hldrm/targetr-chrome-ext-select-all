const myLog = (text) => {
  console.log("[TargetR clickR] " + text);
};

myLog("TargetR clickR: Content.js starting up!");

// a function returning a promise, rosolving once the contentPanel has shown up
function waitForElement(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

const getContentPanel = () => {
  const contentPanels = document.getElementsByClassName('contentPanel');
  if (!contentPanels || !contentPanels[0]) {
    return undefined;
  }

  return contentPanels[0];
};

const buttonClickListener = (selectOrDeselect) => {
  const contentPanel = getContentPanel();
  const inputs = [];
  const tds = contentPanel.getElementsByTagName('td');

  console.log(tds);
  for (let td of tds) {
    const inputs = td.getElementsByTagName('input');
    for (let ip of inputs) {
      //ip.click();
      // we are directly setting "checked" instead of clicking, to
      // ensure consistency (all checked / unchecked)
      ip.checked = selectOrDeselect;
    }
  }
};

const insertButton = (title, selectOrDeselect) => {
  const contentPanels = document.getElementsByClassName('contentPanel');
  if (!contentPanels || !contentPanels[0]) {
    return false;
  }

  const contentPanel = contentPanels[0];

  myLog(contentPanel);

  const paginationElems = contentPanel.getElementsByClassName('pagination');
  if (!paginationElems || !paginationElems[0]) {
    return false;
  }

  const paginationElem = paginationElems[0];
  myLog(paginationElem);

  const liElement = document.createElement('li');
  liElement.classList.add('enabled');

  const button = document.createElement('button');
  button.classList.add('btn', 'btn-default');
  button.textContent = title;
  button.addEventListener('click', () => buttonClickListener(selectOrDeselect));

  const icon = document.createElement('i');
  icon.classList.add('fa', 'fa-check-square-o');
  button.insertBefore(icon, button.firstChild);

  paginationElem.appendChild(liElement);
  liElement.appendChild(button);
};

(async function main() {
  const contentPanel = await waitForElement('.contentPanel');

  insertButton('Select All', true);
  insertButton('Deselect All', false);
})();
