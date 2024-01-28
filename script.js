$(document).ready(function () {
    $('.login').on('click', function () {
        $('.modal-login').css('display', 'flex');
    });

    $('.loginbtn2').on('click', function () {
        $('.modal-login').css('display', 'flex');
    });

    $('.register').on('click', function () {
        $('.modal').toggleClass('active');
        $('.form-container-login').removeClass('active');
    })

    $('.signin').on('click', function () {
        $('.form-container-login').toggleClass('active');
        $('.form-container-register').removeClass('active');

        $('.seller-registration').removeClass('active')
        $('.consumer-registration').removeClass('active')
    })

    $('.seller').on('click', function () {
        $('.seller').toggleClass('indicator');
        $('.consumer').removeClass('indicator');

        var randomNumber1 = ('0000' + Math.floor(Math.random() * 10000)).slice(-4);
        var randomNumber2 = ('0000' + Math.floor(Math.random() * 10000)).slice(-4);
        var randomNumber3 = ('000000' + Math.floor(Math.random() * 1000000)).slice(-6);

        var bakeryID = 'Bakery-' + randomNumber1 + '-' + randomNumber2 + '-' + randomNumber3;

        $('#bakeryid').val(bakeryID);
    })

    $('.consumer').on('click', function () {
        $('.consumer').toggleClass('indicator');
        $('.seller').removeClass('indicator');

        var randomNumber1 = ('0000' + Math.floor(Math.random() * 10000)).slice(-4);
        var randomNumber2 = ('0000' + Math.floor(Math.random() * 10000)).slice(-4);
        var randomNumber3 = ('000000' + Math.floor(Math.random() * 1000000)).slice(-6);

        var bakeryID = 'Consumer-' + randomNumber1 + '-' + randomNumber2 + '-' + randomNumber3;

        $('#consumerid').val(bakeryID);

    })

    $('.register-btn').on('click', function () {
        $('.modal').removeClass('active')
        $('.form-container-register').toggleClass('active')

        if ($('.seller').hasClass('indicator')) {
            $('.seller-registration').toggleClass('active')
        }
        else if ($('.consumer').hasClass('indicator')) {
            $('.consumer-registration').toggleClass('active')
        }
        else {
            alert('Please pick among the two choices. Thank you.')
            location.reload();
        }
    })

    $('.seller-registration').submit(function (e) {
        e.preventDefault();

        var password = $('.password').val();
        var confirmpassword = $('#confirmpassword').val();
        var certificateFile = $('input.certificate')[0].files[0];

        if (password !== confirmpassword) {
            alert('Password Mismatch!');
        }
        else if (!certificateFile) {
            alert('Please upload certificate file. Thank you!')
        } else {
            $.ajax({
                type: "POST",
                url: "server.php?action=insertBakery",
                data: new FormData(this),
                contentType: false,
                cache: false,
                processData: false,
                dataType: "json",
                success: function (response) {
                    console.log('AJAX success:', response);
                    alert(response.message);
                    location.reload();
                },
                error: function (xhr, status, error) {
                    console.error('AJAX error:', error);
                    console.log('Response:', xhr.responseText); // Log the response content
                    alert('An error occurred. Please check the console for details.');
                    location.reload();
                }
            });
        }
    });

    $('.consumer-registration').submit(function(e) {
        e.preventDefault();

        var password = $('#consumer_password').val();
        var confirmpassword = $('#consumer_confirmpassword').val();

        if (password !== confirmpassword) {
            alert('Password Mismatch!');
        }
        else {
            $.ajax({
                type: "POST",
                url: "server.php?action=insertConsumer",
                data: new FormData(this),
                contentType: false,
                cache: false,
                processData: false,
                dataType: "json",
                success: function (response) {
                    console.log('AJAX success:', response);
                    alert(response.message);
                    location.reload();
                },
                error: function (xhr, status, error) {
                    console.error('AJAX error:', error);
                    console.log('Response:', xhr.responseText); // Log the response content
                    alert('An error occurred. Please check the console for details.');
                    location.reload();
                }
            });
        }
    });

    $('.login-form').submit(function (e){
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: "server.php?action=loginUser",
            data: new FormData(this),
            contentType: false,
            cache: false,
            processData: false,
            dataType: "json",
            success: function (response) {
                console.log('AJAX success:', response);
    
                if (response.user_type === "seller") {
                    alert('Seller login successful. ' + response.message);
                } else if (response.user_type === "consumer") {
                    alert('Consumer login successful. ' + response.message);
                } else {
                    alert('Email And Password Incorrect!');
                    location.reload();
                }
            },
            error: function (xhr, status, error) {
                console.error('AJAX error:', error);
                console.log('Response:', xhr.responseText); // Log the response content
                alert('An error occurred. Please check the console for details.');
                location.reload();
            }
        });

    })
});