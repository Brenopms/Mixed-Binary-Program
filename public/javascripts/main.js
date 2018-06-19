const form = document.querySelector('.dj');
let count = 0;

const periods = document.querySelector('.periods');

//Make the input for demands adjust acording to the time period
periods.addEventListener('change',  function(){
  count = Number(this.value);
  form.innerHTML = `<label class="label">Demand Forecasts for each month</label>
  <div class="control">
      <input name="dj[d0]" class="input" type="text" placeholder="D0">
  </div>`;

  
  for(let i=1; i<count; i++){
    let newForm = `
    <div class="control demand-control">
      <input name="dj[d${i}]" class="input" type="text" placeholder="D${i}">
    </div>`
  	form.innerHTML += newForm;
  }
});

// let buttonAdd = document.querySelector('.add-form');
/* buttonAdd.addEventListener('click', () => {
  count +=1;
  let newForm = `
  <div class="control demand-control">
    <input name="dj[d${count}]" class="input" type="text" placeholder="D${count}">
  </div>
`
  form.innerHTML += newForm;
}); */