/*
 * Yii2 grid view filter on keypress 
 */



var input;
var submit_form = false;
var filter_selector = '.grid-view input';
var actionColunm = null;
$(document)
        .off('keydown.yiiGridView change.yiiGridView', filter_selector)
        .on('keyup', filter_selector, function () {
            var thisElem = $(this);
            actionColunm = thisElem;
            input = $(this).attr('name');
            submit_form = false;

            if (submit_form === false) {
                submit_form = true;
                setTimeout(function () {
                    $(".grid-view").yiiGridView("applyFilter");
                }, 1000);
            }
        })
        .on('pjax:success', function () {
            submit_form = false;
            console.log('pjax success : ' + submit_form);
            var i = $("[name='" + input + "']");
            var val = i.val();
            i.focus().val(val);
        })
        .on('pjax:error', function () {
            submit_form = false;
            var i = $("[name='" + input + "']");
            var val = i.val();
            i.focus().val(val);
        });
$(document).on('beforeFilter', ".grid-view", function (event) {
    return submit_form;
});

$(document).on('afterFilter', ".grid-view", function (event) {
    submit_form = false;
});

$(function () {
    $(document).on('pjax:complete', function (event) {
        $(document).find(actionColunm).focus();
        event.preventDefault();
        event.stopPropagation();
        //return false;
    });
});
