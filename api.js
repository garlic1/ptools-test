const baseUrl = "https://api-hachuraservi1.websiteseguro.com/api/document";

const options = {
    method: "POST",
    headers: {
        "Authorization": "Basic 96f9c92582aed580ba10a780e8af7fea57531c9c",
        "Content-Type": "application/x-www-form-urlencoded"
    }
};

async function fetchPage(currentPage) {
    try {   
        const body = new URLSearchParams({ page: currentPage }).toString();
        const response = await fetch(baseUrl, { 
            ...options, 
            body: body
        });
        const backgroundImage = await response.json();
        
        const canvas = document.getElementById("myCanvas");
        canvas.style.backgroundImage = `url('${backgroundImage.image}')`;
    } catch (error) {
        console.log(error);
    }
}
