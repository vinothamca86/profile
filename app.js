
const fetch = require('node-fetch');
const Handlebars = require('handlebars');

const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);

let url = 'https://5dc588200bbd050014fb8ae1.mockapi.io/assessment';

var resultData;
fetch(url)
    .then(res => res.json())
    .then((data) => {

        resultData = data;

        var source = $(document.getElementById("#hader-template")).html();
        var template = Handlebars.compile(source);
        var context = { header: "Customer Profile", content: "Profile Details" };
        var html = template(context);
        $(document.body).append(html);

        Handlebars.registerHelper('render', function (partialId, options) {

            var selector = 'script[type="text/x-handlebars-template"]#' + partialId,
                source = $(selector).html(),
                html = Handlebars.compile(source)(options.hash);

            return new Handlebars.SafeString(html);
        });


    })
    .catch(err => { throw err });
