//alert('Xin chao!')

$.ajax({
    url: '/dashboard?id=1',
    type:'GET'
})
.then(data=>{
    for(let i = 0; i< data.length ;i++){
        const element = data[i];
        
        var item = $(`
            <h1>${element.title} : ${element.year}</h1>
        `)
        
        $('#movies').append(item)
    }
})
.catch(err=>{
    console.log('API loi');
})
