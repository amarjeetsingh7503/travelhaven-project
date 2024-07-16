let taxSwitch = document.getElementById("flexCheckDefault");
taxSwitch.addEventListener("click", () => {
  let beforeTaxes = document.getElementsByClassName("before-tax-value");
  let afterTaxes = document.getElementsByClassName("after-tax-value");
  for (info of afterTaxes) {
    if (info.style.display != "inline") {
      info.style.display = "inline";
    } else {
      info.style.display = "none";
    }
  }
  for (info of beforeTaxes) {
    if (info.style.display != "none") {
      info.style.display = "none";
    } else {
      info.style.display = "inline";
    }
  }
});
