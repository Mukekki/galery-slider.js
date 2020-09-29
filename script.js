const $ = {}

const images = [
   {id: 0, src: './img/0.jpg'},
   {id: 1, src: './img/1.jpg'},
   {id: 2, src: './img/2.jpg'},
   {id: 3, src: './img/3.jpg'},
   {id: 4, src: './img/4.jpg'},
   {id: 5, src: './img/5.jpg'},
   {id: 6, src: './img/6.jpg'},
   {id: 7, src: './img/7.jpg'},
   {id: 8, src: './img/8.jpg'},
   {id: 9, src: './img/9.jpg'},
   {id: 10, src: './img/10.jpg'}
]

const _createModal = () =>{
   const div = document.createElement('div');
   div.classList.add('modal')
   div.insertAdjacentHTML( 'afterbegin',`
            <div class="overlay" data-close="true">
               <div class="modal_body" data-modal="true">

                  <div class="button_overlay_back" id="next" data-back="true"></div>
                  <div class="button_overlay_next" id="back" data-next="true"></div>
               </div>

            </div>
   `)
   document.body.appendChild(div)
   return div
}

$.modal = () => {
   const $modal = _createModal();
   const customModal = $modal.querySelector(".modal_body");
   const getIdTempImg = () =>{
      const tempimg = customModal.querySelector(".tempimg")
      return tempimg.id
   };
   const removeTempImg = () =>{
      const tempimg = customModal.querySelector(".tempimg")
      customModal.removeChild(tempimg)
   };
   const modal = {
      open() {
         $modal.classList.add('open');
      },
      close() {
         $modal.classList.remove('open');
         $modal.classList.add('close');
         setTimeout(()=>{
            $modal.classList.remove('close')
         }
         , 300)
      },
      addHtml(options) {
         if (customModal.children.length > 2){
            removeTempImg()
         }
         customModal.insertAdjacentHTML("afterbegin",`
         <img src="${options.src}" alt="#" class="tempimg" id="${options.id}">
         `)
         // console.log(customModal.children.length)
      },
      next(){
         const tmp = +getIdTempImg() + 1
         if (tmp === images.length){
            modal.close()
            return {} // тупо заглушку въебал шоб консоль не материлась
         }
         else 
            removeTempImg()
            customModal.insertAdjacentHTML("afterbegin",`
         <img src="${images[tmp].src}" alt="#" class="tempimg" id="${images[tmp].id}">
         `
         )
      },
      back(){
         const tmp = +getIdTempImg() - 1
         if (tmp < 0){
            modal.close()
            return {} // тоже заглушка
         }
         else 
            removeTempImg()
            customModal.insertAdjacentHTML("afterbegin",`
         <img src="${images[tmp].src}" alt="#" class="tempimg" id="${images[tmp].id}">
         `
         )
      }
   }
   
   const backButton = customModal.addEventListener('click', event => {
      if (event.target.dataset.back){
         modal.back()
      }
      });
   const NextButton = customModal.addEventListener('click', event => {
      if (event.target.dataset.next){
         modal.next()
      }
      });
   const eventListener = $modal.addEventListener('click', event => {
      if (event.target.dataset.close) {
         modal.close()
      }
   });

   return modal
}

const modal = $.modal()

let sliderBody = document.querySelector(".body_content")

const imagesCreate = () =>{
   let i = 0;
   let newImg = document.createElement('div');
   newImg.classList.add('img_content')
   while (i < images.length){
   newImg.insertAdjacentHTML('beforeend',`<div class="imgContainer">
      <img src="${images[i].src}" alt="#" id="${images[i].id}" data-image="true">
      </div>
      `)
   i = i + 1;
   }
   sliderBody.appendChild(newImg)
   newImg.addEventListener('click', event =>{
       if (event.target.id){
          modal.addHtml(images[+event.target.id])
          modal.open()
      //  console.log(typeof event.target.id)
       }
   })
   return newImg
}

const preview = imagesCreate()