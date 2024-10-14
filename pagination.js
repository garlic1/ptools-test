const MAX_PAGES = 100;

class Pagination {
    constructor(currentPage, maxPages) {
        this.currentPage = currentPage;
        this.maxPages = maxPages;
        document.getElementById("pagination").innerText = currentPage + "/" + maxPages;
    }

    async nextPage() {
        if (this.currentPage < this.maxPages) {
            this.currentPage += 1;
            await fetchPage(this.currentPage);
            this.updateScreen();
        }
    }
    
    async previousPage() {
        if (this.currentPage > 1) {
            this.currentPage -= 1;
            await fetchPage(this.currentPage);
            this.updateScreen();
        }
    }

    async previousTenPages() {
        if (this.currentPage - 10 < 1) {
            this.currentPage = 1;
        } else {
            this.currentPage -= 10;
        }
        await fetchPage(this.currentPage);
        this.updateScreen();
    }

    async nextTenPages() {
        if (this.currentPage + 10 > this.maxPages) {
            this.currentPage = this.maxPages;
        } else {
            this.currentPage += 10;
        }
        await fetchPage(this.currentPage);
        this.updateScreen();
    }

    async updateScreen() {
        document.getElementById("pagination").innerText = this.currentPage + "/" + this.maxPages;
        updateRectanglesArray(this.currentPage);
        redrawCanvas();
    }
}

const pagination = new Pagination(1, MAX_PAGES);