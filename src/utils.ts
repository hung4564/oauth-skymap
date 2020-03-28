export const epoch = function() {
  return Math.round(new Date().getTime() / 1000.0);
};
export function openPopup(url: string, name = "oauth", height = 600, width = 400) {
  const top = window.innerHeight / 2 - height / 2 + window.screenTop;
  const left = window.innerWidth / 2 - width / 2 + window.screenLeft;
  const popupWindow = window.open(
    url,
    name,
    `height=${height}, width=${width}, status=yes, toolbar=no, menubar=no, location=no, top=${top}, left=${left}`
  );
  if (!popupWindow) {
    return Promise.reject(
      new ReferenceError(
        "We were unable to open the popup window, its likely that the request was blocked."
      )
    );
  }

  popupWindow.focus();
  // TODO: Find a better way of tracking when a Window closes.
  return new Promise(resolve => {
    const checker = setInterval(() => {
      try {
        if (!popupWindow.closed) {

          location.hash = popupWindow.location.hash;
          popupWindow.close();
        }
        clearInterval(checker);
        setTimeout(resolve);
      } catch (e) {}
    }, 100);
  });
}
export default { epoch, openPopup };
