/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const header = document.getElementById("header");
  // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 50) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*=============== SKILLS MODAL ===============*/

const modalViews = document.querySelectorAll(".skills__modal"),
  modalBtns = document.querySelectorAll(".skills__button"),
  modalClose = document.querySelectorAll(".skills__modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((mb, i) => {
  mb.addEventListener("click", () => {
    modal(i);
  });
});

modalClose.forEach((mc) => {
  mc.addEventListener("click", () => {
    modalViews.forEach((mv) => {
      mv.classList.remove("active-modal");
    });
  });
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*=============== LIGHT light THEME ===============*/

const lightStyles = document.querySelectorAll(
  "link[rel=stylesheet][media*=prefers-color-scheme][media*=light]"
);
const darkStyles = document.querySelectorAll(
  "link[rel=stylesheet][media*=prefers-color-scheme][media*=dark]"
);
const darkSchemeMedia = matchMedia("(prefers-color-scheme: dark)");
const switcherRadios = document.querySelectorAll(".switcher__radio");

function setupSwitcher() {
  const savedScheme = getSavedScheme();

  if (savedScheme !== null) {
    const currentRadio = document.querySelector(
      `.switcher__radio[value=${savedScheme}]`
    );
    currentRadio.checked = true;
  }

  [...switcherRadios].forEach((radio) => {
    radio.addEventListener("change", (event) => {
      setScheme(event.target.value);
    });
  });
}

function setupScheme() {
  const savedScheme = getSavedScheme();
  const systemScheme = getSystemScheme();

  if (savedScheme === null) return;

  if (savedScheme !== systemScheme) {
    setScheme(savedScheme);
  }
}

function setScheme(scheme) {
  switchMedia(scheme);

  if (scheme === "auto") {
    clearScheme();
  } else {
    saveScheme(scheme);
  }
}

function switchMedia(scheme) {
  let lightMedia;
  let darkMedia;

  if (scheme === "auto") {
    lightMedia = "(prefers-color-scheme: light)";
    darkMedia = "(prefers-color-scheme: dark)";
  } else {
    lightMedia = scheme === "light" ? "all" : "not all";
    darkMedia = scheme === "dark" ? "all" : "not all";
  }

  [...lightStyles].forEach((link) => {
    link.media = lightMedia;
  });

  [...darkStyles].forEach((link) => {
    link.media = darkMedia;
  });
}

function getSystemScheme() {
  const darkScheme = darkSchemeMedia.matches;

  return darkScheme ? "dark" : "light";
}

function getSavedScheme() {
  return localStorage.getItem("color-scheme");
}

function saveScheme(scheme) {
  localStorage.setItem("color-scheme", scheme);
}

function clearScheme() {
  localStorage.removeItem("color-scheme");
}

setupSwitcher();
setupScheme();

/*=============== SCROLL REVEAL ANIMATION ===============*/

const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
  // reset: true,
  mobile: false,
});

// email js
function validate() {
  let name = document.querySelector(".name");
  let email = document.querySelector(".email");
  let msg = document.querySelector(".message");
  let sendBtn = document.querySelector(".send-btn");

  sendBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (name.value == "" || email.value == "" || msg.value == "") {
      emptyerror();
    } else {
      sendmail(name.value, email.value, msg.value);
      success();
    }
  });
}
validate();

function emptyerror() {
  swal({
    title: "Ой!",
    text: "кажется поля неправильно заполнены",
    icon: "error",
  });
}

function success() {
  swal({
    title: "Ок!",
    text: "Сообщение отправлено 🥳 отвечу очень скоро",
    icon: "success",
  });
}

function sendmail(name, email, msg) {
  emailjs.send("service_8pcxidm", "template_irojdqa", {
    from_name: email,
    to_name: name,
    message: msg,
  });
}
