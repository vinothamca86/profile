
const fetch = require('node-fetch');
const Handlebars = require('handlebars');

const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);


async function getUsers() {
    let url = 'https://5dc588200bbd050014fb8ae1.mockapi.io/assessment';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderUsers() {
    let users = await getUsers();
    console.log(users);

    var source = $('#header-template').html();
    var template = Handlebars.compile(source);
    var htmlTemp = template({ userProfiles: users });
    $('.container').append(htmlTemp);
    console.log(htmlTemp);

Handlebars.registerHelper('render', function (partialId, options) {

            var selector = 'script[type="text/x-handlebars-template"]#' + partialId,
                source = $(selector).html(),
                html = Handlebars.compile(source)(options.hash);

            return new Handlebars.SafeString(html);
        });

}
renderUsers();
