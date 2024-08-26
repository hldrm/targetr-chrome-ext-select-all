let myLog = (text) => {
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

let getContentPanel = () => {
  let contentPanels = document.getElementsByClassName('contentPanel');
  if (!contentPanels || !contentPanels[0]) {
    return undefined;
  }

  return contentPanels[0];
};

let buttonClickListener = () => {
  let contentPanel = getContentPanel();
  const inputs = [];
  const tds = contentPanel.getElementsByTagName('td');

  console.log(tds);
  for (let td of tds) {
    let inputs = td.getElementsByTagName('input');
    for (let ip of inputs) {
      //ip.click();
      ip.checked = true;
      // TODO HLDRM mit checked = true / false rechnen? dann könnte man 2
      // buttons machen. einen um alle auszuwählen, anderen um alle abzuwählen?
      // oder overkill?
    }
  }
  /*tds.map(td => {
    let ip = td.getElementsByTagName('input');//[0].click();
    console.log(ip);
    ip[0].click();
    return ip[0];
  });*/

  /*tds.forEach((td) => {
    //inputs.append(td.getElementsByTagName('input'));
    td.getElementsByTagName('input').click();
  });*/


  /*let checkboxes = $('.contentPanel td input');

  let number = checkboxes.length;* /

  for (i = 0; i < number; i++) {
      / *if (!checkboxes[i]) {
          continue;
      }* /

      //checkboxes[i].click();

      $('.contentPanel td input')[i].click();
  }
  */
};

let insertButton = () => {
  //let paginationElem = $('.contentPanel ul.pagination');
  let contentPanels = document.getElementsByClassName('contentPanel');
  if (!contentPanels || !contentPanels[0]) {
    return false;
  }

  let contentPanel = contentPanels[0];

  myLog(contentPanel);

  let paginationElems = contentPanel.getElementsByClassName('pagination');
  if (!paginationElems || !paginationElems[0]) {
    return false;
  }

  let paginationElem = paginationElems[0];
  myLog(paginationElem);

  //let button = new Node();
  const liElement = document.createElement('li');
  liElement.classList.add('enabled');
  const button = document.createElement('a');
myLog(button);
  button.textContent = '(De-)Select All';

/*  button.onClick = (e) => {
    window.alert('clicked!');
  };*/
  button.addEventListener('click', buttonClickListener);

  //paginationElem.after(button);
  paginationElem.appendChild(liElement);
  liElement.appendChild(button);
};

const contentPanel = await waitForElement('.contentPanel');
insertButton();

// HLDRM start: old solution with simple timeout. not needed now wtih promise.

//setTimeout(() => {
  /*let windowConsole = console;
  let console = {};
  window.console = console;
  console.log = (text) => {
    windowConsole.log('TargetR clickR: ' + text);
  };*/

  //insertButton();

//}, 2000);
// HLDM end



/*let checkboxes = $('.contentPanel td input');

let number = checkboxes.length;* /

for (i = 0; i < number; i++) {
    / *if (!checkboxes[i]) {
        continue;
    }* /

    //checkboxes[i].click();

    $('.contentPanel td input')[i].click();
}
*/

// console.log(checkboxes);

// for (i=0; i<5; i++) { $('.contentPanel td input')[i].click(); }
