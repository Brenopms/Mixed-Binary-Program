let buttonAdd = document.querySelector('.add-form');
let form = document.querySelector('.dj');
let count = 0;

buttonAdd.addEventListener('click', () => {
    count += 1;
    let newForm = `
<div class="control demand-control">
<input name="dj[d${count}]" class="input" type="text" placeholder="D${count}">
</div>
`;
    form.innerHTML += newForm;
});