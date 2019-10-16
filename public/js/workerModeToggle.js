function toggleTabs() {
  console.log("toggleTabs fired!")
  const content = document.querySelector(".tabcontent")

  // Hide all tabs
  for (let i = 0; i < content.length; i++) {
    content[i].style.display = "none"
  }
}
