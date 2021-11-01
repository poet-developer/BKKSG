(function(){
    const headline =  document.querySelector('.headline');
    const sideBar = document.querySelector('.sideBar');
    const gridContainer = document.querySelector('.grid-container')
    headline.addEventListener('click',function(){
        sideBar.classList.toggle('hideSideBar');
    });
    window.addEventListener('resize',function(){
        console.log(window.innerWidth);
        if(window.innerWidth>1024){
            sideBar.classList.remove('hideSideBar');
            gridContainer.classList.remove('wideMode');
        }else{
            sideBar.classList.add('hideSideBar');
            gridContainer.classList.add('wideMode');
        }
    });
})();