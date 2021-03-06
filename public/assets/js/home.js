$.get("/allNotes", function( notes ) {

    let container;
    let row;
    let title;
    let author;
    let content;
    let fav;


    if (notes.length > 0) {

        for (const note of notes) {

            container = $('<div class="container mt-3"></div>');
            row = $('<div class="row mt-5 justify-content-center  border border-primary"></div>');
            title = $('<div class="h5 text-white p-3 mt-1 col-6">'+note.title+'</div>');
            author = $('<div class="h5 text-white p-3 mt-1 col-6">'+note.author+'</div>');
            content = $('<div class="h5 text-white p-3 mt-1 col-12 border border-primary">'+note.content+'</div>');
            fav = $('<form class="fav offset-9" action="/addFav" method="post">'
            +'<input type="hidden" name="fav" value="'+note.id+'"/>'
            +'<button type="button" class="btn btn-primary pb-1 mb-3">Fav!</button></form>');


            $('#main').append(container);
            $('#main').children().last().append(row);    
            $('#main').children().last().children().append(title);   
            $('#main').children().last().children().append(author);   
            $('#main').children().last().children().append(content);    
            $('#main').children().last().children().append(fav);    

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
$(document).ready( function() {
    
    $(document).on('click', '.fav' , function(e) {
    let noteId = $(this).children().first().val();
    $.post("/addFav", {fav : noteId} , function( success ) {
    });


    });

})