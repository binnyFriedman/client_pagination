function init_pagination(pagination_container: HTMLElement) {
  const PER_PAGE_DEFAULT = 20;
  const selector = pagination_container.getAttribute(
    "data-pagination-selector"
  );
  if (!selector) {
    return;
  }
  const collection: NodeListOf<HTMLElement> =
    document.querySelectorAll(selector);
  if (!collection || collection.length === 0) {
    return;
  }

  const per_page =
    parseInt(
      pagination_container.getAttribute("data-pagination-per-page") || ""
    ) || PER_PAGE_DEFAULT;

  const hiddenClass =
    pagination_container.getAttribute("data-pagination-hidden-class") ||
    "hidden";

  const pages = Math.ceil(collection.length / per_page);

  function paginate(page: number) {
    const start = page * per_page;
    const end = start + per_page;
    for (let i = 0; i < collection.length; i++) {
      if (i >= start && i < end) {
        collection[i].classList.remove(hiddenClass);
      } else {
        collection[i].classList.add(hiddenClass);
      }
    }
    const firstVisibleElement = collection[start];
    if (firstVisibleElement) {
      firstVisibleElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }

  create_pagination_links(pagination_container, pages, paginate);
  pagination_container.setAttribute(
    "data-pagination-per-page",
    per_page.toString()
  );

  paginate(0);
}

function create_pagination_link(page: number) {
  let a = document.createElement("a");
  a.innerHTML = (page + 1).toString();
  a.setAttribute("href", "#");
  a.classList.add("pagination_link");
  if (page === 0) {
    a.classList.add("active");
  }
  return a;
}

function create_pagination_links(
  pagination_container: HTMLElement,
  pages: number,
  callback: Function
) {
  let links = [];
  for (let i = 0; i < pages; i++) {
    let a = create_pagination_link(i);
    a.addEventListener("click", (e) => {
      e.preventDefault();
      links.forEach((link) => {
        link.classList.remove("active");
      });
      a.classList.add("active");
      callback(i);
    });
    links.push(a);
  }
  pagination_container.innerHTML = "";
  pagination_container.classList.add("pagination_links");
  links.forEach((link) => {
    pagination_container.appendChild(link);
  });
}

function hide_all(elements: Array<HTMLElement>) {
  elements.forEach((element) => {
    element.classList.add("hidden");
  });
}
function show_element(element: HTMLElement) {
  element.classList.remove("hidden");
}

function onInitPagination() {
  const collection_containers: NodeListOf<HTMLElement> =
    document.querySelectorAll(".pagination-container");
  collection_containers.forEach((collection_container) => {
    init_pagination(collection_container);
  });
}

document.addEventListener("RePaginate", onInitPagination);

window.addEventListener("load", onInitPagination);
