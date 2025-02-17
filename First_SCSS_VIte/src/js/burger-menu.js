window.toggleMenu = function () {
    const menu = document.getElementById("burgerMenu");
    menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
};

window.closeMenu = function () {
    document.getElementById("burgerMenu").style.display = "none";
};
