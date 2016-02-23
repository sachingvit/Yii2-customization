/* https://github.com/sachingvit/Yii2-customization/tree/master/Yii2-grid-view/v1.1
 * Description: Yii2 grid view filter on keypress 
 * Author: Sachin Jain
 * Modified on : 23 Feb,2016 
 * version 1.1 
 */

var input;
var submit_form = false;
var filter_selector = '.grid-view input,.grid-view select';
var actionColunm = null;
var abortCount = 0;




var timer = 0;
var timerProcess = false;
$(document)
        .off('keydown.yiiGridView change.yiiGridView', filter_selector)
        .on('keyup', filter_selector, function () {
            timer = 0;
            timerProcess = true;

            var thisElem = $(this);
            actionColunm = thisElem;
            input = $(this).attr('name');
            submit_form = false;




            if (timerProcess) {
                var intervalThread = setInterval(function () {
                    if (timer > 3 && timerProcess) {

                        if (submit_form === false && timerProcess) {
                            submit_form = true;
                            setTimeout(function () {
                                $(".grid-view").yiiGridView("applyFilter");
                            }, 500);
                        }
                        timerProcess = false;
                        timer = 0;
                        clearInterval(intervalThread);
                    } else {
//                        console.log(timer > 3);
                        if (timer > 3) {
                            clearInterval(intervalThread);
                        }
                        timer++;

                    }
                }, 500);
            }


        })
        .on('pjax:success', function (event) {
            abortCount = 0;
            submit_form = false;
            var i = $("[name='" + input + "']");
            var val = i.val();
//            i.val(val).focus();
            event.preventDefault();
            event.stopPropagation();
        })
        .on('pjax:error', function (event) {
            submit_form = false;
            var i = $("[name='" + input + "']");
            var val = i.val();
            abortCount++;
//            i.val(val).focus();
            event.preventDefault();
            event.stopPropagation();
            return false;
        })
        .on('pjax:complete', function (event) {
            if (abortCount > 10) {
                location.reload();
            }
            event.preventDefault();
            event.stopPropagation();
            return false;
            submit_form = false;
            var i = $("[name='" + input + "']");
//            var val = i.val();
//            i.val(val).focus();
        });
$(document).on('beforeFilter', ".grid-view", function (event) {
    event.preventDefault();
    event.stopPropagation();
    return submit_form;
});

$(document).on('afterFilter', ".grid-view", function (event) {
    event.preventDefault();
    event.stopPropagation();
    submit_form = false;
});
