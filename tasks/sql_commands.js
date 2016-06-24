var customersRentalsquery =  customers.query('SELECT id, name FROM customers');
  query.on('row',function(row){
    console.log('row.id, row.name')
  });
