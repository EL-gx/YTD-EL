const dlButton = document.getElementById("dl");
const urlInput = document.getElementById("urlIn");
const errorMessage = document.getElementById("errorMessage");

const downloadFile = url => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const getData = async url => {
    errorMessage.style.color = "yellow";
    errorMessage.textContent = "Fetching data, please wait...";
    try {
        const res = await fetch(
            `https://haji-mix-api.gleeze.com/api/ytdl?url=${url}`
        );
        const data = await res.json();
        if (data && data.youtube) {
            errorMessage.style.color = "green";
            errorMessage.textContent = "Download starting...";
            downloadFile(data.youtube);
        } else {
            errorMessage.style.color = "red";
            errorMessage.textContent =
                data.error || "An unknown error occurred.";
        }
    } catch (err) {
        console.error(err);
        errorMessage.style.color = "red";
        errorMessage.textContent =
            "Failed to fetch data. Please check the URL.";
    }
};

dlButton.addEventListener("click", () => {
    const url = urlInput.value;
    if (url) {
        getData(url);
    } else {
        errorMessage.style.color = "red";
        errorMessage.textContent = "Please Enter a Link.";
    }
});
