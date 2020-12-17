import {
        def_configs,
} from "/config.js";

document.addEventListener('DOMContentLoaded', intializeHtml, false);
var configs = def_configs;

function intializeHtml() {
        chrome.storage.sync.get(configs, (res) => {
                configs = res;
                for (let divId of Object.keys(configs)) {
                        for (let divProperty in configs[divId]) {
                                var elemId = divId + '_' + divProperty;
                                console.log(elemId);
                                var elem = configs[divId][divProperty];
                                if (document.getElementById(elemId)) {
                                        document.getElementById(elemId).setAttribute(elem.attribute_to_set, elem.val);
                                } else {
                                        if (document.getElementById("placeholder_" + elemId)) {
                                                var newElem = document.createElement("input");
                                                if (elem.attribute_to_set == "checked") {
                                                        if (elem.val) newElem.setAttribute(elem.attribute_to_set, "");
                                                } else newElem.setAttribute(elem.attribute_to_set, elem.val);
                                                newElem.setAttribute("id", elemId);
                                                newElem.setAttribute("class", divProperty);
                                                newElem.setAttribute("type", "checkbox");
                                                document.getElementById("placeholder_" + elemId).appendChild(newElem);
                                        }
                                }
                        }
                }
                for (let elem of document.getElementsByTagName('input')) {
                        elem.addEventListener("change", saveChange);
                }
        });
}

function saveChange(ev) {
        console.log(ev);
        var elem = ev.target;
        console.log(elem);
        var divId = elem.closest(".service").id;
        var newObj = {
                ...configs[divId]
        };
        newObj[elem.className] = {
                attribute_to_set: configs[divId][elem.className]["attribute_to_set"],
                val: elem.getAttribute(configs[divId][elem.className]["attribute_to_set"]),
        }
        chrome.storage.sync.set(newObj, () => {});
}
