# Client Pagination.

## Installation

> Include dist/client_pagination.js in the document.

## Usage

Add the following snippet to your document where you want the pagination controllers to appear, specifying how to get the rows to paginate.

```html
<div
  class="pagination-container"
  data-pagination-selector="${row_selector}"
  data-pagination-per-page="${Integer}"
  data-pagination-hidden-class="${default:hidden}"
></div>
```
