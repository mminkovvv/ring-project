import page from "../node_modules/page/page.mjs"
import { render } from "../node_modules/lit-html/lit-html.js";
import { userService } from "./userService.js";
import { userHelper } from "./userHelper.js";

import { showHome } from "./views/home.js";
import { showDashboard } from "./views/dashboard.js";


import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";
import { showAdd } from "./views/addCharacter.js"
import { showDetails } from "./views/details.js";
import { showEdit } from "./views/edit.js";


const root = document.querySelector("main");
const userNav = document.querySelector(".user");
const guestNav = document.querySelector(".guest");


page(decorationContext)
page("/", showHome)
page("/dashboard", showDashboard)
page("/login", showLogin)
page("/register", showRegister)
page("/add", showAdd)
page("/edit/:id", showEdit)
page("/details/:id", showDetails)
page("/logout", logout)

page.start();
updateNav();

async function logout() {
    await userService.logout();
    updateNav();
    goTo("/");
}

function renderer(template) {
    render(template, root);
}

function updateNav() {
    const userData = userHelper.getUserData();

    if (userData) {
        userNav.style.display = "block";
        guestNav.style.display = "none";
    } else {
        userNav.style.display = "none";
        guestNav.style.display = "block";
    }
}

function goTo(path) {
    page.redirect(path)
}

function decorationContext(ctx, next) { 
    ctx.render = renderer;
    ctx.updateNav = updateNav;
    ctx.goTo = goTo;

    next();
}