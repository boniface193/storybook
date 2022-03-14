const $button = document.querySelector('#sidebar-toggle');
const $wrapper = document.querySelector('#wrapper');
const $sideNav = document.querySelector('.notActive');

$button.addEventListener('click', (e) => {
    e.preventDefault();
    $wrapper.classList.toggle('toggled');
});

// localStorage.setItem('pathname', window.location.pathname)

// let $pathname = localStorage.getItem('pathname')

function onAddStory() {
    document.getElementsByClassName('fabd')[0].classList.toggle('show')
}

function onLoading() {
    document.getElementById('loading').innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    <span class="visually-hidden">Loading...</span> `

}

function onCancel() {
    window.history.back()
    document.getElementById('cancel').innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    <span class="visually-hidden">Loading...</span> `
}