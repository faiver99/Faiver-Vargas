$(function(){
    $("[data-toggle='tooltip']").tooltip();
    $("[data-toggle='popover']").popover();
    $('.carousel').carousel({
        interval:4000
    });

    $("#voletin").on("show.bs.modal", function(e){
        console.log('el modal de voletin se esta mostrando');

        $('#contacto').removeClass('btn-outline-success');
        $('#contacto').addClass('btn-primary');



    });
});