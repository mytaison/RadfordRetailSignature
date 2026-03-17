const bannerSrc = "https://cdn.prod.website-files.com/69570cfa93cce9dcfece4b5f/697aecc73f8e0b2511aa1627_Radford-EuroShop2026-EmailBanner.png";
const brandLogoSrc = "https://cdn.prod.website-files.com/69570cfa93cce9dcfece4b5f/697aedd56bc06b1f8b8c778a_brand_logo.png";
const isoLogoSrc = "https://cdn.prod.website-files.com/69570cfa93cce9dcfece4b5f/697aedda4d25cda58b27faea_iso_cert.png";
const ticketUrl = "https://radfordretail.zendesk.com/hc/en-au/requests/new";
const kbUrl = "https://knowledgebase.radfordretail.com/";
let storedPhone = document.getElementById("phone") ? document.getElementById("phone").value : "";
const form = document.getElementById("form1");

document.addEventListener('DOMContentLoaded', () => {
  const brandImg = document.getElementById('brand-logo');
  if (brandImg) brandImg.src = brandLogoSrc;
  const isoImg = document.getElementById('iso-logo');
  if (isoImg) isoImg.src = isoLogoSrc;
  const ticketLink = document.getElementById('ticket-link');
  if (ticketLink) ticketLink.href = ticketUrl;
  const kbLink = document.getElementById('kb-link');
  if (kbLink) kbLink.href = kbUrl;
});

form.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", (e) => {
    console.log("Wrking");
    const preview = document.getElementById("sig_" + input.id);
    if (preview) {
      preview.innerText = e.target.value;
      if (input.id === "email") {
        preview.setAttribute("href", "mailto:" + e.target.value);
      } else if (input.id === "phone") {
        preview.setAttribute("href", "tel:" + e.target.value);
        storedPhone = e.target.value;
      }
      if (input.id === "signoff") {
        const signoffRow = document.getElementById("signoff-row");
        if (signoffRow) {
          signoffRow.style.display = e.target.value.trim() ? "" : "none";
        }
      }
    }
  });
  // also track changes on blur/events
  if (input.id === "phone") {
    input.addEventListener("change", (e) => {
      storedPhone = e.target.value;
    });
  }
  if(input.id === "excludePhone"){
    input.addEventListener("click", (e) => {
      const phoneElements = document.getElementsByClassName("exPhone");
        for (let i = 0; i < phoneElements.length; i++) {
          if(input.checked){
            phoneElements[i].style.display = "none";
          }else{
            phoneElements[i].style.display = "inline";
          }
        }
    })
  }
  if(input.id === "excludeBanner"){
    input.addEventListener("click", (e) => {
      const table = document.getElementById("signature-table");
      const bannerRow = table.querySelector('.exBanner');
      
      if(input.checked){
        // Remove banner row if it exists
        if(bannerRow){
          bannerRow.remove();
        }
      }else{
        // Add banner row if it doesn't exist
        if(!bannerRow){
          const newRow = document.createElement('tr');
          newRow.className = 'exBanner';
          newRow.innerHTML = `
            <td colspan="2" style="padding: 0;">
              <a href="http://www.radfordretail.com" style="display: block;">
                <img
                  src="${bannerSrc}"
                  alt="Radford EuroShop2026 Register Now!"
                  width="600"
                  height="auto"
                  style="width: 100%; height: auto; display: block; max-width: 600px;"
                />
              </a>
            </td>
          `;
          table.appendChild(newRow);
        }
      }
    })
  }
});

function copySignatue() {
  const table = document.getElementById("signature-table");
  const range = document.createRange();
  range.selectNode(table);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);

  try {
    document.execCommand("copy");
    alert("Signature is copied.");
  } catch (err) {
    selection.removeAllRanges();
  }
}
