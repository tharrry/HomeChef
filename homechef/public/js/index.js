function setActiveNavElem() {
    const pathname = window.location.pathname;
    let nav = document.querySelector("#topnav")
    console.log(pathname)
    switch (pathname) {
        case '/':
            nav.children[0].classList.add("active");
            nav.children[1].classList.remove("active");
            nav.children[2].classList.remove("active");
            nav.children[3].classList.remove("active");
            break;

        case '/recipes':
            nav.children[0].classList.remove("active");
            nav.children[1].classList.add("active");
            nav.children[2].classList.remove("active");
            nav.children[3].classList.remove("active");
            break;
        
        case '/storage':
            nav.children[0].classList.remove("active");
            nav.children[1].classList.remove("active");
            nav.children[2].classList.add("active");
            nav.children[3].classList.remove("active");
            break;

            case '/account':
            nav.children[0].classList.remove("active");
            nav.children[1].classList.remove("active");
            nav.children[2].classList.remove("active");
            nav.children[3].classList.add("active");
            break;
    
        default:
            break;
    }
}