let taxSwitch = document.getElementById("flexCheckDefault");
taxSwitch.addEventListener("click", () => {
  let taxes = document.getElementsByClassName("tax-value");
  for (info of taxes) {
    if (info.style.display != "inline") {
      info.style.display = "inline";
    } else {
      info.style.display = "none";
    }
  }
});
