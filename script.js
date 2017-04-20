//Functionality
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var is_timeout_done = true;
//Stats
var attempts = 0;
var accuracy = 0;
var games_played = 0;
function display_stats(){
    $('.games_played .value').text(games_played);
    $('.matches .value').text(match_counter);
    $('.attempts .value').text(attempts);
    $('.accuracy .value').text(Math.round(accuracy*100)+'%');
}
function reset_stats(){
    accuracy = 0;
    attempts = 0;
    match_counter = 0;
    display_stats();
}

function card_clicked(element){
    //show card face
    $(element).find('.front').before($(element).find('.back'));
    $(element).find('.front').removeClass('transparent');
    if(first_card_clicked===null){ // Add to first_card_clicked if nothing inside
        first_card_clicked = $(element);
    }
    else{ // Add to seond_card_clicked
        second_card_clicked = $(element);
        attempts++;
        if($(first_card_clicked).find('.front').find('img').attr('src') === $(second_card_clicked).find('.front').find('img').attr('src')){ // compare front of two card together and if true match stuff
            match_counter++;
            accuracy = match_counter/attempts;
            first_card_clicked = null;
            second_card_clicked = null;
            display_stats();
            if(match_counter === total_possible_matches){ // check for overall win
                setTimeout(function(){
                    alert("You win!");
                }, 500);
            }
        }
        else{ // Cards does not match, reset stuff
            accuracy = match_counter/attempts;
            display_stats();
            is_timeout_done = false;
            setTimeout(function(){
                $(first_card_clicked).find('.back').before($(first_card_clicked).find('.front'));
                $(second_card_clicked).find('.back').before($(second_card_clicked).find('.front'));
                $(first_card_clicked).find('.front').addClass("transparent");
                $(second_card_clicked).find('.front').addClass("transparent");
                first_card_clicked = null;
                second_card_clicked = null;
                is_timeout_done = true;
            }, 2000);
        }
    }
}
function randomize_cards(){
    var cards = $('.card');
    for(var i = 0; i<cards.length; i++){
        var target = Math.floor(Math.random() * cards.length -1) + 1;
        var target2 = Math.floor(Math.random() * cards.length -1) + 1;
        cards[target].before(cards[target2]);
    }
}
$(document).ready(function(){
    display_stats();
    randomize_cards();
    $('.card').click(function(){
        if($(this).find('.front').hasClass('transparent') && is_timeout_done){
            card_clicked(this);
        }
    });
    $('.reset').click(function(){
        if(attempts!==0){
            games_played++;
            reset_stats();
            var cards = $('.card');
            for(var i=0;i<cards.length;i++){
                $(cards[i]).find('.back').before($(cards[i]).find('.front'));
            }
            $('.front').addClass('transparent');
            randomize_cards();
        }
    })
});