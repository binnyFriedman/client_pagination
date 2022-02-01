function init_pagination(pagination_container) {
    var PER_PAGE_DEFAULT = 20;
    var selector = pagination_container.getAttribute("data-pagination-selector");
    if (!selector) {
        return;
    }
    var collection = document.querySelectorAll(selector);
    if (!collection || collection.length === 0) {
        return;
    }
    var per_page = parseInt(pagination_container.getAttribute("data-pagination-per-page") || "") || PER_PAGE_DEFAULT;
    var hiddenClass = pagination_container.getAttribute("data-pagination-hidden-class") ||
        "hidden";
    var pages = Math.ceil(collection.length / per_page);
    function paginate(page) {
        var start = page * per_page;
        var end = start + per_page;
        for (var i = 0; i < collection.length; i++) {
            if (i >= start && i < end) {
                collection[i].classList.remove(hiddenClass);
            }
            else {
                collection[i].classList.add(hiddenClass);
            }
        }
        var firstVisibleElement = collection[start];
        if (firstVisibleElement) {
            firstVisibleElement.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }
    create_pagination_links(pagination_container, pages, paginate);
    pagination_container.setAttribute("data-pagination-per-page", per_page.toString());
    paginate(0);
}
function create_pagination_link(page) {
    var a = document.createElement("a");
    a.innerHTML = (page + 1).toString();
    a.setAttribute("href", "#");
    a.classList.add("pagination_link");
    if (page === 0) {
        a.classList.add("active");
    }
    return a;
}
function create_pagination_links(pagination_container, pages, callback) {
    var links = [];
    var _loop_1 = function (i) {
        var a = create_pagination_link(i);
        a.addEventListener("click", function (e) {
            e.preventDefault();
            links.forEach(function (link) {
                link.classList.remove("active");
            });
            a.classList.add("active");
            callback(i);
        });
        links.push(a);
    };
    for (var i = 0; i < pages; i++) {
        _loop_1(i);
    }
    pagination_container.innerHTML = "";
    pagination_container.classList.add("pagination_links");
    links.forEach(function (link) {
        pagination_container.appendChild(link);
    });
}
function hide_all(elements) {
    elements.forEach(function (element) {
        element.classList.add("hidden");
    });
}
function show_element(element) {
    element.classList.remove("hidden");
}
function onInitPagination() {
    var collection_containers = document.querySelectorAll(".pagination-container");
    collection_containers.forEach(function (collection_container) {
        init_pagination(collection_container);
    });
}
document.addEventListener("RePaginate", onInitPagination);
window.addEventListener("load", onInitPagination);
//# sourceMappingURL=client_pagination.js.map