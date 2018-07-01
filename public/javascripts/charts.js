//parse data fromm the html table
let data2 = document.querySelectorAll('th');
data2 = [...data2]; //nodeList to array
let production = [];
let inventoryLevel = [];
data2.forEach(d => {
	if(d.classList.contains('inventory')){
  	inventoryLevel.push(d.innerHTML);
  }
	if(d.classList.contains('production')){
  	production.push(d.innerHTML);
  }
});

production = production.map(item => item.replace(',', ''));
inventoryLevel = inventoryLevel.map(item => item.replace(',', ''));

//put the data in a table chart
let chart = c3.generate({
    bindto: '#chart',
    data: {
      columns: [
        ['Inventory Level'].concat(inventoryLevel),
        ['Production'].concat(production)
      ],
      type: 'bar'
    }, 
    bar: {
        width: {
            ratio: 0.35 // this makes bar width 35% of length between ticks
        }
    },
    color: {
        pattern: ['#0C66A1', '#00D1B2']
      }
});