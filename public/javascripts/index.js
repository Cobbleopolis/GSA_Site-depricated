$(function() {
    $("#form").submit(function(event) {
        $.post('/api/insert',
            {
                text: $("input:first").val(),
                success: alert("SUBMITTED!")
            }
        );
        event.preventDefault()
    })
});
