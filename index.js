const dlButton = document.getElementById("dl");
const urlInput = document.getElementById("urlIn");
const errorMessage = document.getElementById('errorMessage');

const getData = async (url) => {
  try {
    const res = await fetch(`https://haji-mix-api.gleeze.com/api/ytdl?url=${url}`);
    const data = await res.json();
    if (data && data.youtube) {
      downloadFile(data.youtube);
      errorMessage.style.color = "green";
      errorMessage.textContent = 'Downloading Please wait...'
    } else {
      errorMessage.textContent = data.error;
    }
  } catch (err) {
    console.error(err);
  }
};

dlButton.addEventListener('click', () => {
    const url = urlInput.value;
    if (url) {
        getData(url);
    } else {
        errorMessage.textContent = 'Please Enter a Link'
    }
});
