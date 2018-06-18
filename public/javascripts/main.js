// let buttonAdd = document.querySelector('.add-form');
let form = document.querySelector('.dj');
let count = 0;

let periods = document.querySelector('.periods');
periods.addEventListener('change',  function(){
	count = Number(this.value);
  for(let i=1; i<count; i++){
    let newForm = `
    <div class="control demand-control">
      <input name="dj[d${i}]" class="input" type="text" placeholder="D${i}">
    </div>
  `
  	form.innerHTML += newForm;
  }
});


/* buttonAdd.addEventListener('click', () => {
  count +=1;
  let newForm = `
  <div class="control demand-control">
    <input name="dj[d${count}]" class="input" type="text" placeholder="D${count}">
  </div>
`
  form.innerHTML += newForm;
}); */