var onClickDownload = (e) => {
  document.querySelector('button.dccon-downloader').innerText = "다운로드중..."
  document.querySelector('button.dccon-downloader').setAttribute('disabled', "true")
  const title = document.querySelector('div.info_viewtxt h4.font_blue').innerText
  let list = Array.from(document.querySelectorAll('ul.dccon_list img'));
  var zip = new JSZip();
  const getExt = (char) => {
    if(char === '/') return 'jpg';
    if(char === 'i') return 'png';
    if(char === 'R') return 'gif';
  }
  Promise.all(list.map(dccon => {
    const {title, src} = dccon;
    let ext = "gif";
    return fetch(src,{
      headers: {'referer': 'https://dccon.dcinside.com/' }
    })
    .then( res => {
      ext = res.headers.get("Content-Type");
      return res.blob();
    })
    .then(blob => new Promise( (resolve, reject) => {
      const reader = new FileReader;
      reader.onerror = e => reject(e);
      reader.onload = () => {
        const result = reader.result;
        zip.file(`${title}.${getExt(result.charAt(result.indexOf(',')+1))}`,blob);
        resolve();
      }
      reader.readAsDataURL(blob);
    }))
  }))
  .then(res => {
    zip.generateAsync({type:"blob"})
    .then(function(content) {
        const zipUrl = URL.createObjectURL(content);
        document.querySelector('button.dccon-downloader').innerText = "다운받기"
        document.querySelector('button.dccon-downloader').setAttribute('disabled', "false")
        chrome.runtime.sendMessage({title, zipUrl});
    });
  })
  .catch(e => {
    console.error(e);
  })
}

document.addEventListener("click", function(e) {
  if( (e.target.className !== 'btn_dccon_infoview div_package') &&
      (e.target.className !== 'dcon_frame blue_brd') &&
      (e.target.className !== 'dcon_frame red_brd') ) return;

  let download_button = document.createElement("button")
  download_button.setAttribute('type', 'button')
  download_button.setAttribute('class', 'btn_blue small dccon-downloader')
  download_button.onclick = onClickDownload;
  download_button.innerText = "다운받기"

  var observer = new MutationObserver(function (mutations, me) {
    let dccon_window = document.getElementsByClassName('dccon_popinfo')
    if (dccon_window) {
      let purchase_button = document.querySelector('.btn_blue.small.btn_buy')
      purchase_button.insertAdjacentElement("beforebegin", download_button)
      me.disconnect();
      return;
    }
  });
  
  observer.observe(document, {
    childList: true,
    subtree: true
  });
}, false);