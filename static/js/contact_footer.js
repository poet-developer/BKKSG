(function(){
    const contactBtn = document.querySelector('.footerBtn');
    const footerContainer = document.querySelector('.footer-container');

    contactBtn.addEventListener('click',function(){
      contactBtn.classList.add('floated');
      footerContainer.classList.add('pullUp');
    });
    window.addEventListener('scroll',function(){
       let scrollLimitValue = (pageYOffset+window.innerHeight)>window.innerHeight*1.16;
       contactBtn.classList.remove('floated');
    // This 1.16 is contents content's visual height + that's margin-bottom value.
       if(scrollLimitValue){
          footerContainer.classList.add('pullUp');
          contactBtn.classList.add('pullDown');
       }else{
         footerContainer.classList.remove('pullUp');
         contactBtn.classList.remove('pullDown');
       }
    });
}());