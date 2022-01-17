
//Show logout

function showLogout(){
    console.log('Ask for logout');
    const modal = document.querySelector('#modal-logout');
    const closeModal = document.querySelector('#n');
    modal.style.display = "block";
    closeModal.addEventListener('click', ()=>{
        modal.style.display = "none";
    })
    window.addEventListener('click', (event) =>{
        if (event.target == modal) {
            modal.style.display = "none";
        }
    })
};

export {showLogout};