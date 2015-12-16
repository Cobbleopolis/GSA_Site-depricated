$(function() {
    $("#form").submit(function(event) {
        $.post('/api/insert',
            {
                text: $("input:first").val()
            }
        );
        event.preventDefault()
    })
});
