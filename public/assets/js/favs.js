$.get("/favorites", function( notes ) {

    let container;
    let row;
    let title;
    let author;
    let content;
    if (notes.length > 0) {
        
        for (const note of notes) {

            container = $('<div class="container mt-3"></div>');
            row = $('<div class="row mt-5 justify-content-center  border border-primary"></div>');
            title = $('<div class="h5 text-white p-3 mt-1 col-6">'+note.title+'</div>');
            author = $('<div class="h5 text-white p-3 mt-1 col-6">'+note.author+'</div>');
            content = $('<div class="h5 text-white p-3 mt-1 col-12">'+note.content+'</div>');
    
    
            $('#main').append(container);
            $('#main').children().last().append(row);    
            $('#main').children().last().children().append(title);   
            $('#main').children().last().children().append(author);   
            $('#main').children().last().children().append(content);    
            
        }


    } else {
        
        container = $('<div class="container mt-3"></div>');
        row = $('<div class="row mt-5 justify-content-center  border border-primary"></div>');
        title = $('<div class="h5 text-white p-3 mt-1 col-6">'+notes.title+'</div>');
        author = $('<div class="h5 text-white p-3 mt-1 col-6">'+notes.author+'</div>');
        content = $('<div class="h5 text-white p-3 mt-1 col-12">'+notes.content+'</div>');
    
    
        $('#main').append(container);
        $('#main').children().last().append(row);    
        $('#main').children().last().children().append(title);   
        $('#main').children().last().children().append(author);   
        $('#main').children().last().children().append(content);    


    }

});
